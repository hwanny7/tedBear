package com.ssafy.tedbear.domain.game.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GridDto {
	int clue;
	boolean box;

	public GridDto(int clueIdx, boolean box) {
		this.clue = clueIdx;
		this.box = box;
	}

	public GridDto() {
		this(0, false);
	}
}
