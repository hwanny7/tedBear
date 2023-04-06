package com.ssafy.tedbear.domain.member.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.Getter;

@Getter
public class StreakListDto {
	List<StreakDto> streakList;

	public StreakListDto(Map<String, StreakDto> streakMap) {
		this.streakList = new ArrayList<>(streakMap.values());
	}
}
