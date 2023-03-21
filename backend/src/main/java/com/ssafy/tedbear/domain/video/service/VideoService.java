package com.ssafy.tedbear.domain.video.service;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.video.dto.VideoDetail;
import com.ssafy.tedbear.domain.video.dto.VideoInfoList;

public interface VideoService {

	VideoInfoList getRecommendList(Member member);

	VideoDetail getDetail(Member member, String watchId);
}
