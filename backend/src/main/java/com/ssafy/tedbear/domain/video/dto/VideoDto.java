package com.ssafy.tedbear.domain.video.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.tedbear.domain.sentence.dto.SentenceDto;
import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;
import lombok.Setter;

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
			this.data = new Info(video);
		}
	}

	@Getter
	public static class DetailResponse {
		Detail data;

		public DetailResponse(Video video) {
			this.data = new Detail(video);
		}
	}

	@Getter
	@Setter
	public class WatchIdRequest {
		public String watchId;
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

	@Getter
	static class Detail {
		String title;
		String videoUrl;
		int score;
		SentenceDto.InfoListResponse infoListResponse;
		boolean isBookMarked;

		public Detail(Video video) {
			this.title = video.getTitle();
			this.videoUrl = video.getVideoUrl();
			this.score = video.getScore();
			this.infoListResponse = new SentenceDto.InfoListResponse(video.getSentenceList());
			this.isBookMarked = video.isBookmarked();
		}
	}

}
