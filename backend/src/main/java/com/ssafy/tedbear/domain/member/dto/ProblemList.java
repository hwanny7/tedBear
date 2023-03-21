package com.ssafy.tedbear.domain.member.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.tedbear.domain.sentence.dto.SentenceProblem;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;
import com.ssafy.tedbear.domain.word.dto.WordProblem;
import com.ssafy.tedbear.domain.word.entity.Word;

import lombok.Getter;

@Getter
public class ProblemList {
	List<SentenceProblem> sentenceMeanList;
	List<WordProblem> wordMeanList;

	public ProblemList(List<Sentence> sentenceList, List<Word> wordList) {
		this.sentenceMeanList = sentenceList.stream().map(SentenceProblem::new).collect(Collectors.toList());
		this.wordMeanList = wordList.stream().map(WordProblem::new).collect(Collectors.toList());
	}
}
