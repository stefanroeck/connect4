import { Board, newBoard, play } from "../board";
import { stringToFields } from "../fields";

describe("connect 4", () => {

    it("should allow player 1 move", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = play(board, 'player1', 3);

        expect(board.fields).toEqual(stringToFields(`
        -------
        -------
        -------
        -------
        -------
        ---1---
        `));
        expect(board.victory).toBeUndefined();
        expect(board.options).toEqual({ cols: 7, rows: 6 });
        expect(board.nextPlayer).toEqual('player2');
    })

    it("should allow a couple of moves", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = play(board, 'player1', 3);
        board = play(board, 'player2', 4);
        board = play(board, 'player1', 3);
        board = play(board, 'player2', 4);

        expect(board.fields).toEqual(stringToFields(`
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

        expect(board.fields).toEqual(stringToFields(`
        -------
        -------
        -------
        --2----
        -212---
        11112--
        `));
        expect(board.victory).toEqual('player1');
    })

    it("player1 wins vertically", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = playUntilPlayer1Wins(board);

        expect(board.fields).toEqual(stringToFields(`
        -------
        -------
        ---1---
        ---12--
        ---12--
        ---12--
        `));
        expect(board.victory).toEqual('player1');
    })

    it("don't execute more turns after victory", () => {
        let board = newBoard({ rows: 6, cols: 7, startPlayer: 'player1' });

        board = playUntilPlayer1Wins(board);

        expect(play(board, 'player2', 4)).toEqual(board);
        expect(board.victory).toEqual('player1');
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