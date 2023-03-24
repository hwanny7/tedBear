package com.ssafy.tedbear.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.domain.member.dto.Problem;
import com.ssafy.tedbear.domain.member.dto.ProblemList;
import com.ssafy.tedbear.domain.member.dto.StreakList;
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
	public ResponseEntity<StreakList> getStreak() {
		return ResponseEntity.ok(memberService.getStreak(2L));
	}

	@GetMapping("/test/problem")
	public ResponseEntity<ProblemList> getProblemList() {
		return ResponseEntity.ok(memberService.getProblemList());
	}

	@PostMapping("/test/result")
	public ResponseEntity saveProblemResult(@RequestBody Problem.Request request) {
		memberService.saveProblemResult(1L, request.getTestResult());
		return new ResponseEntity(HttpStatus.CREATED);
	}
}