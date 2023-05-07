package com.ssafy.tedbear.global.util;

import java.util.Random;

public class RecommendUtil {
	final static int RANGE = 10000;
	final static Random random = new Random();

	// 정규분포 이용해서, +- RANGE 범위의 추천 스코어 리턴
	public static int getRecommendScore(int myScore) {
		int rand = (int)(random.nextGaussian() * RANGE / 2.58);
		int recommendScore = myScore + Math.min(Math.max(rand, -RANGE), RANGE);
		return Math.min(Math.max(recommendScore, 1), 99999);
	}

	public static int getDelta(String difficulty) {
		int delta;
		switch (difficulty) {
			case "easy":
				delta = -35000;
				break;
			case "hard":
				delta = 35000;
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
