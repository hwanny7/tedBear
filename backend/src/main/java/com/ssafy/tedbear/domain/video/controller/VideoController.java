package com.ssafy.tedbear.domain.video.controller;

import java.util.NoSuchElementException;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	public ResponseEntity<VideoInfoList> getRecommendList() {
		return ResponseEntity.ok(videoService.getRecommendList(1L));
	}

	@GetMapping("/detail/{watchId}")
	public ResponseEntity<VideoDetail> getDetail(@PathVariable("watchId") String watchId) {
		return ResponseEntity.ok(videoService.getDetail(1L, watchId));
	}

	@GetMapping("/watching/recent")
	public ResponseEntity<VideoInfo> getWatchingRecent() {
		return ResponseEntity.ok(videoService.getWatchingRecent(1L));
	}

	@GetMapping("/watching/list")
	public ResponseEntity<VideoInfoList> getWatchingList(Pageable pageable) {
		return ResponseEntity.ok(videoService.getWatchingList(1L, pageable));
	}

	@GetMapping("/complete/list")
	public ResponseEntity<VideoInfoList> getCompleteList(Pageable pageable) {
		return ResponseEntity.ok(videoService.getCompleteList(1L, pageable));
	}

	@GetMapping("/search")
	public ResponseEntity<VideoInfoList> searchVideo(SearchDto.Request searchCondition, Pageable pageable) {
		return ResponseEntity.ok(videoService.searchVideo(searchCondition.getQuery(), pageable));

	}

	@PostMapping("/watching")
	public ResponseEntity saveWatchingRecord(@RequestBody WatchingVideoInfo request) {
		videoService.saveWatchingRecord(1L, request);
		return new ResponseEntity(HttpStatus.CREATED);
	}

	@PostMapping("/complete")
	public ResponseEntity saveCompleteRecord(@RequestBody WatchingVideoInfo request) {
		videoService.saveCompleteRecord(1L, request);
		return new ResponseEntity(HttpStatus.CREATED);
	}

	@GetMapping("/bookmark/list")
	public ResponseEntity<VideoInfoList> getVideoBookmarkList() {
		return ResponseEntity.ok(videoService.getVideoBookmarkList(1L));
	}

	@PostMapping("/bookmark/{videoNo}")
	public ResponseEntity<VideoInfoList> saveVideoBookmark(@PathVariable long videoNo) {
		videoService.saveVideoBookmark(1L, videoNo);
		return new ResponseEntity(HttpStatus.CREATED);

	}

	@DeleteMapping("/bookmark/{videoNo}")
	public ResponseEntity<VideoInfoList> deleteVideoBookmark(@PathVariable long videoNo) {
		videoService.deleteVideoBookmark(1L, videoNo);
		return new ResponseEntity(HttpStatus.OK);
	}

}
