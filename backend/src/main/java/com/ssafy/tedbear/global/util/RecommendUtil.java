package com.ssafy.tedbear.global.util;

import java.util.Random;

public class RecommendUtil {
	// 정규분포 이용해서, +- 10000 범위의 추천 스코어 리턴
	public static int getRecommendScore(int myScore) {
		Random random = new Random();
		int rand = (int)(random.nextGaussian() * 10000 / 2.58);
		rand = Math.max(rand, -10000);
		rand = Math.min(rand, 10000);
		int recommendScore = myScore + rand;
		return Math.min(Math.max(recommendScore, 1), 99999);
	}
}
