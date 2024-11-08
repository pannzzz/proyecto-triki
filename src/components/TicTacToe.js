    import React, { useState, useEffect } from 'react';
    import Confetti from 'react-confetti';
    import trash from '../assets/basura.png';
    import container from '../assets/contenedor.png';
    import '../components/TicTacToe.css';

    // Main TicTacToe Component
    const TicTacToe = () => {
    // State
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);

    // Handle click on each square
    const handleClick = (index) => {
        if (board[index] || winner || isDraw) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    // Calculate winner whenever the board changes
    useEffect(() => {
        const result = calculateWinner(board);
        if (result) {
        setWinner(result);
        } else if (board.every((cell) => cell !== null)) {
        setIsDraw(true);
        }
    }, [board]);

    // Calculate if there is a winner on the board
    const calculateWinner = (squares) => {
        const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
        }
        return null;
    };

    // Reset the game
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setIsDraw(false);
    };

    // Game status to show the turn or result
    const status = winner
        ? `Winner: ${winner === 'X' ? 'Trash' : 'Container'}`
        : isDraw
        ? "It's a draw!"
        : `Turn of: ${isXNext ? 'Trash (X)' : 'Container (O)'}`;

    // Render each square with the corresponding symbol
    const renderSquare = (index) => {
        const value = board[index];
        return (
        <button className="square" onClick={() => handleClick(index)}>
            {value === 'X' && <img src={trash} alt="X" />}
            {value === 'O' && <img src={container} alt="O" />}
        </button>
        );
    };

    return (
        <div className="app">
        <div className="content-container">
            <div className="card">
            <h1 className="h1">Environmental Tic Tac Toe!!</h1>
            <h2>{status}</h2>
            <div className="board">
                {[0, 1, 2].map((row) => (
                <div key={row} className="board-row">
                    {renderSquare(row * 3)}
                    {renderSquare(row * 3 + 1)}
                    {renderSquare(row * 3 + 2)}
                </div>
                ))}
                {/* Board lines */}
                <div className="line horizontal-line top"></div>
                <div className="line horizontal-line middle"></div>
                <div className="line vertical-line left"></div>
                <div className="line vertical-line right"></div>
            </div>

            {/* Result modal and confetti */}
            {(winner || isDraw) && (
                <>
                <Confetti />
                <div className="modal">
                    <div className="modal-content">
                    <h3>
                        {winner
                        ? `${winner === 'X' ? 'Trash' : 'Container'} has won the game!`
                        : "It's a draw!"}
                    </h3>
                    <div className="modal-images">
                        {winner === 'X' && <img src={trash} alt="Trash Winner" />}
                        {winner === 'O' && <img src={container} alt="Container Winner" />}
                        {isDraw && (
                        <>
                            <img src={trash} alt="Trash Draw" />
                            <img src={container} alt="Container Draw" />
                        </>
                        )}
                    </div>
                    <button onClick={resetGame}>Restart Game</button>
                    </div>
                </div>
                </>
            )}

            {/* Restart button */}
            <button className="reset-button" onClick={resetGame}>
                Restart Game
            </button>
            </div>
        </div>
        </div>
    );
    };

    export default TicTacToe;
