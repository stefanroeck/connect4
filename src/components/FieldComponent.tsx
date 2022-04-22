import React, { FunctionComponent } from 'react';
import { FieldState } from '../engine/fields';
import './field.css';

interface Props {
    fieldState: FieldState;
    onSelect: () => void;
}

export const FieldComponent: FunctionComponent<Props> = ({ fieldState, onSelect }) => {
    const className = 'field-inner ' + (fieldState !== undefined ? `field-${fieldState}` : "");
    return (
        <div className='cell'>
            <div className='field'>
                <div className={className} onClick={onSelect} />
            </div>
        </div>
    );
}