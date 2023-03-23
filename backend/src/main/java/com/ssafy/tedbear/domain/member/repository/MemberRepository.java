package com.ssafy.tedbear.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.bookmark.entity.VideoBookmark;
import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.video.entity.Video;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByUid(String uid);
}
