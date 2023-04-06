package com.ssafy.tedbear.domain.game.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.tedbear.domain.game.entity.GameRecord;

@Repository
public interface GameRecordRepository extends JpaRepository<GameRecord, Long> {

}
