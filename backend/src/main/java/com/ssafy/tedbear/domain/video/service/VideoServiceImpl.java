package com.ssafy.tedbear.domain.video.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.tedbear.domain.bookmark.repository.VideoBookmarkRepository;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.video.dto.VideoDetail;
import com.ssafy.tedbear.domain.video.dto.VideoInfoList;
import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.video.repository.VideoRepository;
import com.ssafy.tedbear.global.util.RecommendUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {
	final VideoRepository videoRepository;
	final VideoBookmarkRepository videoBookmarkRepository;
	final int resultMaxCnt = 12;

	@Override
	public VideoInfoList getRecommendList(Member member) {
		int myScore = member.getMemberScore().getScore();
		int recommendScoreFlag = RecommendUtil.getRecommendScore(myScore);
		int deltaScore = 1500;

		List<Video> recommendVideoList = new ArrayList<>();
		do {
			recommendVideoList.addAll(videoRepository.findByScoreBetween(
				Math.max(1, recommendScoreFlag - deltaScore),
				recommendScoreFlag + deltaScore));
			deltaScore += 10000;
			System.out.println(recommendVideoList.size());
		} while (recommendVideoList.size() < resultMaxCnt);

		return new VideoInfoList(
			recommendVideoList
				.stream()
				.sorted(Comparator.comparingInt(a -> Math.abs(a.getScore() - myScore)))
				.limit(resultMaxCnt)
				.peek(x -> x.setBookmarked(
					videoBookmarkRepository.findVideoBookmarksByMemberAndVideo(member, x).isPresent()))
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
}
