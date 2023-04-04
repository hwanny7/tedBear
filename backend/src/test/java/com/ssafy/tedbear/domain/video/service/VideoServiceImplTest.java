package com.ssafy.tedbear.domain.video.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.tedbear.domain.member.dto.LevelInfoDto;
import com.ssafy.tedbear.domain.member.entity.MemberLevel;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.video.repository.VideoBookmarkRepository;
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
	// 	long lastVideoNo = 1030;
	// 	for (long videoNo = 1000; videoNo <= lastVideoNo; videoNo++) {
	// 		WatchingVideo watchingVideo = WatchingVideo.builder()
	// 			.video(Video.builder().no(videoNo).build())
	// 			.member(member)
	// 			.updatedDate(LocalDateTime.now())
	// 			.videoProgressTime(11)
	// 			.videoStatus(true)
	// 			.build();
	// 		watchingVideoRepository.save(watchingVideo);
	// 		TimeUnit.SECONDS.sleep(1);
	// 		System.out.println(videoNo);
	// 	}
	// 	// assertEquals(watchingVideoRepository.findTop1ByMemberAndVideoStatusOrderByUpdatedDateDesc(member, false)
	// 	// 	.get()
	// 	// 	.getVideo()
	// 	// 	.getNo(), lastVideoNo);
	//
	// }
	//
	// @Test
	// @DisplayName("북마크 조회 쿼리 하나만 나가는지 테스트")
	// @Transactional
	// public void bookmarkTest() {
	// 	Member member = memberRepository.findById(1L)
	// 		.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
	// 	List<Video> videoList = videoRepository.findAll();
	// 	Set<Long> bookmarkedVideoNoSet =
	// 		videoBookmarkRepository
	// 			.findVideoBookmarksByMemberAndVideoIn(member, videoList)
	// 			.stream()
	// 			.map(x -> x.getVideo().getNo())
	// 			.collect(Collectors.toSet());
	//
	// 	assertEquals(bookmarkedVideoNoSet.contains(1L), false);
	// 	assertEquals(bookmarkedVideoNoSet.contains(3L), true);
	// 	assertEquals(bookmarkedVideoNoSet.contains(499L), true);
	// }

	@Test
	@DisplayName("레벨 잘 물어오는지 테스트")
	public void levelTest() {

		int[] expList = {500, 1000, 1500, 2000, 3500, 4500, 6000};
		int[] levelList = {1, 2, 2, 2, 3, 4};
		for (int i = 0; i < 6; i++) {
			LevelInfoDto levelInfoDto = new LevelInfoDto(MemberLevel.builder()
				.levelExp(expList[i]).build());
			assertEquals(levelInfoDto.getLevel(), levelList[i]);
			System.out.println(levelInfoDto.getPercent());
		}

	}
}