package com.ssafy.tedbear.domain.video.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.video.entity.Video;
import com.ssafy.tedbear.domain.video.entity.WatchingVideo;

@Repository
public interface WatchingVideoRepository extends JpaRepository<WatchingVideo, Long> {
	Optional<WatchingVideo> findTop1ByMemberAndVideoStatusOrderByUpdatedDateDesc(Member member, boolean videoStatus);

	Optional<WatchingVideo> findByMemberAndVideo(Member member, Video video);

	@Query("SELECT t FROM WatchingVideo t join fetch t.video where t.member = :member and t.videoStatus = true")
	List<WatchingVideo> getCompleteVideoList(Member member);

	@Query("SELECT t FROM WatchingVideo t join fetch t.video where t.member = :member and t.videoStatus = :videoStatus")
	Slice<WatchingVideo> findSliceByMemberAndVideoStatus(Pageable pageable, Member member, boolean videoStatus);
}
