package com.ssafy.tedbear.global.common.oauth2;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.member.entity.Member;
import com.ssafy.tedbear.domain.member.entity.MemberLevel;

@Repository
public interface MemberLevelRepository extends JpaRepository<MemberLevel, Long> {

}
