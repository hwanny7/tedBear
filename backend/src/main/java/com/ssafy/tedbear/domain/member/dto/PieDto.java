package com.ssafy.tedbear.domain.member.dto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.ssafy.tedbear.domain.member.entity.MemberScore;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;

@Getter
public class PieDto {
	List<Integer> pieList;

	public PieDto(List<Integer> scoreList) {

		this.pieList = Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

		scoreList.stream().forEach(score -> {
			int idx = score == 0 ? 10 : score / 10000;
			pieList.set(idx, pieList.get(idx) + 1);
		});

	}
}
