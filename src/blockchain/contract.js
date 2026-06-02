import { ethers } from "ethers";

const defaultContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || defaultContractAddress;
const allowedChainIds = (process.env.REACT_APP_ALLOWED_CHAIN_IDS || "31337,1337").split(",").map((id) => id.trim());

const contractABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "_productId", "type": "uint256" },
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_brand", "type": "string" },
      { "internalType": "string", "name": "_manufacturer", "type": "string" },
      { "internalType": "string", "name": "_metadataURI", "type": "string" }
    ],
    "name": "registerProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_productId", "type": "uint256" },
      { "internalType": "string", "name": "_distributor", "type": "string" }
    ],
    "name": "updateDistributor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_productId", "type": "uint256" },
      { "internalType": "string", "name": "_retailer", "type": "string" }
    ],
    "name": "updateRetailer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_productId", "type": "uint256" }
    ],
    "name": "verifyProduct",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const getContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

  const network = await provider.getNetwork();
  const currentChainId = network.chainId.toString();
  console.log("CONNECTED CHAIN ID:", currentChainId);

  if (!allowedChainIds.includes(currentChainId)) {
    alert(`Please switch MetaMask to a supported local network (${allowedChainIds.join(", ")}).`);
    throw new Error("Wrong network");
  }

  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return contract;
};