# 🚀 Noble to Ethereum USDC Bridge 🌉

Welcome to the Noble to Ethereum USDC Bridge! This project allows users to transfer USDC from the Noble test chain to Ethereum Sepolia testnet seamlessly.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## 📝 Overview

This project is a simple React application built with Vite and styled with Tailwind CSS. It enables users to transfer USDC from the Noble test chain to Ethereum Sepolia in two steps:
1. Burn USDC on the Noble test chain.
2. Mint USDC on Ethereum Sepolia.

## ✨ Features

- Connect/Disconnect Keplr wallet
- View USDC balance on Noble
- Connect/Disconnect Sepolia wallet (MetaMask)
- View ETH and USDC balance on Sepolia

## 🛠️ Installation

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

## 🚀 Usage

1. **Connect your wallets:**
    - Connect your Keplr wallet to interact with the Noble test chain.
    - Connect your MetaMask wallet to interact with the Sepolia testnet.

2. **Burn USDC on Noble:**
    - Enter the amount of USDC to burn and the recipient's address.
    - Click the "Burn" button to initiate the burn transaction on the Noble chain.

3. **Mint USDC on Ethereum:**
    - Enter the transaction hash from the burn transaction.
    - Click the "Mint" button to mint USDC on the Sepolia testnet.