import React, { useContext } from "react";
import { Board, newBoard } from "../engine/board"
import { mixPanelEvents } from "../events/mixPanelEvents";

export const defaultBoard = () => newBoard({ rows: 6, cols: 7, startPlayer: 'player1', events: mixPanelEvents });
export const BoardContext = React.createContext<{ board: Board, updateBoard: (board: Board) => void, play: (col: number) => void }>({
    board: defaultBoard(),
    updateBoard: () => { },
    play: () => { }
});

export const useBoard = () => {
    return useContext(BoardContext);
}