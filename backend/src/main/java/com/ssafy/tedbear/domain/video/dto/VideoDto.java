package com.ssafy.tedbear.domain.video.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Builder;
import lombok.Getter;

public class VideoDto {

	@Getter
	public static class InfoListResponse {
		List<Info> data;

		public InfoListResponse(List<Video> videoList) {
			List<Info> data = videoList.stream().map(Info::new).collect(Collectors.toList());
			this.data = data;
		}

	}

	@Getter
	public static class InfoResponse {
		Info data;

		public InfoResponse(Video video) {
			// Info data = Info.builder()
			// 	.title(video.getTitle())
			// 	.score(video.getScore())
			// 	.watchId(video.getWatchId())
			// 	.thumbnailUrl(video.getThumbnailUrl())
			// 	.isBookMarked(video.isBookmarked())
			// 	.build();
			this.data = new Info(video);
		}

	}

	@Getter
	static class Info {
		String thumbnailUrl;
		String title;
		String watchId;
		int score;
		boolean isBookMarked;

		public Info(Video video) {
			this.thumbnailUrl = video.getThumbnailUrl();
			this.title = video.getTitle();
			this.watchId = video.getWatchId();
			this.score = video.getScore();
			this.isBookMarked = video.isBookmarked();
		}
	}

}
