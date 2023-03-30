package com.ssafy.tedbear.domain.game.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;

@Getter
public class CrossWordDto {
	List<GridDto> array;
	List<ClueDto> clueList;
	List<List<Character>> answerBoard;
	int boardSize;

	public CrossWordDto(List<GridDto> board, List<ClueDto> clueList, char[][] answerBoard, int boardSize) {
		this.array = board;
		this.clueList = clueList;
		this.answerBoard = new ArrayList<>();
		for (int i = 0; i < boardSize; i++) {
			List<Character> row = new ArrayList<>();
			for (int j = 0; j < boardSize; j++) {
				row.add(answerBoard[i][j]);
			}
			this.answerBoard.add(row);
		}
		this.boardSize = boardSize;
	}
}
