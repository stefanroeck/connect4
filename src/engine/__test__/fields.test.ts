import { fieldsToString, stringToFields } from "../fields"

describe("Fields", () => {
    it("should convert empty 2x2", () => {
        expect(stringToFields(`
        --
        --
        `)).toEqual([[undefined, undefined], [undefined, undefined]]);
    })

    it("should convert non-empty 2x2", () => {
        expect(stringToFields(`
        2-
        12
        `)).toEqual([['player2', undefined], ['player1', 'player2']]);
    })

    it("should convert non-empty 3x3", () => {
        expect(stringToFields(`
        2--
        122
        211
        `)).toEqual([['player2', undefined, undefined], ['player1', 'player2', 'player2'], ['player2', 'player1', 'player1']]);
    })

    it("should convert non-empty 3x2", () => {
        expect(stringToFields(`
        2-1
        211
        `)).toEqual([['player2', undefined, 'player1'], ['player2', 'player1', 'player1']]);
    })

    it("generate string 3x2", () => {
        expect(fieldsToString([['player2', 'player2', undefined], ['player1', 'player1', 'player1']])).toEqual('22-\n111')
    })

    it("should be reflexive", () => {
        expect(fieldsToString(stringToFields(`
        ---
        222
        111
        `.replaceAll(/ /g, ''))))
            .toEqual(`---
        222
        111`.replaceAll(/ /g, ''));
    })
})