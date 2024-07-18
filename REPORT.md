# Solution Report and Thought Process

## Project Steps

### 1. Discovery and Documentation Reading
- **Objective:** Understand the Circle CCTP protocols for cross-chain USDC transfers.
- **Action:** Thoroughly read through the Circle CCTP documentation to identify necessary smart contract functions and API endpoints for burning and minting USDC.

### 2. Solution Research
- **Objective:** Define a robust architectural approach.
- **Action:** Decide to use Domain-Driven Design (DDD) principles for a modular and scalable project structure.

### 3. Initial Proof of Concept (PoC)
- **Objective:** Validate initial interactions with smart contracts and wallets.
- **Action:** Develop a basic prototype to test wallet connectivity and contract interactions.

### 4. Faucet Acquisition
- **Objective:** Obtain test USDC.
- **Action:** Use faucets to get USDC on Noble and Sepolia test networks for transaction testing.

### 5. Architecture Setup
- **Objective:** Establish a solid project foundation.
- **Action:** Design the application's architecture using DDD principles to separate concerns and enhance maintainability.

### 6. Feature Implementation
- **User Interface:**
  - **Action:** Develop a simple UI for wallet interactions and balance display.
- **Wallet Connections:**
  - **Action:** Implement MetaMask and Keplr wallet connectivity.
- **Balance Retrieval and Contexts:**
  - **Action:** Create hooks and contexts to manage wallet state and real-time balance updates.
- **USDC Burn:**
  - **Action:** Implement the burn functionality using Circle CCTP smart contracts on Noble.
- **Attestation Retrieval:**
  - **Action:** Develop logic to fetch attestations via Circle’s API.
- **Attestation Status Check:**
  - **Action:** Attempt to fetch attestation status. Despite correct hex to string conversions, the transaction hash was not found.

### Challenges
- **Keplr Connection:**
  - **Issue:** Network issues preventing proper wallet connection.
- **Attestation Retrieval:**
  - **Issue:** Persistent difficulty in obtaining attestation status.

### Bonus Features

#### Exercise 1
- **Action:** Implement a simple request and set up the microtask queue for efficient async task handling.
- **Testing:** Add unit tests to ensure code robustness.

#### Exercise 2
- **Action:** Apply known techniques and best practices to meet the requirements.

## Conclusion
The project successfully implements a cross-chain USDC transfer application using Circle CCTP. Despite some challenges, particularly in retrieving attestation status, the application is modular and maintainable, adhering to DDD principles. The inclusion of notifications and error handling enhances the user experience, providing clear feedback and smooth interactions.

## Personal Note
I am very disappointed with my work due to numerous issues and delays. Despite these challenges, I have learned a lot throughout this process and hope that this experience demonstrates my commitment and potential.