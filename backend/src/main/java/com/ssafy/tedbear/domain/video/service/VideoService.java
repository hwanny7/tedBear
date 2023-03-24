package com.ssafy.tedbear.domain.video.service;

import org.springframework.data.domain.Pageable;

import com.ssafy.tedbear.domain.video.dto.VideoDetailDto;
import com.ssafy.tedbear.domain.video.dto.VideoInfoDto;
import com.ssafy.tedbear.domain.video.dto.VideoInfoListDto;
import com.ssafy.tedbear.domain.video.dto.WatchingVideoInfoDto;

public interface VideoService {

	VideoInfoListDto getRecommendList(long memberNo);

	VideoDetailDto getDetail(long memberNo, String watchId);

	VideoInfoDto getWatchingRecent(long memberNo);

	VideoInfoListDto getWatchingList(long memberNo, Pageable pageable);

	VideoInfoListDto getCompleteList(long memberNo, Pageable pageable);

	VideoInfoListDto searchVideo(String query, Pageable pageable);

	void saveWatchingRecord(long memberNo, WatchingVideoInfoDto request);

	void saveCompleteRecord(long memberNo, WatchingVideoInfoDto request);

	VideoInfoListDto getVideoBookmarkList(long memberNo);

	void saveVideoBookmark(long memberNo, long videoNo);

	void deleteVideoBookmark(long memberNo, long videoNo);

}
