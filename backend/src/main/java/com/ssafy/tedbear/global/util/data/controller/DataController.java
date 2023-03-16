package com.ssafy.tedbear.global.util.data.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.tedbear.global.util.data.service.DataService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("data")
public class DataController {
	final DataService dataService;

	@GetMapping("/init-word")
	public void initWord() {
		dataService.initWord();
	}

	@GetMapping("/init-video-sentence")
	public void initVideoSentence() {
		dataService.initVideoSentence();
	}

	@GetMapping("/init-category")
	public void initCategory() {
		dataService.initCategory();
	}

	@GetMapping("/init-sentence-score")
	public void initSentenceScore() {
		dataService.initSentenceScore();
	}

}
