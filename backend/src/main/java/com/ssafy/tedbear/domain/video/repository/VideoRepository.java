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

	@Query("select v from Video v where v.score between :startScore1 and :endScore1 or v.score between :startScore2 and :endScore2 or v.score between :startScore3 and :endScore3")
	List<Video> findByScoreBetween(int startScore1, int endScore1, int startScore2, int endScore2, int startScore3,
		int endScore3);

	@Query("select v from Video v where v.title like %:query%")
	Slice<Video> findSliceByTitle(String query, Pageable pageable);
}
