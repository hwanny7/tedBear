package com.ssafy.tedbear.domain.video.service;

import org.springframework.data.domain.Pageable;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.video.dto.VideoDetail;
import com.ssafy.tedbear.domain.video.dto.VideoInfo;
import com.ssafy.tedbear.domain.video.dto.VideoInfoList;
import com.ssafy.tedbear.domain.video.dto.WatchingVideoInfo;

public interface VideoService {

	VideoInfoList getRecommendList(long memberNo);

	VideoDetail getDetail(long memberNo, String watchId);

	VideoInfo getWatchingRecent(long memberNo);

	VideoInfoList getWatchingList(long memberNo, Pageable pageable);

	VideoInfoList getCompleteList(long memberNo, Pageable pageable);

	VideoInfoList searchVideo(String query, Pageable pageable);

	void saveWatchingRecord(long memberNo, WatchingVideoInfo request);

	void saveCompleteRecord(long memberNo, WatchingVideoInfo request);

	VideoInfoList getVideoBookmarkList(long memberNo);

	void saveVideoBookmark(long memberNo, long videoNo);

	void deleteVideoBookmark(long memberNo, long videoNo);

}
