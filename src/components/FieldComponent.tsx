import React, { FunctionComponent } from 'react';
import { FieldState } from '../engine/fields';
import './field.css';

interface Props {
    fieldState: FieldState;
}

export const FieldComponent: FunctionComponent<Props> = ({ fieldState }) => {
    const className = 'field-inner ' + (fieldState !== undefined ? `field-${fieldState}` : "");
    return (
        <div className='cell'>
            <div className='field'>
                <div className={className} />
            </div>
        </div>
    );
}