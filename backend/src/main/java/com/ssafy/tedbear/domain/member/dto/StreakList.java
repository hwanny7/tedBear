package com.ssafy.tedbear.domain.member.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.Getter;

@Getter
public class StreakList {
	List<Streak> streakList;

	public StreakList(Map<String, Streak> streakMap) {
		this.streakList = new ArrayList<>(streakMap.values());
	}
}
