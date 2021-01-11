import React from 'react';
import './game.css';
import {useGameState} from "./game.hook";

export default Game

function Game() {

    const [history, squares, winner, xIsNext, handleMove, jumpTo] = useGameState()

    const moves = history.map((_: { squares: string[] }, move: number) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        // @ts-ignore
        // @ts-ignore
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={squares}
                    onClick={(i: number) => handleMove(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

type BoardProps = {
    squares: string[],
    onClick: (square: number) => void
}

function Board(props: BoardProps) {
    function renderSquare(i: number) {
        return (
            <Square
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        );
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

type SquareProps = {
    value: string,
    onClick: () => void;
}

function Square(props: SquareProps) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
