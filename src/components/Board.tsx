import { useCallback } from 'react';
import { useBoard } from '../hooks/useBoard';
import './board.css';
import { FieldComponent } from './FieldComponent';

export const Board = () => {
    const { board, play } = useBoard();
    const handleSelect = useCallback((col: number) => {
        play(col);
    }, [play]);

    return <div className='board-background'>
        {board.fields.map((row, rowIdx) => (
            <div className='board-row' key={rowIdx}>
                {row.map((f, colIdx) => (
                    <FieldComponent key={`${rowIdx}-${colIdx}`} field={f} onSelect={() => handleSelect(colIdx)} />
                ))}
            </div>

        ))}
    </div>
}