package com.ssafy.tedbear.global.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class TimeParseUtil {
	// 패턴 인자로 안받고 LocalDateTime으로 바꿔줌. 기본포맷.
	public static LocalDateTime string2Time(String stringTime) {
		return LocalDateTime.parse(stringTime.substring(0, 13), DateTimeFormatter.ofPattern("yyyyMMdd-HHmm"));
	}

	// 패턴을 인자로 받음.
	public static LocalDateTime string2Time(String stringTime, String format) {
		return LocalDateTime.parse(stringTime, DateTimeFormatter.ofPattern(format));
	}

}
