package com.ssafy.tedbear.domain.video.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.model.BaseEntity;
import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "video_bookmark_tb")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VideoBookmark extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@ManyToOne
	@JoinColumn(name = "video_no")
	private Video video;

	@ManyToOne
	@JoinColumn(name = "member_no")
	private Member member;

}
