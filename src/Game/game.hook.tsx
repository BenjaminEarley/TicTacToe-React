import {useState} from "react";

interface GameData { squares: string[] }
interface HistoryState extends Array<GameData>{}
type Winner = string | null

export function useGameState(): [HistoryState, string[], Winner, boolean, Function, Function] {

    const initialState: HistoryState = [
        {
            squares: Array(9).fill("")
        }
    ]

    const [history, setHistory] = useState(initialState as HistoryState);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    function handleMove(i: number) {
        const slicedHistory = history.slice(0, stepNumber + 1);
        const current = slicedHistory[slicedHistory.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i] !== "") {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";

        setHistory(slicedHistory.concat([
            {
                squares: squares
            }
        ]))
        setStepNumber(slicedHistory.length)
        setXIsNext(!xIsNext)
    }

    function jumpTo(step: number) {
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    return [history, current.squares, winner, xIsNext, handleMove, jumpTo]
}

function calculateWinner(squares: string[]): Winner {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}