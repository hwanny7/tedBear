package com.ssafy.tedbear.domain.video.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.ssafy.tedbear.domain.sentence.entity.Sentence;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Table(name = "video_tb")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Video {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@Column(unique = true)
	@NotNull
	private String watchId;

	@NotNull
	private int score;

	@NotNull
	private String title;

	@NotNull
	@Column(name = "video_url")
	private String videoUrl;

	@NotNull
	@Column(name = "thumbnail_url")
	private String thumbnailUrl;

	@NotNull
	@Column(name = "published_date")
	private LocalDateTime publishedDate;

	@OneToMany(mappedBy = "video")
	private List<Sentence> sentenceList = new ArrayList<>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_no")
	private VideoCategory videoCategory;

	@Transient
	private boolean isBookmarked;

	public void setScore(int score) {
		this.score = score;
	}

	public void setBookmarked(boolean isBookmarked) {
		this.isBookmarked = isBookmarked;
	}

	public Video updateBookmarked(boolean isBookmarked) {
		this.isBookmarked = isBookmarked;
		return this;
	}
}
