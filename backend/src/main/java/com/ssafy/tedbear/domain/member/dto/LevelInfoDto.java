package com.ssafy.tedbear.domain.member.dto;

import com.ssafy.tedbear.domain.member.entity.MemberLevel;

import lombok.Getter;

@Getter
public class LevelInfoDto {

	int level;
	int percent;

	public LevelInfoDto(MemberLevel memberLevel) {
		int levelExp = memberLevel.getLevelExp();
		int start = 1;
		int end = levelExp;
		int collectExp = -1;
		while (start <= end) {
			int mid = (start + end) / 2;
			int mid_exp = 250 * (mid * mid + mid - 2);
			if (mid_exp <= levelExp) {
				start = mid + 1;
				collectExp = levelExp - mid_exp;
			} else {
				end = mid - 1;
			}
		}
		this.level = end;
		int needExp = 500 + 500 * this.level;
		this.percent = collectExp * 100 / needExp;
	}
}
