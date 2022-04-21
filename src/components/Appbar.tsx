import React from 'react';
import { useBoard } from '../hooks/useBoard';
import './appbar.css';

export const Appbar = () => {
    const { board } = useBoard();
    const status = board.victory === undefined ? board.nextPlayer + ', your turn!' : board.victory + ', you won!';
    return (<>
        <h1 className='appbar-text'>Frieda's Connect 4</h1>
        <h3 className='appbar-text' style={board.victory ? { color: 'crimson' } : {}}>{status}</h3>
        <p className='appbar-hint'>Use arrow keys to select column and hit SPACE to set stone.</p>
    </>

    );
}