import React, { useCallback } from 'react';
import { useBoard } from '../hooks/useBoard';
import './board.css';
import { FieldComponent } from './FieldComponent';
import { RowSelector } from './RowSelector';

export const Board = () => {
    const { board, play } = useBoard();
    const handleSelect = useCallback((col: number) => {
        console.log('onSelect');
        play(col);
    }, [play]);

    return <div className='board-background'>
        <RowSelector />
        {board.fields.map((row, rowIdx) => (
            <div className='board-row' key={rowIdx}>
                {row.map((f, colIdx) => (
                    <FieldComponent key={`${rowIdx}-${colIdx}`} fieldState={f} onSelect={() => handleSelect(colIdx)} />
                ))}
            </div>

        ))}
    </div>
}