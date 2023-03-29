package com.ssafy.tedbear.domain.video.dto;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.util.HtmlUtils;

import com.ssafy.tedbear.domain.sentence.dto.SentenceInfoDto;
import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;

@Getter
public class VideoDetailDto {
	long no;
	String title;
	String videoUrl;
	VideoScoreInfoDto scoreInfo;
	List<SentenceInfoDto> sentenceInfoList;
	int lastWatchingTime;
	boolean isBookMarked;

	public VideoDetailDto(Video video) {
		this.no = video.getNo();
		this.title = HtmlUtils.htmlUnescape(video.getTitle());
		this.videoUrl = video.getVideoUrl();
		this.lastWatchingTime = video.getLastWatchingTime();
		this.scoreInfo = new VideoScoreInfoDto(video);
		this.sentenceInfoList = video.getSentenceList().stream().map(SentenceInfoDto::new).collect(Collectors.toList());
		this.isBookMarked = video.isBookmarked();
	}
}
