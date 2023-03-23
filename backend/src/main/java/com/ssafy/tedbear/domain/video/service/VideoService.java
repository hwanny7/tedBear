package com.ssafy.tedbear.domain.video.service;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.video.dto.VideoDetail;
import com.ssafy.tedbear.domain.video.dto.VideoInfo;
import com.ssafy.tedbear.domain.video.dto.VideoInfoList;
import com.ssafy.tedbear.domain.video.dto.WatchingVideoInfo;

public interface VideoService {

	VideoInfoList getRecommendList(Member member);

	VideoDetail getDetail(Member member, String watchId);

	VideoInfo getWatchingRecent(Member member);

	VideoInfoList getWatchingList(Member member, int page);

	VideoInfoList getCompleteList(Member member, int page);

	void saveWatchingRecord(Member member, WatchingVideoInfo request);

	void saveCompleteRecord(Member member, WatchingVideoInfo request);

}
