package com.ssafy.tedbear.global.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CalcScoreUtil {
	public static double convertFormat(double val) {
		return Math.round(val * 100.0) / 100.0;
	}

	public static double processScore(double val, String scoreName) {
			if (scoreName.equals("gf")) {
				if (val < 0)
					val = 0.0;
				if (val > 20) {
					val = 15 + Math.random() * 5;
				}
			} else if (scoreName.equals("fr")) {
				if (val < 0) {
					val = 30 - Math.random() * 30;
				}
				if (val > 100) {
					val = 70 + Math.random() * 30;
				}
			} else if (scoreName.equals("fk")) {
				if (val < 0) {
					val = 3 - Math.random() * 3;
				}
				if (val > 12) {
					val = 9 + Math.random() * 3;
				}
			}
		return convertFormat(val);
	}

	public static double getGunningFog(String content) {
		String[] sentences = content.split("[.?!]");

		int numSentences = Math.max(1, sentences.length);
		int numWords = 0;
		int numComplexWords = 0;

		for (String sentence : sentences) {
			String[] words = sentence.split("\\s+");
			numWords += Math.max(1, words.length);

			for (String word : words) {
				int syllables = countSyllables(word);
				if (syllables >= 3) {
					numComplexWords++;
				}
			}
		}

		double avgWordsPerSentence = (double)numWords / numSentences;
		double percentageComplexWords = ((double)numComplexWords / numWords) * 100;

		return 0.4 * (avgWordsPerSentence + percentageComplexWords);
	}

	public static double getFleschReadingEase(String content) {
		int numSentences = Math.max(1, content.split("[.!?]+").length);
		int numWords = Math.max(1, content.split("\\s+").length);
		int numSyllables = countSyllables(content);

		return 206.835 - 1.015 * (numWords / numSentences) - 84.6 * (numSyllables / numWords);
	}

	public static double getFleshKincaidGradeLevel(String content) {
		int numSentences = Math.max(1, content.split("[.!?]+").length);
		int numWords = Math.max(1, content.split("\\s+").length);
		int numSyllables = countSyllables(content);

		return 0.39 * (numWords / numSentences) + 11.8 * (numSyllables / numWords) - 15.59;
	}

	static int countSyllables(String word) {
		Pattern pattern = Pattern.compile("[aeiouyAEIOUY]+[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]*");

		Matcher matcher = pattern.matcher(word);

		int count = 0;
		while (matcher.find()) {
			count++;
		}
		return count;
	}

	public static int getScore(double gf, double fr, double fk) {
		int score = (int)(gf * 100000 / 20 + (100 - fr) * 100000 / 100 + fk * 100000 / 12) / 3;
		return Math.max(score, 1);
	}
}
