export type Player = 'player1' | 'player2'
export type FieldState = Player | undefined;
export type Field = {
    state: FieldState,
    id: string,
}
export type Victory = {
    player: Player,
    fields: Field[],
} | undefined;
export type Fields = Field[][];

export const Players: Player[] = ['player1', 'player2'];

const charMap: Record<string, FieldState> = {
    '-': undefined,
    '1': 'player1',
    '2': 'player2',
};

export const stringToFields = (pattern: string): FieldState[][] => {
    const plainString = pattern.replaceAll(/[\n ]/g, '');
    const cols = pattern.split('\n')[1].trim().length;
    const rows = plainString.length / cols;
    //console.log(`cols ${cols} rows ${rows}`);
    //console.log(plainString);
    const fields: FieldState[][] = emptyArray(rows, cols);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const ch = plainString.charAt(idx);
            const state: FieldState = charMap[ch];
            //console.log(`idx ${idx} c ${ch} f ${f}`);
            fields[r][c] = state;
        }

    }
    //console.log(fields);
    return fields;
}

export const fieldsToString = (fields: FieldState[][]): string => {
    return fields.flatMap(c => c.map(r => fieldToChar(r)).join('')).join('\n');
}

export const emptyArray = <T>(rows: number, cols: number, value: (r: number, c: number) => T = () => undefined): Array<Array<T>> => {
    const array = new Array(rows).fill(undefined).map(() => new Array(cols).fill(undefined));
    array.forEach((row, rowIdx) => row.forEach((_, colIdx) => {
        array[rowIdx][colIdx] = value(rowIdx, colIdx);
    }));
    return array;
}

export const emptyFieldArray = (rows: number, cols: number): Fields => {
    return emptyArray<Field>(rows, cols, (r, c) => { return { id: `${r}-${c}`, state: undefined } });
}

export const fieldToChar = (r: FieldState): string => {
    return Object.entries(charMap).find(e => e[1] === r)[0];
}

