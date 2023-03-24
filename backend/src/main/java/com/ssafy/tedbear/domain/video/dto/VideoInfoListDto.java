package com.ssafy.tedbear.domain.video.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.video.entity.VideoBookmark;

import lombok.Getter;

@Getter
public class VideoInfoListDto {
	List<VideoInfoDto> videoInfoList;

	public VideoInfoListDto(List<Video> videoList) {
		this.videoInfoList = videoList.stream().map(VideoInfoDto::new).collect(Collectors.toList());
	}

}
