package com.ssafy.tedbear.domain.video.service;

import org.springframework.data.domain.Pageable;

import com.ssafy.tedbear.domain.video.dto.VideoDetailDto;
import com.ssafy.tedbear.domain.video.dto.VideoInfoDto;
import com.ssafy.tedbear.domain.video.dto.VideoInfoListDto;
import com.ssafy.tedbear.domain.video.dto.WatchingVideoInfoDto;

public interface VideoService {

	VideoInfoListDto getRecommendList(String memberUid, int delta);

	VideoDetailDto getDetail(String memberUid, String watchId);

	VideoInfoDto getWatchingRecent(String memberUid);

	VideoInfoListDto getWatchingList(String memberUid, Pageable pageable);

	VideoInfoListDto getCompleteList(String memberUid, Pageable pageable);

	VideoInfoListDto searchVideo(String memberUid,String query, Pageable pageable);

	void saveWatchingRecord(String memberUid, WatchingVideoInfoDto request);

	void saveCompleteRecord(String memberUid, WatchingVideoInfoDto request);

	VideoInfoListDto getVideoBookmarkList(String memberUid);

	void saveVideoBookmark(String memberUid, long videoNo);

	void deleteVideoBookmark(String memberUid, long videoNo);

}
