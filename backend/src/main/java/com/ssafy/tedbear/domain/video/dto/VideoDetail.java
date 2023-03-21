package com.ssafy.tedbear.domain.video.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.tedbear.domain.sentence.dto.SentenceInfo;
import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;

@Getter
public class VideoDetail {
	String title;
	String videoUrl;
	int score;
	List<SentenceInfo> sentenceInfoList;
	boolean isBookMarked;

	public VideoDetail(Video video) {
		this.title = video.getTitle();
		this.videoUrl = video.getVideoUrl();
		this.score = video.getScore();
		this.sentenceInfoList = video.getSentenceList().stream().map(SentenceInfo::new).collect(Collectors.toList());
		this.isBookMarked = video.isBookmarked();
	}
}
