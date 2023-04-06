package com.ssafy.tedbear.domain.member.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ssafy.tedbear.domain.model.BaseEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Table(name = "member_score_tb")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class MemberScore extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	private Integer score;

	void initScore(int defaultScore, int testResult) {
		this.score = defaultScore + testResult;
	}

	public void updateScore(int diffScore) {
		this.score += diffScore;
	}
}