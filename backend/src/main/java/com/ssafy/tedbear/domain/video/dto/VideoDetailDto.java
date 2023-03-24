package com.ssafy.tedbear.domain.video.dto;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.util.HtmlUtils;

import com.ssafy.tedbear.domain.sentence.dto.SentenceInfoDto;
import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;

@Getter
public class VideoDetailDto {
	String title;
	String videoUrl;
	VideoScoreInfoDto scoreInfo;
	List<SentenceInfoDto> sentenceInfoList;
	boolean isBookMarked;

	public VideoDetailDto(Video video) {

		this.title = HtmlUtils.htmlUnescape(video.getTitle());
		this.videoUrl = video.getVideoUrl();
		this.scoreInfo = new VideoScoreInfoDto(video);
		this.sentenceInfoList = video.getSentenceList().stream().map(SentenceInfoDto::new).collect(Collectors.toList());
		this.isBookMarked = video.isBookmarked();
	}
}
