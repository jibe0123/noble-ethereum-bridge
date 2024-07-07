# Noble to Ethereum USDC Bridge 🌉

This project is a user-friendly React application designed to facilitate the transfer of USDC from the Noble test chain to the Ethereum Sepolia testnet. Built with Vite and styled using Tailwind CSS, this app ensures a seamless and efficient bridging process for users.

## Features ✨

- **Wallet Connectivity:**
   - Connect and disconnect Keplr wallet for interacting with the Noble test chain.
   - Connect and disconnect MetaMask wallet for interacting with the Ethereum Sepolia testnet.

- **Balance Display:**
   - View your USDC balance on the Noble chain.
   - View your ETH and USDC balances on the Sepolia testnet.

- **USDC Transfer:**
   - Burn USDC on the Noble test chain.
   - Mint USDC on the Ethereum Sepolia testnet.

## How It Works 🛠️

1. **Burn USDC on Noble:**
   - Enter the amount of USDC to burn and the recipient's address.
   - Initiate the burn transaction.

2. **Mint USDC on Ethereum:**
   - Provide the transaction hash from the burn transaction.
   - Initiate the mint transaction on Sepolia.

## Getting Started 🚀

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jibe0123/noble-ethereum-bridge.git
   cd noble-ethereum-bridge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Docker Setup 🐳

To run the application using Docker and PM2, follow these steps:

1. **Build the Docker image:**
   ```bash
   docker build -t noble-ethereum-bridge .
   ```

2. **Run the Docker container:**
   ```bash
   docker run -p 3000:3000 noble-ethereum-bridge
   ```

## Makefile Commands 📜

Use the Makefile for convenient commands:

- **Install dependencies:**
  ```bash
  make install
  ```

- **Run the development server:**
  ```bash
  make dev
  ```

- **Build the Docker image:**
  ```bash
  make docker-build
  ```

- **Run the Docker container:**
  ```bash
  make docker-run
  ```