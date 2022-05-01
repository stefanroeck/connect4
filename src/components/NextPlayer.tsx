import { Field } from '../engine/fields';
import { useBoard } from "../hooks/useBoard"
import { doNothing } from '../utils';
import { FieldComponent } from './FieldComponent';
import './nextPlayer.css';

export const NextPlayer = () => {
    const { board } = useBoard();
    const player = board.victory === undefined ? board.nextPlayer : board.victory.player;
    const status = board.victory === undefined ? 'your turn!' : 'you won!';
    const field: Field = {
        id: 'nextPlayer',
        state: player,
        row: -1,
        col: -1,
    }
    return (<div className='nextPlayer-container'>
        {<>
            <div className='nextPlayer-field'>
                <FieldComponent field={field} onSelect={doNothing} highlight={false} />
            </div>
            <p className='nextPlayer-text'>{player}, {status}</p>
        </>
        }
    </div>

    );

}