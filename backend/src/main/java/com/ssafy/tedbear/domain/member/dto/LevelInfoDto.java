package com.ssafy.tedbear.domain.member.dto;

import com.ssafy.tedbear.domain.member.entity.MemberLevel;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class LevelInfoDto {

	int level;
	int percent;

	public LevelInfoDto(MemberLevel memberLevel) {
		int levelExp = memberLevel.getLevelExp();
		int start = 1;
		int end = Math.max(10, (int)Math.sqrt(levelExp));
		long collectExp = -1L;
		while (start <= end) {
			int mid = (start + end) / 2;
			long mid_exp = 250 * (mid * mid + mid - 2);
			if (mid_exp <= levelExp) {
				start = mid + 1;
				collectExp = levelExp - mid_exp;
			} else {
				end = mid - 1;
			}
		}
		this.level = end;
		int needExp = 500 + 500 * this.level;
		this.percent = (int)(collectExp * 100 / needExp);
	}

}
