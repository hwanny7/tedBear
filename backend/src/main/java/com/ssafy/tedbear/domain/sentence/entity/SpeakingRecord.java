package com.ssafy.tedbear.domain.sentence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.model.BaseEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@Table(name = "speaking_record_tb")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SpeakingRecord extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@NotNull
	@Column(name = "match_status")
	private boolean matchStatus;

	@ManyToOne
	@JoinColumn(name = "sentence_no")
	private Sentence sentence;

	@ManyToOne
	@JoinColumn(name = "member_no")
	private Member member;

	@Override
	public String toString() {
		return "SpeakingRecord{" +
			"no=" + no +
			", matchStatus=" + matchStatus +
			", sentence=" + sentence.getContent() +
			", member=" + member.getNickname() +
			'}';
	}
}
