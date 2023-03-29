package com.ssafy.tedbear.domain.video.dto;

import org.springframework.web.util.HtmlUtils;

import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;

@Getter
public class VideoInfoDto {
	long no;
	String thumbnailUrl;
	String title;
	String watchId;
	int score;
	boolean isBookMarked;

	public VideoInfoDto(Video video) {
		this.no = video.getNo();
		this.thumbnailUrl = video.getThumbnailUrl();
		this.title = HtmlUtils.htmlUnescape(video.getTitle());
		this.watchId = video.getWatchId();
		this.score = video.getScore() == 0 ? 10 : (video.getScore() - 1) / 10000;
		this.isBookMarked = video.isBookmarked();
	}
}
