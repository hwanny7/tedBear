package com.ssafy.tedbear.domain.member.controller;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ssafy.tedbear.domain.member.dto.StreakList;
import com.ssafy.tedbear.domain.member.entity.Member;
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
		Member member = memberRepository.findById(2L)
			.orElseThrow(() -> new NoSuchElementException("해당 회원을 찾을 수 없습니다"));
		return ResponseEntity.ok(memberService.getStreak(member));
	}

}