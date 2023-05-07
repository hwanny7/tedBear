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

	@Query(value = "select v from Video v where " +
		"v.score between :s1 and :e1 or " +
		"v.score between :s2 and :e2 or " +
		"v.score between :s3 and :e3")
	List<Video> findByScoreBetween(int s1, int e1, int s2, int e2, int s3, int e3);

	@Query("select v from Video v where v.title like %:query%")
	Slice<Video> findSliceByTitle(String query, Pageable pageable);
}
