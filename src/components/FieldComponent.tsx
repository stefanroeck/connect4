import React, { FunctionComponent } from 'react';
import { FieldState } from '../engine/fields';
import './field.css';

interface Props {
    fieldState: FieldState;
}

export const FieldComponent: FunctionComponent<Props> = ({ fieldState }) => {
    return (
        <div className='cell'>
            <div className='field'>
                <div className='field-inner'>
                    {fieldState === 'player1' ? 'p1' : fieldState === 'player2' ? 'p2' : '-'}
                </div>
            </div>
        </div>
    );
}