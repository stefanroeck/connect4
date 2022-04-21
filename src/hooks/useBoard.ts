import React, { useContext } from "react";
import { Board, newBoard } from "../engine/board"

export const defaultBoard = () => newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });
export const BoardContext = React.createContext<{ board: Board, updateBoard: (board: Board) => void }>({
    board: defaultBoard(),
    updateBoard: () => { }
});

export const useBoard = () => {
    return useContext(BoardContext);
}