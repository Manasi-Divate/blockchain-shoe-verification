# Blockchain Shoe Verification

## Project Overview

This project is a blockchain-based shoe authenticity verification app built with Hardhat, Solidity, React, and Ethers.js.

It models a simple supply chain flow: Manufacturer registers a shoe, Distributor updates shipping details, Retailer updates availability, and Consumer verifies authenticity.

---

## Main Files and How They Work

- `contracts/ShoeVerification.sol`
  - Defines the `ShoeVerification` smart contract.
  - Stores `Shoe` records in a mapping keyed by `productId`.
  - Provides `registerProduct`, `updateDistributor`, `updateRetailer`, and `verifyProduct` functions.
  - Tracks product lifecycle state such as brand, manufacturer, distributor, retailer, status, and verification flag.

- `scripts/deploy.js`
  - Deploys the `ShoeVerification` contract to the configured Hardhat network.
  - Prints the deployed contract address to the console.

- `src/blockchain/contract.js`
  - Contains the contract ABI and hard-coded default contract address.
  - Connects to `window.ethereum` using Ethers.js and requests MetaMask account access.
  - Verifies the connected network is Hardhat local (`chainId` 31337).
  - Returns a signer-connected contract instance for UI pages.

- `src/App.js`
  - Defines the React router and top-level page navigation.
  - Includes a dark/light theme toggle and links to the four main sections.

- `src/pages/Manufacturer.js`
  - Lets the manufacturer register a new shoe product on-chain.
  - Uploads shoe metadata (image choice and description) to IPFS.
  - Sends `registerProduct` transaction to the contract with the IPFS metadata URI.
  - Navigates to the distributor page after successful registration.

- `src/pages/Distributor.js`
  - Updates the on-chain distributor name for a registered product.
  - Sends `updateDistributor` transaction and then routes to the retailer page.

- `src/pages/Retailer.js`
  - Updates the on-chain retailer name for the product.
  - Sends `updateRetailer` transaction and then routes to the consumer page.

- `src/pages/Consumer.js`
  - Verifies the product by calling `verifyProduct` on-chain.
  - Fetches product metadata from IPFS using the metadata URI stored on-chain.
  - Displays product details, authenticity status, image, and description.

- `package.json`
  - Defines dependencies for React, Ethers.js, React Router, Tailwind, Hardhat, and build tools.
  - Includes `npm start`, `npm build`, and React test scripts.

- `hardhat.config.js`
  - Configures the Hardhat environment for compiling and deploying Solidity contracts.

---

## Execution Steps

1. Install dependencies:

```bash
npm install
```

2. Start the Hardhat local node in one terminal:

```bash
npx hardhat node
```

3. Deploy the smart contract in a second terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

4. Update `src/blockchain/contract.js` if the deployed address printed by the deploy script is different from the default.

> Optional: create a `.env` file with `REACT_APP_WEB3_STORAGE_TOKEN=<your_token>` to upload metadata to IPFS via Web3.Storage. If no token is set, the app still works with local browser metadata fallback.

> Note: The app now uses IPFS for shoe metadata when available, so the latest contract deployment must match the address configured in `src/blockchain/contract.js`.

5. Start the React app in a third terminal:

```bash
npm start
```

6. Open MetaMask and connect to the local chain:
  - RPC URL: `http://localhost:8545`
  - Import one of the Hardhat accounts from `npx hardhat node`

7. Open the app at:

```text
http://localhost:3000
```

8. Use the app in order:
  - `Manufacturer` to register a shoe
  - `Distributor` to add distributor details
  - `Retailer` to add retailer details
  - `Consumer` to verify the product by ID

---

## Notes

- The contract requires MetaMask to be on the Hardhat network (`31337`).
- Product metadata (image/description) is uploaded to IPFS when `REACT_APP_WEB3_STORAGE_TOKEN` is provided. If no token is set, metadata is loaded from localStorage as a browser fallback.

