import React, { FunctionComponent } from 'react';
import { FieldState, Player } from '../engine/fields';
import './field.css';

interface Props {
    fieldState: FieldState;
    onSelect: () => void;
    highlightForPlayer: Player | undefined;
}

export const FieldComponent: FunctionComponent<Props> = ({ fieldState, onSelect, highlightForPlayer }) => {
    let className = 'field-inner ' + (fieldState !== undefined ? `field-${fieldState}` : "field-none");
    if (highlightForPlayer !== undefined) {
        className += ` field-candidate-${highlightForPlayer}`;
    }

    return (
        <div className='cell'>
            <div className='field'>
                <div className={className} onClick={onSelect} />
            </div>
        </div>
    );
}