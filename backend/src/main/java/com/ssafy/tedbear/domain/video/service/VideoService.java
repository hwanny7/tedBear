package com.ssafy.tedbear.domain.video.service;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.video.dto.VideoDto;

public interface VideoService {

	VideoDto.InfoListResponse getRecommendList(Member member);
}
