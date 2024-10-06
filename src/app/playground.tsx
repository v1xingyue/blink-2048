"use client";

import { Game } from "./game";
import { Wallet } from "./wallet";
import { Keyborad } from "./keyboard";

export const PlayGround = () => {
  return (
    <Wallet>
      <div className="playground-container">
        <Keyborad />
        <Game />
      </div>
    </Wallet>
  );
};
