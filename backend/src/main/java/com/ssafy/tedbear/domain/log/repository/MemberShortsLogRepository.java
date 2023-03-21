package com.ssafy.tedbear.domain.log.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.log.entity.MemberShortsLog;

@Repository
public interface MemberShortsLogRepository extends JpaRepository<MemberShortsLog, Long> {
}
