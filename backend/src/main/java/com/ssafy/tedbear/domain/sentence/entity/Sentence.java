package com.ssafy.tedbear.domain.sentence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "sentence_tb")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Sentence {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@NotNull
	private int score;

	@NotNull
	@Column(columnDefinition = "TEXT")
	private String content;

	@Column(columnDefinition = "TEXT")
	private String translation;

	@NotNull
	@Column(name = "start_time")
	private int startTime;

	@NotNull
	@Column(name = "end_time")
	private int endTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "video_no")
	private Video video;

	@Column(name = "gunning_fog")
	private Double gunningFog;

	@Column(name = "flesch_reading_ease")
	private Double fleschReadingEase;

	@Column(name = "flesch_kincaid_grade_level")
	private Double fleshKincaidGradeLevel;

	@Transient
	private boolean isBookmarked;

	//========//
	public void setScores(double gf, double fr, double fk, int score) {
		this.gunningFog = gf;
		this.fleschReadingEase = fr;
		this.fleshKincaidGradeLevel = fk;
		this.score = score;
	}

	public void setBookmarked(boolean isBookmarked) {
		this.isBookmarked = isBookmarked;
	}
}
