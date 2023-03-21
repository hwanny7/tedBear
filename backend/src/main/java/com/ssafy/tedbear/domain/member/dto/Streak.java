package com.ssafy.tedbear.domain.member.dto;

import lombok.Getter;

@Getter
public class Streak {
	String date;
	Integer count;

	public void increaseCount() {
		if (count == null)
			count = 1;
		else
			this.count++;
	}

	public Streak(String date) {
		this.date = date;
	}
}
