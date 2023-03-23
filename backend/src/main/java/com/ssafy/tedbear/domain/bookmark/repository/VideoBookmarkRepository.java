package com.ssafy.tedbear.domain.bookmark.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.bookmark.entity.VideoBookmark;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.video.entity.VideoCategory;

@Repository
public interface VideoBookmarkRepository extends JpaRepository<VideoBookmark, Long> {
	Optional<VideoBookmark> findVideoBookmarksByMemberAndVideo(Member member, Video video);

	@Query("select v from VideoBookmark v  where v.video in :videoList and v.member = :member")
	List<VideoBookmark> findVideoBookmarksByMemberAndVideoIn(Member member, List<Video> videoList);
}
