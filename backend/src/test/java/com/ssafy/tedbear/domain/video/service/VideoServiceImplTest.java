package com.ssafy.tedbear.domain.video.service;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.tedbear.domain.bookmark.repository.VideoBookmarkRepository;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.video.entity.WatchingVideo;
import com.ssafy.tedbear.domain.video.repository.VideoRepository;
import com.ssafy.tedbear.domain.video.repository.WatchingVideoRepository;

@SpringBootTest
class VideoServiceImplTest {
	@Autowired
	WatchingVideoRepository watchingVideoRepository;
	@Autowired
	MemberRepository memberRepository;
	@Autowired
	VideoBookmarkRepository videoBookmarkRepository;
	@Autowired
	VideoRepository videoRepository;

	// @Test
	// @DisplayName("마지막으로 업데이트된 영상 잘 찾아오는지 테스트")
	// public void saveWatchingTest() throws InterruptedException {
	// 	Member member = memberRepository.findById(1L)
	// 		.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
	// 	long lastVideoNo = 1001;
	// 	for (long videoNo = 1000; videoNo <= lastVideoNo; videoNo++) {
	// 		WatchingVideo watchingVideo = WatchingVideo.builder()
	// 			.video(Video.builder().no(videoNo).build())
	// 			.member(member)
	// 			.updatedDate(LocalDateTime.now())
	// 			.videoProgressTime(11)
	// 			.videoStatus(false)
	// 			.build();
	// 		watchingVideoRepository.save(watchingVideo);
	// 		TimeUnit.SECONDS.sleep(1);
	// 		System.out.println(videoNo);
	// 	}
	// 	assertEquals(watchingVideoRepository.findTop1ByMemberAndVideoStatusOrderByUpdatedDateDesc(member, false)
	// 		.get()
	// 		.getVideo()
	// 		.getNo(), lastVideoNo);
	//
	// }

	@Test
	@DisplayName("북마크 조회 쿼리 하나만 나가는지 테스트")
	@Transactional
	public void bookmarkTest() {
		Member member = memberRepository.findById(1L)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		List<Video> videoList = videoRepository.findAll();
		Set<Long> bookmarkedVideoNoSet =
			videoBookmarkRepository
				.findVideoBookmarksByMemberAndVideoIn(member, videoList)
				.stream()
				.map(x -> x.getVideo().getNo())
				.collect(Collectors.toSet());

		assertEquals(bookmarkedVideoNoSet.contains(1L), false);
		assertEquals(bookmarkedVideoNoSet.contains(3L), true);
		assertEquals(bookmarkedVideoNoSet.contains(499L), true);
	}
}