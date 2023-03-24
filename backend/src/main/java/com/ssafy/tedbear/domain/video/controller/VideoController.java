package com.ssafy.tedbear.domain.video.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.tedbear.domain.member.repository.MemberRepository;
import com.ssafy.tedbear.domain.video.dto.VideoDetailDto;
import com.ssafy.tedbear.domain.video.dto.VideoInfoDto;
import com.ssafy.tedbear.domain.video.dto.VideoInfoListDto;
import com.ssafy.tedbear.domain.video.dto.WatchingVideoInfoDto;
import com.ssafy.tedbear.domain.video.service.VideoService;
import com.ssafy.tedbear.global.common.SearchDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("video")
public class VideoController {
	final VideoService videoService;
	final MemberRepository memberRepository;

	// 추천 영상 12개 뿌리기
	@GetMapping("/recommend/list")
	public ResponseEntity<VideoInfoListDto> getRecommendList() {
		return ResponseEntity.ok(videoService.getRecommendList(1L));
	}

	@GetMapping("/detail/{watchId}")
	public ResponseEntity<VideoDetailDto> getDetail(@PathVariable("watchId") String watchId) {
		return ResponseEntity.ok(videoService.getDetail(1L, watchId));
	}

	@GetMapping("/watching/recent")
	public ResponseEntity<VideoInfoDto> getWatchingRecent() {
		return ResponseEntity.ok(videoService.getWatchingRecent(1L));
	}

	@GetMapping("/watching/list")
	public ResponseEntity<VideoInfoListDto> getWatchingList(Pageable pageable) {
		return ResponseEntity.ok(videoService.getWatchingList(1L, pageable));
	}

	@GetMapping("/complete/list")
	public ResponseEntity<VideoInfoListDto> getCompleteList(Pageable pageable) {
		return ResponseEntity.ok(videoService.getCompleteList(1L, pageable));
	}

	@GetMapping("/search")
	public ResponseEntity<VideoInfoListDto> searchVideo(SearchDto.Request searchCondition, Pageable pageable) {
		return ResponseEntity.ok(videoService.searchVideo(searchCondition.getQuery(), pageable));

	}

	@PostMapping("/watching")
	public ResponseEntity saveWatchingRecord(@RequestBody WatchingVideoInfoDto request) {
		videoService.saveWatchingRecord(1L, request);
		return new ResponseEntity(HttpStatus.CREATED);
	}

	@PostMapping("/complete")
	public ResponseEntity saveCompleteRecord(@RequestBody WatchingVideoInfoDto request) {
		videoService.saveCompleteRecord(1L, request);
		return new ResponseEntity(HttpStatus.CREATED);
	}

	@GetMapping("/bookmark/list")
	public ResponseEntity<VideoInfoListDto> getVideoBookmarkList() {
		return ResponseEntity.ok(videoService.getVideoBookmarkList(1L));
	}

	@PostMapping("/bookmark/{videoNo}")
	public ResponseEntity<VideoInfoListDto> saveVideoBookmark(@PathVariable long videoNo) {
		videoService.saveVideoBookmark(1L, videoNo);
		return new ResponseEntity(HttpStatus.CREATED);

	}

	@DeleteMapping("/bookmark/{videoNo}")
	public ResponseEntity<VideoInfoListDto> deleteVideoBookmark(@PathVariable long videoNo) {
		videoService.deleteVideoBookmark(1L, videoNo);
		return new ResponseEntity(HttpStatus.OK);
	}

}
