package com.ssafy.tedbear.global.common.oauth2;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.member.entity.MemberScore;

@Repository
public interface MemberScoreRepository extends JpaRepository<MemberScore, Long> {
}
