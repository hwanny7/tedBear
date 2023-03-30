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

	public static int getDelta(String difficulty) {
		int delta;
		switch (difficulty) {
			case "easy":
				delta = -15000;
				break;
			case "hard":
				delta = 15000;
				break;
			case "normal":
			default:
				delta = 0;
		}
		return delta;
	}

	public static int getBoardSize(String difficulty) {
		int boardSize;
		switch (difficulty) {
			case "easy":
				boardSize = 8;
				break;
			case "hard":
				boardSize = 16;
				break;
			case "impossible":
				boardSize = 24;
				break;
			case "master":
				boardSize = 30;
				break;
			case "ssafy":
				boardSize = 40;
				break;
			case "normal":
			default:
				boardSize = 12;
		}
		return boardSize;
	}
}
