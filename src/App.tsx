import mixpanel from 'mixpanel-browser';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Appbar } from './components/Appbar';
import { Board } from './components/Board';
import { play } from './engine/board';
import { BoardContext, defaultBoard } from './hooks/useBoard';

export const App = () => {
  useEffect(() => {
    mixpanel.init('abca18936b0e1222e3fb9ca503319cd7', { debug: true, ignore_dnt: false });
    mixpanel.track('Open Page');
  }, []);

  const [board, updateBoard] = useState(defaultBoard);
  const contextValue = {
    board,
    updateBoard,
    play: (col: number) => updateBoard(play(board, board.nextPlayer, col))
  }
  return (
    <div className="App">
      <BoardContext.Provider value={contextValue}>
        <Appbar />
        <Board />
      </BoardContext.Provider>
    </div>
  );
}
