package com.ssafy.tedbear.domain.game.dto;

public class GridDto {
	int clueIdx;
	boolean box;

	GridDto(int clueIdx, boolean box) {
		this.clueIdx = clueIdx;
		this.box = box;
	}

	GridDto() {
		this(0, false);
	}
}
