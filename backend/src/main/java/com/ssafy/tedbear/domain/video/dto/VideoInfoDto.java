package com.ssafy.tedbear.domain.video.dto;

import org.springframework.web.util.HtmlUtils;

import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;

@Getter
public class VideoInfoDto {
	String thumbnailUrl;
	String title;
	String watchId;
	int score;
	boolean isBookMarked;

	public VideoInfoDto(Video video) {
		this.thumbnailUrl = video.getThumbnailUrl();
		this.title = HtmlUtils.htmlUnescape(video.getTitle());
		this.watchId = video.getWatchId();
		this.score = video.getScore();
		this.isBookMarked = video.isBookmarked();
	}
}
