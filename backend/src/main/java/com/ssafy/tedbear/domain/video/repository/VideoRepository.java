package com.ssafy.tedbear.domain.video.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.word.entity.Word;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
	Video findByWatchId(String watchId);

}
