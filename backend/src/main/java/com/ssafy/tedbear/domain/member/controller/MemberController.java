package com.ssafy.tedbear.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.domain.member.dto.FeelDto;
import com.ssafy.tedbear.domain.member.dto.LevelInfoDto;
import com.ssafy.tedbear.domain.member.dto.PieDto;
import com.ssafy.tedbear.domain.member.dto.ProblemDto;
import com.ssafy.tedbear.domain.member.dto.ProblemListDto;
import com.ssafy.tedbear.domain.member.dto.StreakListDto;
import com.ssafy.tedbear.domain.member.service.MemberService;
import com.ssafy.tedbear.global.common.oauth2.dto.CustomOAuth2User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("/api/member")
public class MemberController {
	private final MemberService memberService;

	@GetMapping("/streak")
	public ResponseEntity<StreakListDto> getStreak(@AuthenticationPrincipal CustomOAuth2User user) {
		return ResponseEntity.ok(memberService.getStreak(user.getName()));
	}

	@GetMapping("/test/problem")
	public ResponseEntity<ProblemListDto> getProblemList() {
		return ResponseEntity.ok(memberService.getProblemList());
	}

	@PostMapping("/test/result")
	public ResponseEntity<?> saveProblemResult(@AuthenticationPrincipal CustomOAuth2User user,
		@RequestBody ProblemDto.Request request) {
		memberService.saveProblemResult(user.getName(), request.getTestResult());
		return ResponseEntity.ok(HttpStatus.CREATED);
	}

	@GetMapping("/pie")
	public ResponseEntity<PieDto> getPie(@AuthenticationPrincipal CustomOAuth2User user) {
		return ResponseEntity.ok(memberService.getPie(user.getName()));
	}

	@GetMapping("/level")
	public ResponseEntity<LevelInfoDto> getLevel(@AuthenticationPrincipal CustomOAuth2User user) {
		return ResponseEntity.ok(memberService.getLevel(user.getName()));
	}

	@PutMapping("/feel")
	public ResponseEntity<?> updateScoreByFeel(@AuthenticationPrincipal CustomOAuth2User user,
		@RequestBody FeelDto feelDto) {
		memberService.updateScoreByFeel(user.getName(), feelDto);
		return ResponseEntity.ok(HttpStatus.OK);
	}

}