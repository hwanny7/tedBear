package com.ssafy.tedbear.domain.sentence.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;

public class SentenceDto {

	@Getter
	public static class InfoListResponse {
		List<Info> data;

		public InfoListResponse(List<Sentence> sentenceList) {
			List<Info> data = sentenceList.stream().map(Info::new).collect(Collectors.toList());
			this.data = data;
		}

	}

	@Getter
	public static class InfoResponse {
		Info data;

		public InfoResponse(Sentence sentence) {
			this.data = new Info(sentence);
		}
	}

	@Getter
	static class Info {
		String content;
		String translation;
		int startTime;

		public Info(Sentence sentence) {
			this.content = sentence.getContent();
			this.translation = sentence.getTranslation();
			this.startTime = sentence.getStartTime();
		}
	}

}
