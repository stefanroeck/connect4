import { FunctionComponent } from 'react';
import { Field } from '../engine/fields';
import { doNothing } from '../utils';
import './field.css';

interface Props {
    field: Field;
    onSelect: () => void;
}

export const FieldComponent: FunctionComponent<Props> = ({ field, onSelect }) => {
    const className = 'field-inner ' + (field.state !== undefined ? `field-${field.state}` : "field-none");
    const canSelect = field.state === undefined;

    return (
        <>
            <div className='cell' >
                <div className='field' >
                    <div className={className} key={field.id} onClick={canSelect ? onSelect : doNothing} />
                </div>
            </div>
        </>
    );
}