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
