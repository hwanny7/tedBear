package com.ssafy.tedbear.domain.video.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.video.entity.Video;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
	Video findByWatchId(String watchId);

	List<Video> findByScoreBetween(int startScore, int endScore);

	@Query("select v from Video v where v.title like %:query%")
	Slice<Video> findSliceByTitle(String query, Pageable pageable);
}
