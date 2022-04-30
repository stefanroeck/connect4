import { Victory } from "../engine/fields";

export interface Events {
    startGame: () => void,
    finishGame: (victor: Victory) => void,
}

export const NoopEvents: Events = {
    startGame: () => { },
    finishGame: () => { },
}