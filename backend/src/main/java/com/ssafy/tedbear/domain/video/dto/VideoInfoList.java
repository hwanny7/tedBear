package com.ssafy.tedbear.domain.video.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.tedbear.domain.video.entity.Video;

import lombok.Getter;

@Getter
public class VideoInfoList {
	List<VideoInfo> videoInfoList;

	public VideoInfoList(List<Video> videoList) {
		this.videoInfoList = videoList.stream().map(VideoInfo::new).collect(Collectors.toList());
	}
}
