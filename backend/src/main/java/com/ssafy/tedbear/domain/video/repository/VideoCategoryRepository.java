package com.ssafy.tedbear.domain.video.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.video.entity.VideoCategory;

@Repository
public interface VideoCategoryRepository extends JpaRepository<VideoCategory, Long> {

}
