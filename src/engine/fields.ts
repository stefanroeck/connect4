export type Player = 'player1' | 'player2'
export type FieldState = Player | undefined;
export type Victory = {
    player: Player,
    fields: FieldState[],
} | undefined;
export type Fields = FieldState[][];

export const Players: Player[] = ['player1', 'player2'];

const charMap: Record<string, FieldState> = {
    '-': undefined,
    '1': 'player1',
    '2': 'player2',
};

export const stringToFields = (pattern: string): Fields => {
    const plainString = pattern.replaceAll(/[\n ]/g, '');
    const cols = pattern.split('\n')[1].trim().length;
    const rows = plainString.length / cols;
    //console.log(`cols ${cols} rows ${rows}`);
    //console.log(plainString);
    const fields: Fields = emptyArray(rows, cols);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const ch = plainString.charAt(idx);
            const f: FieldState = charMap[ch];
            //console.log(`idx ${idx} c ${ch} f ${f}`);
            fields[r][c] = f;
        }

    }
    //console.log(fields);
    return fields;
}

export const fieldsToString = (fields: Fields): string => {
    return fields.flatMap(c => c.map(r => fieldToChar(r)).join('')).join('\n');
}

export const emptyArray = (rows: number, cols: number): Fields => {
    return new Array(rows).fill(undefined).map(() => new Array(cols).fill(undefined));
}

export const fieldToChar = (r: FieldState): string => {
    return Object.entries(charMap).find(e => e[1] === r)[0];
}

