package com.ssafy.tedbear.domain.video.service;

import java.time.LocalDateTime;
import java.util.Comparator;
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
import com.ssafy.tedbear.global.util.RecommendUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {
	final VideoRepository videoRepository;
	final VideoBookmarkRepository videoBookmarkRepository;
	final WatchingVideoRepository watchingVideoRepository;
	final MemberService memberService;
	final int resultMaxCnt = 12;

	@Override
	@Transactional
	public VideoInfoListDto getRecommendList(long memberNo, int delta) {
		Member member = memberService.getMember(memberNo);
		int myScore = member.getMemberScore().getScore();
		int recommendScoreFlag = RecommendUtil.getRecommendScore(myScore + delta);
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

		return new VideoInfoListDto(
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
	public VideoDetailDto getDetail(long memberNo, String watchId) {
		Member member = memberService.getMember(memberNo);
		Video video = videoRepository.findByWatchId(watchId);
		video.setBookmarked(videoBookmarkRepository.findVideoBookmarkByMemberAndVideo(member, video).isPresent());
		watchingVideoRepository.findByMemberAndVideo(member, video)
			.ifPresentOrElse(x -> video.setLastWatchingTime(x.getVideoProgressTime()),
				() -> video.setLastWatchingTime(0));
		return new VideoDetailDto(video);
	}

	@Override
	public VideoInfoDto getWatchingRecent(long memberNo) {
		Member member = memberService.getMember(memberNo);

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
	public VideoInfoListDto getWatchingList(long memberNo, Pageable pageable) {
		Member member = memberService.getMember(memberNo);
		Slice<WatchingVideo> watchingVideoSlice = watchingVideoRepository.findSliceByMemberAndVideoStatus(pageable,
			member, false);
		List<Video> videoList = watchingVideoSlice.get().map(watchingVideo -> watchingVideo.getVideo()).collect(
			Collectors.toList());
		updateBookmarkVideo(member, videoList);
		return new VideoInfoListDto(videoList);
	}

	@Override
	@Transactional
	public VideoInfoListDto getCompleteList(long memberNo, Pageable pageable) {
		Member member = memberService.getMember(memberNo);

		Slice<WatchingVideo> completeVideoSlice = watchingVideoRepository.findSliceByMemberAndVideoStatus(pageable,
			member, true);

		List<Video> videoList = completeVideoSlice.get().map(watchingVideo -> watchingVideo.getVideo()).collect(
			Collectors.toList());
		updateBookmarkVideo(member, videoList);
		return new VideoInfoListDto(videoList);
	}

	@Override
	public VideoInfoListDto searchVideo(String query, Pageable pageable) {
		return new VideoInfoListDto(videoRepository.findSliceByTitle(query, pageable)
			.get()
			.collect(Collectors.toList()));
	}

	@Override
	@Transactional
	public void saveWatchingRecord(long memberNo, WatchingVideoInfoDto request) {
		Member member = memberService.getMember(memberNo);

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
	public void saveCompleteRecord(long memberNo, WatchingVideoInfoDto request) {
		Member member = memberService.getMember(memberNo);

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
	public VideoInfoListDto getVideoBookmarkList(long memberNo) {
		Member member = Member.builder().no(memberNo).build();
		List<VideoBookmark> videoBookmarkList = videoBookmarkRepository.findVideoBookmarksByMember(member);
		List<Video> videoList = videoBookmarkList.stream().map(x -> x.getVideo()).collect(Collectors.toList());
		updateBookmarkVideo(member, videoList);
		return new VideoInfoListDto(videoList);

	}

	@Override
	public void saveVideoBookmark(long memberNo, long videoNo) {
		Member member = Member.builder().no(memberNo).build();
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
	public void deleteVideoBookmark(long memberNo, long videoNo) {
		Member member = Member.builder().no(memberNo).build();
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
