import React from 'react';
import { Field } from '../engine/fields';
import { useBoard } from "../hooks/useBoard"
import { doNothing } from '../utils';
import { FieldComponent } from './FieldComponent';
import './nextPlayer.css';

export const NextPlayer = () => {
    const { board } = useBoard();
    const field: Field = {
        id: 'nextPlayer',
        state: board.nextPlayer
    }
    return (<div className='nextPlayer-container'>
        {board.victory === undefined &&
            <FieldComponent field={field} onSelect={doNothing} />
        }
    </div>

    );

}