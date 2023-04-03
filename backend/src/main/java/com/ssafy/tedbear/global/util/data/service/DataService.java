package com.ssafy.tedbear.global.util.data.service;

public interface DataService {
	void initWord();

	void initVideoSentence();

	void initCategory();

	void initSentenceScore();

	void initSentenceWord();

	void initVideoScore();

    void cleanData();
}
