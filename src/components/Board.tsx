import React from 'react';
import { useBoard } from '../hooks/useBoard';
import './board.css';
import { FieldComponent } from './FieldComponent';
import { RowSelector } from './RowSelector';

export const Board = () => {
    const { board } = useBoard();

    return <div className='board-background'>
        <RowSelector />
        {board.fields.map((row, rowIdx) => (
            <div className='board-row' key={rowIdx}>
                {row.map((f, colIdx) => (
                    <FieldComponent key={`${rowIdx}-${colIdx}`} fieldState={f} />
                ))}
            </div>

        ))}
    </div>
}