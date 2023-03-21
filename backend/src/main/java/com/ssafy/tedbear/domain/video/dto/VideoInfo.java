package com.ssafy.tedbear.domain.video.dto;

import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;

@Getter
public class VideoInfo {
	String thumbnailUrl;
	String title;
	String watchId;
	int score;
	boolean isBookMarked;

	public VideoInfo(Video video) {
		this.thumbnailUrl = video.getThumbnailUrl();
		this.title = video.getTitle();
		this.watchId = video.getWatchId();
		this.score = video.getScore();
		this.isBookMarked = video.isBookmarked();
	}
}
