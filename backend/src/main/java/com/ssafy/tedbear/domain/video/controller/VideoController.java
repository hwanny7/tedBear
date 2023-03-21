package com.ssafy.tedbear.domain.video.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.video.dto.VideoDto;
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
	public ResponseEntity<VideoDto.InfoListResponse> getRecommendList() {
		Member member = memberRepository.findById(1L).get();
		return ResponseEntity.ok(videoService.getRecommendList(member));
	}

	@GetMapping("/detail/{watchId}")
	public ResponseEntity<VideoDto.DetailResponse> getDetail(@PathVariable("watchId") String watchId) {
		Member member = memberRepository.findById(1L).get();
		return ResponseEntity.ok(videoService.getDetail(member, watchId));
	}
}