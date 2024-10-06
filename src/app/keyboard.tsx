"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Keyborad = () => {
  const newGame = async () => {
    console.log("let's create new game");
  };

  return (
    <>
      <div className="button-container">
        <WalletMultiButton />
        <button className="new-game-button" onClick={newGame}>
          New Game
        </button>
      </div>
    </>
  );
};

// 添加处理 New Game 按钮点击的函数
const handleNewGame = () => {
  console.log("New Game started");
  // 在这里添加启动新游戏的逻辑
};
