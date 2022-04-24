import { ifNotDefined } from "../utils";
import { emptyArray, Fields, FieldState, Player, Players, Victory } from "./fields";

export type Options = {
    cols: number;
    rows: number;
    startPlayer?: Player;
}

export type Board = {
    options: Options;
    fields: Fields;
    victory: Victory;
    nextPlayer: Player | undefined;
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

    const victory = checkVictory(board.fields);

    return {
        options: board.options,
        fields: newFields,
        victory,
        nextPlayer: ifNotDefined(victory, () => Players[(Players.indexOf(player) + 1) % Players.length]),
    };
};

const dimensions = (fields: Fields): { rows: number, cols: number } => {
    return {
        rows: fields.length,
        cols: fields[0].length,
    }
}

const checkVictory = (fields: Fields): Victory => {
    let victory = undefined;
    ['player1', 'player2'].forEach(player => {
        const { cols, rows, diagonalsTopLeftBottomRight, diagonalsTopRightBottomLeft } = victoryConditions(fields);

        [cols, rows, diagonalsTopLeftBottomRight, diagonalsTopRightBottomLeft].forEach(conditions => {
            const fourConsecutiveFields: boolean = conditions.some(r => r.join('').includes(player.repeat(4)));
            if (fourConsecutiveFields) {
                victory = player;
            }
        });
    });
    return victory;
}

const victoryConditions = (fields: Fields) => {
    return {
        rows: fields,
        cols: getColumns(fields),
        diagonalsTopLeftBottomRight: getDiagonalsTopLeftBottomRight(fields),
        diagonalsTopRightBottomLeft: getDiagonalsTopRightBottomLeft(fields),
    }
}

const getColumns = (fields: Fields): FieldState[][] => {
    const { cols, rows } = dimensions(fields);
    const result = emptyArray(cols, rows);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            result[c][r] = fields[r][c];
        }
    }
    return result;
}

const getDiagonalsTopLeftBottomRight = (fields: Fields): FieldState[][] => {
    const { cols, rows } = dimensions(fields);
    const result = [];

    // walk up y-axis starting at bottom left and the go right along x-axis
    for (let r = rows - 1; r >= 0; r--) {
        const diagonal = [];
        for (let c = 0; c + r < rows && c < cols; c++) {
            diagonal.push(fields[r + c][c]);
        }
        result.push(diagonal);
    }
    for (let c = 1; c < cols - 1; c++) {
        const diagonal = [];
        for (let r = 0; c + r < cols && r < rows; r++) {
            diagonal.push(fields[r][c + r]);
        }
        result.push(diagonal);
    }
    return result;
}

const getDiagonalsTopRightBottomLeft = (fields: Fields): FieldState[][] => {
    const { cols, rows } = dimensions(fields);
    const result = [];

    // walk up y-axis starting at bottom right and the left right along x-axis
    for (let r = rows - 1; r >= 0; r--) {
        const diagonal = [];
        for (let c = cols - 1; r + cols - c - 1 < rows && c >= 0; c--) {
            diagonal.push(fields[r + cols - c - 1][c]);
        }
        result.push(diagonal);
    }
    for (let c = cols - 2; c >= 0; c--) {
        const diagonal = [];
        for (let r = 0; c - r >= 0 && r < rows; r++) {
            diagonal.push(fields[r][c - r]);
        }
        result.push(diagonal);
    }
    return result;
}
