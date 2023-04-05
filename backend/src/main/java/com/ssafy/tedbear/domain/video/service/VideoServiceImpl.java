package com.ssafy.tedbear.domain.video.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.service.MemberService;
import com.ssafy.tedbear.domain.video.dto.VideoDetailDto;
import com.ssafy.tedbear.domain.video.dto.VideoInfoDto;
import com.ssafy.tedbear.domain.video.dto.VideoInfoListDto;
import com.ssafy.tedbear.domain.video.dto.WatchingVideoInfoDto;
import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.video.entity.VideoBookmark;
import com.ssafy.tedbear.domain.video.entity.WatchingVideo;
import com.ssafy.tedbear.domain.video.repository.VideoBookmarkRepository;
import com.ssafy.tedbear.domain.video.repository.VideoRepository;
import com.ssafy.tedbear.domain.video.repository.WatchingVideoRepository;
import com.ssafy.tedbear.global.common.FindMemberService;
import com.ssafy.tedbear.global.util.RecommendUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class VideoServiceImpl implements VideoService {
	final VideoRepository videoRepository;
	final VideoBookmarkRepository videoBookmarkRepository;
	final WatchingVideoRepository watchingVideoRepository;
	final MemberService memberService;
	final FindMemberService findMemberService;
	final int resultMaxCnt = 12;

	@Override
	@Transactional
	public VideoInfoListDto getRecommendList(String memberUid, int delta) {
		Member member = findMemberService.findMember(memberUid);
		int myScore = member.getMemberScore().getScore();
		int recommendScoreFlag = RecommendUtil.getRecommendScore(myScore + delta);
		int deltaScore = 1500;
		log.info("[VideoRecommendList] : {}", recommendScoreFlag);
		List<Video> recommendVideoList = null;
		do {
			recommendVideoList = (videoRepository.findByScoreBetween(
				Math.max(1, recommendScoreFlag - deltaScore),
				recommendScoreFlag + deltaScore));
			deltaScore += 10000;
		} while (recommendVideoList.size() < resultMaxCnt);

		Set<Long> bookmarkedVideoNoSet =
			videoBookmarkRepository
				.findVideoBookmarksByMemberAndVideoIn(member, recommendVideoList)
				.stream()
				.map(x -> x.getVideo().getNo())
				.collect(Collectors.toSet());

		return new VideoInfoListDto(
			recommendVideoList
				.stream()
				// .sorted(Comparator.comparingInt(a -> Math.abs(a.getScore() - myScore)))
				.limit(resultMaxCnt)
				.peek(x -> x.setBookmarked(bookmarkedVideoNoSet.contains(x.getNo())))
				.collect(Collectors.toList())
		);
	}

	@Override
	@Transactional
	public VideoDetailDto getDetail(String memberUid, String watchId) {
		Member member = findMemberService.findMember(memberUid);
		Video video = videoRepository.findByWatchId(watchId);
		video.setBookmarked(videoBookmarkRepository.findVideoBookmarkByMemberAndVideo(member, video).isPresent());
		watchingVideoRepository.findByMemberAndVideo(member, video)
			.ifPresentOrElse(x -> video.setLastWatchingTime(x.getVideoProgressTime()),
				() -> video.setLastWatchingTime(0));
		return new VideoDetailDto(video);
	}

	@Override
	public VideoInfoDto getWatchingRecent(String memberUid) {
		Member member = findMemberService.findMember(memberUid);
		System.out.println(member.getNo());
		Optional<WatchingVideo> optionalWatchingVideo = watchingVideoRepository.findTop1ByMemberAndVideoStatusOrderByUpdatedDateDesc(
			member, false);

		return watchingVideoRepository.findTop1ByMemberAndVideoStatusOrderByUpdatedDateDesc(
				member, false)
			.map(x -> optionalWatchingVideo.get().getVideo())
			.map(x -> x.updateBookmarked(
				videoBookmarkRepository.findVideoBookmarkByMemberAndVideo(member, x).isPresent()))
			.map(VideoInfoDto::new)
			.orElse(null);
	}

	@Override
	@Transactional
	public VideoInfoListDto getWatchingList(String memberUid, Pageable pageable) {
		Member member = findMemberService.findMember(memberUid);
		Slice<WatchingVideo> watchingVideoSlice = watchingVideoRepository.findSliceByMemberAndVideoStatus(pageable,
			member, false);
		List<Video> videoList = watchingVideoSlice.get().map(watchingVideo -> watchingVideo.getVideo()).collect(
			Collectors.toList());
		updateBookmarkVideo(member, videoList);
		return new VideoInfoListDto(videoList);
	}

	@Override
	@Transactional
	public VideoInfoListDto getCompleteList(String memberUid, Pageable pageable) {
		Member member = findMemberService.findMember(memberUid);

		Slice<WatchingVideo> completeVideoSlice = watchingVideoRepository.findSliceByMemberAndVideoStatus(pageable,
			member, true);

		List<Video> videoList = completeVideoSlice.get().map(watchingVideo -> watchingVideo.getVideo()).collect(
			Collectors.toList());
		updateBookmarkVideo(member, videoList);
		return new VideoInfoListDto(videoList);
	}

	@Override
	public VideoInfoListDto searchVideo(String memberUid, String query, Pageable pageable) {
		Member member = findMemberService.findMember(memberUid);
		List<Video> videoList = videoRepository.findSliceByTitle(query, pageable)
			.get()
			.collect(Collectors.toList());
		updateBookmarkVideo(member, videoList);
		return new VideoInfoListDto(videoList);
	}

	@Override
	@Transactional
	public void saveWatchingRecord(String memberUid, WatchingVideoInfoDto request) {
		Member member = findMemberService.findMemberOnlyMember(memberUid);
		Video video = Video.builder().no(request.getVideoNo()).build();

		Optional<WatchingVideo> optionalWatchingVideo = watchingVideoRepository.findByMemberAndVideo(member, video);
		if (optionalWatchingVideo.isPresent()) {
			WatchingVideo existWatchingVideo = optionalWatchingVideo.get();
			existWatchingVideo.setUpdatedDateNow();
			existWatchingVideo.setVideoProgressTime(request.getVideoProgressTime());
		} else {
			watchingVideoRepository.save(WatchingVideo.builder()
				.video(video)
				.member(member)
				.updatedDate(LocalDateTime.now())
				.videoProgressTime(request.getVideoProgressTime())
				.videoStatus(false)
				.build());
		}

	}

	@Override
	@Transactional
	public void saveCompleteRecord(String memberUid, WatchingVideoInfoDto request) {
		Member member = findMemberService.findMemberOnlyMember(memberUid);

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
		memberService.increaseMemberLevel(member, 1000);

	}

	@Override
	public VideoInfoListDto getVideoBookmarkList(String memberUid, Pageable pageable) {
		Member member = findMemberService.findMemberOnlyMember(memberUid);
		Slice<VideoBookmark> videoBookmarkList = videoBookmarkRepository.findVideoBookmarksByMember(member, pageable);
		List<Video> videoList = videoBookmarkList.stream().map(x -> x.getVideo()).collect(Collectors.toList());
		updateBookmarkVideo(member, videoList);
		return new VideoInfoListDto(videoList);

	}

	@Override
	public void saveVideoBookmark(String memberUid, long videoNo) {
		Member member = findMemberService.findMemberOnlyMember(memberUid);
		Video video = Video.builder().no(videoNo).build();
		videoBookmarkRepository.findVideoBookmarkByMemberAndVideo(member, video)
			.ifPresentOrElse(none -> {
					throw new IllegalArgumentException("이미 존재하는 북마크입니다.");
				},
				() -> videoBookmarkRepository.save(
					VideoBookmark
						.builder()
						.member(member)
						.video(video)
						.createdDate(LocalDateTime.now())
						.build()
				));
	}

	@Override
	@Transactional
	public void deleteVideoBookmark(String memberUid, long videoNo) {
		Member member = findMemberService.findMemberOnlyMember(memberUid);
		Video video = Video.builder().no(videoNo).build();
		videoBookmarkRepository.deleteByMemberAndVideo(member, video);
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
