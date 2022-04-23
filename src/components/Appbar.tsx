import React from 'react';
import { useBoard } from '../hooks/useBoard';
import './appbar.css';
import { NextPlayer } from './NextPlayer';

export const Appbar = () => {
    const { board } = useBoard();
    const status = board.victory === undefined ? board.nextPlayer + ', your turn!' : board.victory + ', you won!';
    return (<>
        <div className='appbar-container'>
            <div>
                <h1 className='appbar-text'>Frieda's Connect 4</h1>
                <p className='appbar-hint'>Select a row the play a stone.</p>
                <p className='appbar-hint'>{status}</p>
            </div>
            <NextPlayer />
        </div>
    </>

    );
}