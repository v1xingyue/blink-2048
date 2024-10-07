"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAtom } from "jotai";
import { addressAtom } from "../atoms/gameAtoms"; // 引入 addressAtom
import { Keypair } from "@solana/web3.js";

export const Keyborad = () => {
  const [, setAddress] = useAtom(addressAtom); // 使用 setAddress

  const newGame = async () => {
    const pair = Keypair.generate();
    setAddress(pair.publicKey.toBase58()); // 设置新的游戏地址
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
