import React, { useEffect, useState } from 'react';
import { useBoard } from '../hooks/useBoard';
import './rowSelector.css';

export const RowSelector = () => {
    const { board, play } = useBoard();
    const { options: { cols } } = board;
    const [position, setPosition] = useState(Math.floor(cols / 2));
    const singleRowWidth = window.innerWidth / 10;
    const selectorOffsetToCenter = singleRowWidth * 0.72;
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                setPosition((oldPosition) => Math.min(oldPosition + 1, cols - 1))
            } else if (e.key === 'ArrowLeft') {
                setPosition((oldPosition) => Math.max(oldPosition - 1, 0))
            } else if (e.key === ' ') {
                play(position);
                e.preventDefault();
            }
            console.log(e);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [cols, play, position]);

    return <div className='row-selector-container' style={{ marginLeft: `calc(${(position + 1) * 10}% + ${selectorOffsetToCenter}px)` }}>
        <img className='row-selector-img' alt='Select Row' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" />
    </div>;
}