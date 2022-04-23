import React, { FunctionComponent } from 'react';
import { FieldState } from '../engine/fields';
import { doNothing } from '../utils';
import './field.css';

interface Props {
    fieldState: FieldState;
    onSelect: () => void;
}

export const FieldComponent: FunctionComponent<Props> = ({ fieldState, onSelect }) => {
    const className = 'field-inner ' + (fieldState !== undefined ? `field-${fieldState}` : "field-none");
    const canSelect = fieldState === undefined;

    return (
        <>
            <div className='cell' >
                <div className='field' >
                    <div className={className} onClick={canSelect ? onSelect : doNothing} />
                </div>
            </div>
        </>
    );
}