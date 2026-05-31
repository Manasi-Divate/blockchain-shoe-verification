# Getting Started with Create React App


## Local Development — exact commands

Follow these steps in separate terminals (Windows) to run the full stack locally.

1) Terminal A — start Hardhat node (leave running):

```bash
npx hardhat node
```

2) Terminal B — deploy the smart contract to the local node (run after Terminal A is up):

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Note the `Contract deployed to:` address printed by the deploy script. Update `src/blockchain/contract.js` `contractAddress` with that address if it differs from the default.

3) Terminal C — install dependencies (first time) and start the React app:

```bash
npm install
npm start
```

4) Browser / MetaMask — connect to the local chain:

- Open MetaMask and add a custom RPC: `http://localhost:8545` (or `http://127.0.0.1:8545`).
- Import an account using one of the private keys printed by `npx hardhat node` (the node prints funded accounts). Select that account in MetaMask.

Now open `http://localhost:3000` in your browser. Use the `Manufacturer` page to register a product — on success the app will redirect through Distributor → Retailer → Consumer.

If you change the deployed contract address, update `src/blockchain/contract.js` and restart the React app.

If you want me to automatically deploy and update `src/blockchain/contract.js`, say "deploy and update" and I'll run the deploy and patch the address for you.

