package com.ssafy.tedbear.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.domain.member.dto.LevelInfoDto;
import com.ssafy.tedbear.domain.member.dto.PieDto;
import com.ssafy.tedbear.domain.member.dto.ProblemDto;
import com.ssafy.tedbear.domain.member.dto.ProblemListDto;
import com.ssafy.tedbear.domain.member.dto.StreakListDto;
import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@Transactional
@RequestMapping("/member")
public class MemberController {
	private final MemberRepository memberRepository;
	private final MemberService memberService;

	@GetMapping("/streak")
	public ResponseEntity<StreakListDto> getStreak() {
		return ResponseEntity.ok(memberService.getStreak(2L));
	}

	@GetMapping("/test/problem")
	public ResponseEntity<ProblemListDto> getProblemList() {
		return ResponseEntity.ok(memberService.getProblemList());
	}

	@PostMapping("/test/result")
	public ResponseEntity saveProblemResult(@RequestBody ProblemDto.Request request) {
		memberService.saveProblemResult(1L, request.getTestResult());
		return new ResponseEntity(HttpStatus.CREATED);
	}

	@GetMapping("/pie")
	public ResponseEntity<PieDto> getPie(){
		return ResponseEntity.ok(memberService.getPie(1L));
	}
	@GetMapping("/level")
	public ResponseEntity<LevelInfoDto> getLevel(){
		return ResponseEntity.ok(memberService.getLevel(1L));
	}
}