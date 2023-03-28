package com.ssafy.tedbear.domain.video.dto;

import java.util.Arrays;
import java.util.List;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;

@Getter
public class VideoScoreInfoDto {
	int score;
	int totalSentenceCount;
	List<Integer> sentenceScoreInfo;

	public VideoScoreInfoDto(Video video) {
		this.score = video.getScore() == 0 ? 10 : video.getScore() - 1 / 10000;
		List<Sentence> sentenceList = video.getSentenceList();
		this.totalSentenceCount = sentenceList.size();
		this.sentenceScoreInfo = Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

		sentenceList.stream().forEach(sentence -> {
			int sentenceScore = sentence.getScore();
			int idx = sentenceScore == 0 ? 10 : sentenceScore - 1 / 10000;
			sentenceScoreInfo.set(idx, sentenceScoreInfo.get(idx) + 1);
		});
	}
}
