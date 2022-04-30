import { Board, newBoard, play } from "../board";
import { stringToFields } from "../fields";

describe("connect 4", () => {

    it("should allow player 1 move", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = play(board, 'player1', 3);

        expect(board.fieldStates()).toEqual(stringToFields(`
        -------
        -------
        -------
        -------
        -------
        ---1---
        `));
        expect(board.victory).toBeUndefined();
        expect(board.options).toMatchObject({ cols: 7, rows: 6 });
        expect(board.nextPlayer).toEqual('player2');
    })

    it("should allow a couple of moves", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = play(board, 'player1', 3);
        board = play(board, 'player2', 4);
        board = play(board, 'player1', 3);
        board = play(board, 'player2', 4);

        expect(board.fieldStates()).toEqual(stringToFields(`
        -------
        -------
        -------
        -------
        ---12--
        ---12--
        `));
        expect(board.victory).toBeUndefined();
        expect(board.nextPlayer).toEqual('player1');
    })

    it("player1 wins horizontally", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = play(board, 'player1', 3);
        board = play(board, 'player2', 3);
        board = play(board, 'player1', 2);
        board = play(board, 'player2', 4);
        board = play(board, 'player1', 2);
        board = play(board, 'player2', 2);
        board = play(board, 'player1', 1);
        board = play(board, 'player2', 1);
        board = play(board, 'player1', 0);

        expect(board.fieldStates()).toEqual(stringToFields(`
        -------
        -------
        -------
        --2----
        -212---
        11112--
        `));
        expect(board.victory.player).toEqual('player1');
        expect(board.victory.fields.map(f => f.id)).toEqual(['5-0', '5-1', '5-2', '5-3']);
        expect(board.nextPlayer).toBeUndefined();
    })

    it("player1 wins vertically", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = playUntilPlayer1Wins(board);

        expect(board.fieldStates()).toEqual(stringToFields(`
        -------
        -------
        ---1---
        ---12--
        ---12--
        ---12--
        `));
        expect(board.victory.player).toEqual('player1');
        expect(board.victory.fields.map(f => f.id)).toEqual(['2-3', '3-3', '4-3', '5-3']);
        expect(board.nextPlayer).toBeUndefined();
    })


    it("player1 wins diagonally topLeft to bottomRight in left half", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = play(board, 'player1', 4);
        board = play(board, 'player2', 3);
        board = play(board, 'player1', 3);
        board = play(board, 'player2', 2);
        board = play(board, 'player1', 2);
        board = play(board, 'player2', 3);
        board = play(board, 'player1', 2);
        board = play(board, 'player2', 1);
        board = play(board, 'player1', 1);
        board = play(board, 'player2', 1);
        board = play(board, 'player1', 1);

        expect(board.fieldStates()).toEqual(stringToFields(`
        -------
        -------
        -1-----
        -212---
        -111---
        -2221--
        `));
        expect(board.victory.player).toEqual('player1');
        expect(board.victory.fields.map(f => f.id)).toEqual(['2-1', '3-2', '4-3', '5-4']);
        expect(board.nextPlayer).toBeUndefined();
    })


    it("player1 wins diagonally topLeft to bottomRight in right half", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = play(board, 'player1', 6);
        board = play(board, 'player2', 5);
        board = play(board, 'player1', 5);
        board = play(board, 'player2', 4);
        board = play(board, 'player1', 4);
        board = play(board, 'player2', 5);
        board = play(board, 'player1', 4);
        board = play(board, 'player2', 3);
        board = play(board, 'player1', 3);
        board = play(board, 'player2', 3);
        board = play(board, 'player1', 3);

        expect(board.fieldStates()).toEqual(stringToFields(`
        -------
        -------
        ---1---
        ---212-
        ---111-
        ---2221
        `));
        expect(board.victory.player).toEqual('player1');
        expect(board.nextPlayer).toBeUndefined();
    })

    it("player2 wins diagonally topRight to bottomLeft in right half", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = play(board, 'player1', 3);
        board = play(board, 'player2', 2);
        board = play(board, 'player1', 2);
        board = play(board, 'player2', 3);
        board = play(board, 'player1', 4);
        board = play(board, 'player2', 5);
        board = play(board, 'player1', 4);
        board = play(board, 'player2', 4);
        board = play(board, 'player1', 5);
        board = play(board, 'player2', 5);
        board = play(board, 'player1', 6);
        board = play(board, 'player2', 5);

        expect(board.fieldStates()).toEqual(stringToFields(`
        -------
        -------
        -----2-
        ----22-
        --1211-
        --21121
        `));
        expect(board.victory.player).toEqual('player2');
        expect(board.nextPlayer).toBeUndefined();
    })

    it("player2 wins diagonally topRight to bottomLeft in left half", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = play(board, 'player1', 1);
        board = play(board, 'player2', 0);
        board = play(board, 'player1', 0);
        board = play(board, 'player2', 1);
        board = play(board, 'player1', 2);
        board = play(board, 'player2', 3);
        board = play(board, 'player1', 2);
        board = play(board, 'player2', 2);
        board = play(board, 'player1', 3);
        board = play(board, 'player2', 3);
        board = play(board, 'player1', 4);
        board = play(board, 'player2', 3);

        expect(board.fieldStates()).toEqual(stringToFields(`
        -------
        -------
        ---2---
        --22---
        1211---
        21121--
        `));
        expect(board.victory.player).toEqual('player2');
        expect(board.nextPlayer).toBeUndefined();
    })

    it("don't execute more turns after victory", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = playUntilPlayer1Wins(board);

        expect(play(board, 'player2', 4)).toEqual(board);
        expect(board.victory.player).toEqual('player1');
    })

    const playUntilPlayer1Wins = (initialBoard: Board): Board => {
        let board = initialBoard;
        board = play(board, 'player1', 3);
        board = play(board, 'player2', 4);
        board = play(board, 'player1', 3);
        board = play(board, 'player2', 4);
        board = play(board, 'player1', 3);
        board = play(board, 'player2', 4);
        board = play(board, 'player1', 3);
        return board;
    }


})