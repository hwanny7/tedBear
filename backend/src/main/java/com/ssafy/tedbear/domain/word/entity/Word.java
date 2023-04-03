package com.ssafy.tedbear.domain.word.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "word_tb")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Word {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@NotNull
	@Column(unique = true)
	private String content;

	@Column(columnDefinition = "TEXT")
	private String mean;

	private int score;

	@OneToMany(mappedBy = "word",cascade = CascadeType.REMOVE)
	private List<WordSentence> wordSentenceList = new ArrayList<>();

	@Override
	public String toString() {
		return "Word{" +
			"no=" + no +
			", content='" + content + '\'' +
			", mean='" + mean + '\'' +
			", score=" + score +
			'}';
	}
}
