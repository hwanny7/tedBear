package com.ssafy.tedbear.domain.member.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.ssafy.tedbear.domain.bookmark.entity.SentenceBookmark;
import com.ssafy.tedbear.domain.bookmark.entity.VideoBookmark;
import com.ssafy.tedbear.domain.bookmark.entity.WordBookmark;
import com.ssafy.tedbear.domain.game.entity.GameRecord;
import com.ssafy.tedbear.domain.model.BaseEntity;
import com.ssafy.tedbear.domain.model.SnsType;
import com.ssafy.tedbear.domain.sentence.entity.SpeakingRecord;
import com.ssafy.tedbear.domain.video.entity.WatchingVideo;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "member_tb")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@NotNull
	private String uid;

	@NotNull
	private String nickname;

	@NotNull
	@Column(name = "sns_type")
	@Enumerated(EnumType.STRING)
	private SnsType snsType;

	@OneToMany(mappedBy = "member")
	private List<WatchingVideo> watchingVideoList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<VideoBookmark> videoBookmarkList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<SentenceBookmark> sentenceBookmarkList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<SpeakingRecord> speakingRecordList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<GameRecord> gameRecordList = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<WordBookmark> wordBookmarkList = new ArrayList<>();

	@OneToOne
	@JoinColumn(name = "score_no")
	private MemberScore memberScore;

	@OneToOne
	@JoinColumn(name = "member_no")
	private MemberLevel memberLevel;

	//--//
	public int getScore() {
		return memberScore.getScore();
	}
}
