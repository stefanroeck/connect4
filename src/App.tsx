import { useState } from 'react';
import './App.css';
import { Appbar } from './components/Appbar';
import { Board } from './components/Board';
import { play } from './engine/board';
import { BoardContext, defaultBoard } from './hooks/useBoard';

export const App = () => {
  const [board, updateBoard] = useState(defaultBoard);
  const contextValue = {
    board,
    updateBoard,
    play: (col: number) => updateBoard(play(board, board.nextPlayer, col))
  }
  const [theme] = useState(Math.round(Math.random() * 100.0) % 2);
  return (
    <div className={`App App-theme${theme}`}>
      <BoardContext.Provider value={contextValue}>
        <Appbar />
        <Board />
      </BoardContext.Provider>
    </div>
  );
}
