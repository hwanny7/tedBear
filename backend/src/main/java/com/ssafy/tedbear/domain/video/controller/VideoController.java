package com.ssafy.tedbear.domain.video.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.video.dto.VideoBookmarkDto;
import com.ssafy.tedbear.domain.video.dto.VideoDetailDto;
import com.ssafy.tedbear.domain.video.dto.VideoInfoDto;
import com.ssafy.tedbear.domain.video.dto.VideoInfoListDto;
import com.ssafy.tedbear.domain.video.dto.WatchingVideoInfoDto;
import com.ssafy.tedbear.domain.video.service.VideoService;
import com.ssafy.tedbear.global.common.SearchDto;
import com.ssafy.tedbear.global.common.oauth2.CustomOAuth2User;
import com.ssafy.tedbear.global.util.RecommendUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("video")
public class VideoController {
	final VideoService videoService;
	final MemberRepository memberRepository;

	// 추천 영상 12개 뿌리기
	@GetMapping("/recommend/list/{difficulty}")
	public ResponseEntity<VideoInfoListDto> getRecommendList(@PathVariable("difficulty") String difficulty,
		@AuthenticationPrincipal CustomOAuth2User user) {
		int delta = RecommendUtil.getDelta(difficulty);
		return ResponseEntity.ok(videoService.getRecommendList(user.getName(), delta));
	}

	@GetMapping("/detail/{watchId}")
	public ResponseEntity<VideoDetailDto> getDetail(@PathVariable("watchId") String watchId,
		@AuthenticationPrincipal CustomOAuth2User user) {
		return ResponseEntity.ok(videoService.getDetail(user.getName(), watchId));
	}

	@GetMapping("/watching/recent")
	public ResponseEntity<VideoInfoDto> getWatchingRecent(@AuthenticationPrincipal CustomOAuth2User user) {
		return ResponseEntity.ok(videoService.getWatchingRecent(user.getName()));
	}

	@GetMapping("/watching/list")
	public ResponseEntity<VideoInfoListDto> getWatchingList(Pageable pageable,
		@AuthenticationPrincipal CustomOAuth2User user) {
		return ResponseEntity.ok(videoService.getWatchingList(user.getName(), pageable));
	}

	@GetMapping("/complete/list")
	public ResponseEntity<VideoInfoListDto> getCompleteList(Pageable pageable,
		@AuthenticationPrincipal CustomOAuth2User user) {
		return ResponseEntity.ok(videoService.getCompleteList(user.getName(), pageable));
	}

	@GetMapping("/search")
	public ResponseEntity<VideoInfoListDto> searchVideo(SearchDto.Request searchCondition, Pageable pageable,
		@AuthenticationPrincipal CustomOAuth2User user) {
		return ResponseEntity.ok(videoService.searchVideo(searchCondition.getQuery(), pageable));

	}

	@PostMapping("/watching")
	public ResponseEntity saveWatchingRecord(@RequestBody WatchingVideoInfoDto request,
		@AuthenticationPrincipal CustomOAuth2User user) {
		videoService.saveWatchingRecord(user.getName(), request);
		return new ResponseEntity(HttpStatus.CREATED);
	}

	@PostMapping("/complete")
	public ResponseEntity saveCompleteRecord(@RequestBody WatchingVideoInfoDto request,
		@AuthenticationPrincipal CustomOAuth2User user) {
		videoService.saveCompleteRecord(user.getName(), request);
		return new ResponseEntity(HttpStatus.CREATED);
	}

	@GetMapping("/bookmark/list")
	public ResponseEntity<VideoInfoListDto> getVideoBookmarkList(@AuthenticationPrincipal CustomOAuth2User user) {
		return ResponseEntity.ok(videoService.getVideoBookmarkList(user.getName()));
	}

	@PostMapping("/bookmark")
	public ResponseEntity<?> saveVideoBookmark(@RequestBody VideoBookmarkDto videoBookmarkDto,
		@AuthenticationPrincipal CustomOAuth2User user) {
		videoService.saveVideoBookmark(user.getName(), videoBookmarkDto.getVideoNo());
		return new ResponseEntity(HttpStatus.CREATED);

	}

	@DeleteMapping("/bookmark")
	public ResponseEntity<?> deleteVideoBookmark(@RequestBody VideoBookmarkDto videoBookmarkDto,
		@AuthenticationPrincipal CustomOAuth2User user) {
		videoService.deleteVideoBookmark(user.getName(), videoBookmarkDto.getVideoNo());
		return new ResponseEntity(HttpStatus.OK);
	}

}
