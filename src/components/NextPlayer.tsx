import React from 'react';
import { useBoard } from "../hooks/useBoard"
import { doNothing } from '../utils';
import { FieldComponent } from './FieldComponent';
import './nextPlayer.css';

export const NextPlayer = () => {
    const { board } = useBoard();

    return (<div className='nextPlayer-container'>
        {board.victory === undefined &&
            <FieldComponent fieldState={board.nextPlayer} onSelect={doNothing} />
        }
    </div>

    );

}