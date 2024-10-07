# 2048 Game on Solana using Blink

This is a simple implementation of the classic 2048 game built using Solana's Blink framework. The game is integrated with Solana blockchain, allowing player interactions and high scores to be saved on-chain. This project was created for the Solana Hackathon.

## Features

1. Classic 2048 gameplay: Use arrow keys or swipe gestures to move the tiles on the board.
2. Solana Integration: High scores and game state are saved on the Solana blockchain using Blink.
3. Responsive design: Play on desktop or mobile devices.
4. Lightweight and fast: Built with performance in mind using Solana's Blink framework.

## Game Logic with Blink

In this 2048 game, Blink is used to manage interactions with the blockchain:

1. Game State Storage: Each time a player reaches a new high score, Blink triggers a transaction to store the game state and the score on the Solana blockchain.
2. High Score Leaderboard: Blink fetches the top scores from the blockchain, making the leaderboard decentralized and tamper-proof.
3. Secure Transactions: When a player ends a game, Blink ensures that the transaction containing the score and game state is securely signed and submitted using the player's Solana wallet.

## Blink Workflow

1. The game calls a Solana Action via a GET request to fetch metadata about the game and the available actions (e.g., submitting a score).
2. The player completes the game and triggers a POST request to send their game score, generating a signable transaction.
3. The transaction is signed using the player's wallet and sent to the Solana blockchain for confirmation.
4. High scores are fetched from the blockchain using a GET request, displaying the current leaderboard.
