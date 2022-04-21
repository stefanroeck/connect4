import { emptyArray, Fields, Player, Players, Victory } from "./fields";

export type Options = {
    cols: number;
    rows: number;
    startPlayer?: Player;
}

export type Board = {
    options: Options;
    fields: Fields; // cols, rows
    victory: Victory;
    nextPlayer: Player;
}

export const newBoard = ({ rows, cols, startPlayer }: Options): Board => {
    return existingBoard(emptyArray(rows, cols), startPlayer);
}

export const existingBoard = (fields: Fields, startPlayer: Player): Board => {
    return {
        options: {
            cols: fields[0].length,
            rows: fields.length
        },
        fields,
        victory: checkVictory(fields),
        nextPlayer: startPlayer,
    }
}

export const play = (board: Board, player: Player, col: number): Board => {
    if (board.victory) {
        return board;
    }

    const fullCol = board.fields.flatMap(row => row[col]);
    const freeRow = fullCol.lastIndexOf(undefined);
    if (freeRow === -1) {
        return board;
    }

    const newFields = board.fields.slice();
    newFields[freeRow][col] = player;

    return {
        options: board.options,
        fields: newFields,
        victory: checkVictory(board.fields),
        nextPlayer: Players[(Players.indexOf(player) + 1) % Players.length]
    };
};

const checkVictory = (fields: Fields): Victory => {
    let victory = undefined;
    ['player1', 'player2'].forEach(player => {
        const fourInARow: boolean = fields.some(r => r.join('').includes(player.repeat(4)));
        if (fourInARow) {
            victory = player;
        } else {
            const cols = fields[0].length;
            for (let c = 0; c < cols; c++) {
                const fourInACol: boolean =
                    fields.map(r => r[c]).join('').includes(player.repeat(4));
                if (fourInACol) {
                    victory = player;
                }
            }

        }

    });
    return victory;
}
