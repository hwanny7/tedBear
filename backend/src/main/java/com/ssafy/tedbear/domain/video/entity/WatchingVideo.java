package com.ssafy.tedbear.domain.video.entity;

import java.time.LocalDateTime;

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

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "watching_video_tb")
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WatchingVideo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@NotNull
	@Column(name = "video_progress_time")
	private int videoProgressTime;

	@NotNull
	@Column(name = "video_status")
	private boolean videoStatus;

	@NotNull
	@Column(name = "updated_date")
	private LocalDateTime updatedDate;

	@ManyToOne
	@JoinColumn(name = "video_no")
	private Video video;

	@ManyToOne
	@JoinColumn(name = "member_no")
	private Member member;

	public WatchingVideo setUpdatedDateNow() {
		this.updatedDate = LocalDateTime.now();
		return this;
	}

	public WatchingVideo setVideoProgressTime (int videoProgressTime) {
		this.videoProgressTime = videoProgressTime;
		return this;
	}

	public WatchingVideo setVideoStatus(boolean videoStatus) {
		this.videoStatus = videoStatus;
		return this;
	}

	@Override
	public String toString() {
		return "WatchingVideo{" +
			"no=" + no +
			", videoProgressTime=" + videoProgressTime +
			", videoStatus=" + videoStatus +
			", updatedDate=" + updatedDate +
			", video=" + video.getTitle() +
			", member=" + member.getNickname() +
			'}';
	}
}
