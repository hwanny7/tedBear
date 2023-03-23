package com.ssafy.tedbear.domain.video.controller;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.video.dto.VideoDetail;
import com.ssafy.tedbear.domain.video.dto.VideoInfo;
import com.ssafy.tedbear.domain.video.dto.VideoInfoList;
import com.ssafy.tedbear.domain.video.dto.WatchingVideoInfo;
import com.ssafy.tedbear.domain.video.service.VideoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("video")
public class VideoController {
	final VideoService videoService;
	final MemberRepository memberRepository;

	// 추천 영상 12개 뿌리기
	@GetMapping("/recommend/list")
	public ResponseEntity<VideoInfoList> getRecommendList() {
		Member member = memberRepository.findById(1L)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		return ResponseEntity.ok(videoService.getRecommendList(member));
	}

	@GetMapping("/detail/{watchId}")
	public ResponseEntity<VideoDetail> getDetail(@PathVariable("watchId") String watchId) {
		Member member = memberRepository.findById(1L)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		return ResponseEntity.ok(videoService.getDetail(member, watchId));
	}

	@GetMapping("/watching/recent")
	public ResponseEntity<VideoInfo> getWatchingRecent() {
		Member member = memberRepository.findById(1L)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		return ResponseEntity.ok(videoService.getWatchingRecent(member));
	}

	@GetMapping("/watching/list")
	public ResponseEntity<VideoInfoList> getWatchingList(@RequestParam int page) {
		Member member = memberRepository.findById(1L)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		return ResponseEntity.ok(videoService.getWatchingList(member, page));
	}

	@GetMapping("/complete/list")
	public ResponseEntity<VideoInfoList> getCompleteList(@RequestParam int page) {
		Member member = memberRepository.findById(1L)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		return ResponseEntity.ok(videoService.getCompleteList(member, page));
	}

	@PostMapping("/watching")
	public ResponseEntity saveWatchingRecord(@RequestBody WatchingVideoInfo request) {
		Member member = memberRepository.findById(1L)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		videoService.saveWatchingRecord(member, request);
		return new ResponseEntity(HttpStatus.CREATED);
	}

	@PostMapping("/complete")
	public ResponseEntity saveCompleteRecord(@RequestBody WatchingVideoInfo request) {
		Member member = memberRepository.findById(1L)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		videoService.saveCompleteRecord(member, request);
		return new ResponseEntity(HttpStatus.CREATED);
	}

}
