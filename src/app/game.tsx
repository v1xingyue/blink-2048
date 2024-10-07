"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAtom } from "jotai";
import { addressAtom } from "../atoms/gameAtoms";

const GRID_SIZE = 4;

export const Game = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [score, setScore] = useState<number>(0);
  const [steps, setSteps] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [address] = useAtom(addressAtom);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const initializeGrid = useCallback((): number[][] => {
    const newGrid = Array.from({ length: GRID_SIZE }, () =>
      Array(GRID_SIZE).fill(0)
    );
    addRandomNumber(newGrid);
    addRandomNumber(newGrid);
    return newGrid;
  }, []);

  useEffect(() => {
    setGrid(initializeGrid());
  }, [initializeGrid]);

  useEffect(() => {
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, [gameContainerRef]);

  const move = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      const newGrid = JSON.parse(JSON.stringify(grid));
      let newScore = score;
      let moved = false;

      if (direction === "up" || direction === "down") {
        for (let col = 0; col < GRID_SIZE; col++) {
          const column = newGrid.map((row: number[]) => row[col]);
          if (direction === "down") column.reverse();
          const [mergedColumn, columnScore] = merge(column);
          newScore += columnScore;
          if (direction === "down") mergedColumn.reverse();
          for (let row = 0; row < GRID_SIZE; row++) {
            if (newGrid[row][col] !== mergedColumn[row]) moved = true;
            newGrid[row][col] = mergedColumn[row];
          }
        }
      } else if (direction === "left" || direction === "right") {
        for (let row = 0; row < GRID_SIZE; row++) {
          const newRow = [...newGrid[row]];
          if (direction === "right") newRow.reverse();
          const [mergedRow, rowScore] = merge(newRow);
          newScore += rowScore;
          if (direction === "right") mergedRow.reverse();
          if (newGrid[row].toString() !== mergedRow.toString()) moved = true;
          newGrid[row] = mergedRow;
        }
      }

      if (moved) {
        setGrid(newGrid);
        setScore(newScore);
        setSteps(steps + 1);
        addRandomNumber(newGrid);

        if (checkGameOver(newGrid)) {
          setGameOver(true);
        }
      }
    },
    [grid, score, steps]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver) return;

      switch (event.key) {
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
          move("down");
          break;
        case "ArrowLeft":
          move("left");
          break;
        case "ArrowRight":
          move("right");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [move, gameOver]);

  function addRandomNumber(grid: number[][]) {
    const emptyCells: [number, number][] = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) emptyCells.push([rowIndex, colIndex]);
      });
    });

    if (emptyCells.length > 0) {
      const [row, col] =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  function merge(line: number[]): [number[], number] {
    let newLine = line.filter((value) => value !== 0);
    let scoreGained = 0;
    for (let i = 0; i < newLine.length - 1; i++) {
      if (newLine[i] === newLine[i + 1]) {
        newLine[i] *= 2;
        newLine[i + 1] = 0;
        scoreGained += newLine[i];
      }
    }
    newLine = newLine.filter((value) => value !== 0);
    while (newLine.length < GRID_SIZE) {
      newLine.push(0);
    }
    return [newLine, scoreGained];
  }

  function checkGameOver(grid: number[][]): boolean {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid[row][col] === 0) return false;
      }
    }

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE - 1; col++) {
        if (grid[row][col] === grid[row][col + 1]) return false;
      }
    }

    for (let col = 0; col < GRID_SIZE; col++) {
      for (let row = 0; row < GRID_SIZE - 1; row++) {
        if (grid[row][col] === grid[row + 1][col]) return false;
      }
    }

    return true;
  }

  function restartGame() {
    setGrid(initializeGrid());
    setScore(0);
    setSteps(0);
    setGameOver(false);
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }

  const formatAddress = (address: string | null) => {
    if (!address) return "offline";
    return `${address.slice(0, 4)}...${address.slice(-6)}`;
  };

  return (
    <div
      ref={gameContainerRef}
      tabIndex={0}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        boxSizing: "border-box",
        padding: "20px 0",
        outline: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80vw",
          marginBottom: "20px",
          maxWidth: `${GRID_SIZE * 150}px`,
        }}
      >
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#f0b27a",
            borderRadius: "5px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Score: {score}
        </div>
        <div
          style={{
            margin: "0 20px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Address: {formatAddress(address)}
        </div>
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#f0b27a",
            borderRadius: "5px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Steps: {steps}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 150px)`,
          gap: "2px",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: 150,
                height: 150,
                backgroundColor: cell === 0 ? "#f5cba7" : "#f0b27a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 36,
                fontWeight: "bold",
                border: "2px solid #b0b0b0",
                boxSizing: "border-box",
              }}
            >
              {cell !== 0 ? cell : ""}
            </div>
          ))
        )}
      </div>
      {gameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            fontSize: "32px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <div>Game Over</div>
          <button
            onClick={restartGame}
            style={{
              marginTop: "20px",
              width: "50%",
              padding: "20px 0",
              fontSize: "28px",
              fontWeight: "bold",
              backgroundColor: "#e67e22",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};
