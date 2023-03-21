package com.ssafy.tedbear.domain.bookmark.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.model.BaseEntity;
import com.ssafy.tedbear.domain.sentence.entity.Sentence;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "sentence_bookmark_tb")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SentenceBookmark extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@ManyToOne
	@JoinColumn(name = "sentence_no")
	private Sentence sentence;

	@ManyToOne
	@JoinColumn(name = "member_no")
	private Member member;

}
