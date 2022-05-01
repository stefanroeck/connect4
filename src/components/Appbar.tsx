import './appbar.css';
import { NextPlayer } from './NextPlayer';

export const Appbar = () => {
    return (<>
        <div className='appbar-container'>
            <div>
                <h1 className='appbar-text'>Frieda's Connect 4</h1>
                <p className='appbar-hint'>Select a row the play a stone.</p>
                <NextPlayer />
            </div>
        </div>
    </>

    );
}