import React from 'react';
import { useBoard } from "../hooks/useBoard"
import { doNothing } from '../utils';
import { FieldComponent } from './FieldComponent';
import './nextPlayer.css';

export const NextPlayer = () => {
    const { board } = useBoard();
    const status = board.victory === undefined ? board.nextPlayer + ', your turn!' : board.victory + ', you won!';

    return (<div className='nextPlayer-container'>
        <p className='appbar-text'>{status}</p>
        {board.victory === undefined &&
            <FieldComponent fieldState={board.nextPlayer} onSelect={doNothing} />
        }
    </div>

    );

}