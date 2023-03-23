package com.ssafy.tedbear.domain.video.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.tedbear.domain.bookmark.repository.VideoBookmarkRepository;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.video.dto.VideoDetail;
import com.ssafy.tedbear.domain.video.dto.VideoInfo;
import com.ssafy.tedbear.domain.video.dto.VideoInfoList;
import com.ssafy.tedbear.domain.video.dto.WatchingVideoInfo;
import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.video.entity.WatchingVideo;
import com.ssafy.tedbear.domain.video.repository.VideoRepository;
import com.ssafy.tedbear.domain.video.repository.WatchingVideoRepository;
import com.ssafy.tedbear.global.util.RecommendUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {
	final VideoRepository videoRepository;
	final VideoBookmarkRepository videoBookmarkRepository;
	final WatchingVideoRepository watchingVideoRepository;
	final int resultMaxCnt = 12;

	@Override
	@Transactional
	public VideoInfoList getRecommendList(Member member) {
		int myScore = member.getMemberScore().getScore();
		int recommendScoreFlag = RecommendUtil.getRecommendScore(myScore);
		int deltaScore = 1500;

		List<Video> recommendVideoList = null;
		do {
			recommendVideoList = (videoRepository.findByScoreBetween(
				Math.max(1, recommendScoreFlag - deltaScore),
				recommendScoreFlag + deltaScore));
			deltaScore += 10000;
			System.out.println(recommendVideoList.size());
		} while (recommendVideoList.size() < resultMaxCnt);

		Set<Long> bookmarkedVideoNoSet =
			videoBookmarkRepository
				.findVideoBookmarksByMemberAndVideoIn(member, recommendVideoList)
				.stream()
				.map(x -> x.getVideo().getNo())
				.collect(Collectors.toSet());

		return new VideoInfoList(
			recommendVideoList
				.stream()
				.sorted(Comparator.comparingInt(a -> Math.abs(a.getScore() - myScore)))
				.limit(resultMaxCnt)
				.peek(x -> x.setBookmarked(bookmarkedVideoNoSet.contains(x.getNo())))
				.collect(Collectors.toList())
		);
	}

	@Override
	@Transactional
	public VideoDetail getDetail(Member member, String watchId) {
		Video video = videoRepository.findByWatchId(watchId);
		video.setBookmarked(videoBookmarkRepository.findVideoBookmarksByMemberAndVideo(member, video).isPresent());
		return new VideoDetail(video);
	}

	@Override
	public VideoInfo getWatchingRecent(Member member) {
		Optional<WatchingVideo> optionalWatchingVideo = watchingVideoRepository.findTop1ByMemberAndVideoStatusOrderByUpdatedDateDesc(
			member, false);

		return watchingVideoRepository.findTop1ByMemberAndVideoStatusOrderByUpdatedDateDesc(
				member, false)
			.map(x -> optionalWatchingVideo.get().getVideo())
			.map(x -> x.updateBookmarked(
				videoBookmarkRepository.findVideoBookmarksByMemberAndVideo(member, x).isPresent()))
			.map(VideoInfo::new)
			.orElse(null);
	}

	@Override
	@Transactional
	public VideoInfoList getWatchingList(Member member, int page) {
		System.out.println("page : " + page);
		PageRequest pageRequest = PageRequest.of(page, resultMaxCnt,
			Sort.by(Sort.Direction.DESC, "updatedDate"));
		Slice<WatchingVideo> watchingVideoSlice = watchingVideoRepository.findSliceByMemberAndVideoStatus(pageRequest,
			member, false);
		List<Video> videoList = watchingVideoSlice.get().map(watchingVideo -> watchingVideo.getVideo()).collect(
			Collectors.toList());
		updateBookmarkVideo(member, videoList);
		return new VideoInfoList(videoList);
	}

	@Override
	@Transactional
	public VideoInfoList getCompleteList(Member member, int page) {
		PageRequest pageRequest = PageRequest.of(page, resultMaxCnt,
			Sort.by(Sort.Direction.DESC, "updatedDate"));
		Slice<WatchingVideo> completeVideoSlice = watchingVideoRepository.findSliceByMemberAndVideoStatus(pageRequest,
			member, true);

		List<Video> videoList = completeVideoSlice.get().map(watchingVideo -> watchingVideo.getVideo()).collect(
			Collectors.toList());
		updateBookmarkVideo(member, videoList);
		return new VideoInfoList(videoList);
	}

	@Override
	@Transactional
	public void saveWatchingRecord(Member member, WatchingVideoInfo request) {
		// Insert Or Update !!
		Video video = Video.builder().no(request.getVideoNo()).build();
		WatchingVideo watchingVideo = watchingVideoRepository.findByMemberAndVideo(member, video)
			.map(WatchingVideo::setUpdatedDateNow)
			.map(existWatchingVideo -> existWatchingVideo.setVideoProgressTime(request.getVideoProgressTime()))
			.orElse(WatchingVideo.builder()
				.video(video)
				.member(member)
				.updatedDate(LocalDateTime.now())
				.videoProgressTime(request.getVideoProgressTime())
				.videoStatus(false)
				.build());
		watchingVideoRepository.save(watchingVideo);
	}

	@Override
	@Transactional
	public void saveCompleteRecord(Member member, WatchingVideoInfo request) {
		// Insert Or Update !!
		Video video = Video.builder().no(request.getVideoNo()).build();
		WatchingVideo watchingVideo = watchingVideoRepository.findByMemberAndVideo(member, video)
			.map(WatchingVideo::setUpdatedDateNow)
			.map(existWatchingVideo -> existWatchingVideo.setVideoProgressTime(request.getVideoProgressTime()))
			.map(existWatchingVideo -> existWatchingVideo.setVideoStatus(true))
			.orElse(WatchingVideo.builder()
				.video(video)
				.member(member)
				.updatedDate(LocalDateTime.now())
				.videoProgressTime(request.getVideoProgressTime())
				.videoStatus(true)
				.build());
		watchingVideoRepository.save(watchingVideo);

	}

	public void updateBookmarkVideo(Member member, List<Video> videoList) {
		Set<Long> bookmarkedVideoNoSet =
			videoBookmarkRepository
				.findVideoBookmarksByMemberAndVideoIn(member, videoList)
				.stream()
				.map(x -> x.getVideo().getNo())
				.collect(Collectors.toSet());
		videoList.stream().forEach(x -> x.setBookmarked(bookmarkedVideoNoSet.contains(x.getNo())));
	}
}
