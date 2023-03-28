package com.ssafy.tedbear.domain.game.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;

@Getter
public class CrossWordDto {
	List<GridDto> board;
	List<ClueDto> clueList;
	int boardSize;

	public CrossWordDto(List<GridDto> board, List<ClueDto> clueList, int boardSize) {
		this.board = board;
		this.clueList = clueList;
		this.boardSize = boardSize;
	}

	public CrossWordDto(int[][] boardMatrix, List<ClueDto> clueList, int boardSize) {
		List<GridDto> board = new ArrayList<>();
		for (int i = 0; i < boardSize; i++) {
			for (int j = 0; j < boardSize; j++) {
				if (boardMatrix[i][j] < 0)
					board.add(new GridDto());
				else
					board.add(new GridDto(boardMatrix[i][j], true));
			}
		}
		this.board = board;
		this.clueList = clueList;
		this.boardSize = boardSize;
	}

}
