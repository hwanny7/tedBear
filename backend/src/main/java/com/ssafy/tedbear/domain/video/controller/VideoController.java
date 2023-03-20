package com.ssafy.tedbear.domain.video.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.video.dto.VideoDto;
import com.ssafy.tedbear.domain.video.service.VideoService;
import com.ssafy.tedbear.global.util.data.service.DataService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("video")
public class VideoController {
	final VideoService videoService;
	final MemberRepository memberRepository;

	// 추천 영상 12개
	@GetMapping("/recommend/list")
	public ResponseEntity<VideoDto.InfoListResponse> getRecommendList() {
		Member member = memberRepository.findById(1L).get();
		return ResponseEntity.ok(videoService.getRecommendList(member));
	}

}
