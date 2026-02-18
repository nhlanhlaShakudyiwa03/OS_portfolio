import React, { useMemo, useState } from "react";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default function MiniGameApp() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = useMemo(() => getWinner(board), [board]);
  const isDraw = useMemo(() => !winner && board.every(Boolean), [board, winner]);

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    setBoard((prev) => {
      const next = [...prev];
      next[index] = isXTurn ? "X" : "O";
      return next;
    });
    setIsXTurn((prev) => !prev);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="h-full w-full bg-slate-950 text-white rounded-xl p-6 flex flex-col">
      <h2 className="text-2xl font-bold">Tic-Tac-Toe</h2>
      <p className="text-slate-300 text-sm mt-1">Play against a friend in this window.</p>

      <div className="mt-6 text-sm text-slate-200">
        {winner ? `Winner: ${winner}` : isDraw ? "Draw game" : `Turn: ${isXTurn ? "X" : "O"}`}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 max-w-xs">
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleCellClick(index)}
            className="h-20 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-2xl font-bold"
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={resetGame}
        className="mt-4 w-fit px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors text-sm font-medium"
      >
        Restart
      </button>
    </div>
  );
}
