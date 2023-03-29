package com.ssafy.tedbear.domain.game.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GridDto {
	int clueIdx;
	boolean box;

	public GridDto(int clueIdx, boolean box) {
		this.clueIdx = clueIdx;
		this.box = box;
	}

	public GridDto() {
		this(0, false);
	}
}
