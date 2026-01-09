require("dotenv").config();
const Web3 = require("web3");
const contract = require("../../Blockchain/build/contracts/UserRegistry.json");

// Ganache RPC
const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:8545";
const web3 = new Web3(RPC_URL);

// --- Load Contract Address ---
const networkId = Object.keys(contract.networks)[0]; // e.g. "5777"
const contractAddress =
  process.env.USER_REGISTRY_CONTRACT ||
  (networkId ? contract.networks[networkId].address : null);

if (!contractAddress) {
  throw new Error("❌ Contract address not found! Deploy with truffle migrate first.");
}

// --- Load Contract ---
const registryContract = new web3.eth.Contract(contract.abi, contractAddress);

// --- Initialize Sender Account ---
let senderAccountPromise = (async () => {
  if (process.env.PRIVATE_KEY) {
    const acct = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
    console.log("✅ Loaded account from PRIVATE_KEY:", acct.address);
    return acct.address;
  } else {
    const accounts = await web3.eth.getAccounts();
    console.log("✅ Using Ganache default account:", accounts[0]);
    return accounts[0];
  }
})();

// --- Functions ---
async function registerOnChain(walletAddress, username, email, full_name, role) {
  const senderAccount = walletAddress || await senderAccountPromise;
  if (!senderAccount) throw new Error("❌ No sender account available");

  const receipt = await registryContract.methods
    .registerUser(username, email, full_name, role)
    .send({ from: senderAccount, gas: 3000000 });

  console.log("✅ User registered on-chain successfully!");
  console.log("User Details:", { walletAddress: senderAccount, username, email, full_name, role });
  console.log("Transaction Hash:", receipt.transactionHash);

  return receipt; // return receipt if needed in backend
}

async function updateOnChain(walletAddress, username, email, full_name, role) {
  const senderAccount = walletAddress || await senderAccountPromise;
  if (!senderAccount) throw new Error("❌ No sender account available");

  const receipt = await registryContract.methods
    .updateUser(username, email, full_name, role)
    .send({ from: senderAccount, gas: 3000000 });

  console.log("✅ User updated on-chain successfully!");
  console.log("User Details:", { walletAddress: senderAccount, username, email, full_name, role });
  console.log("Transaction Hash:", receipt.transactionHash);

  return receipt;
}

async function getUserFromChain(walletAddress) {
  console.log("Wallet Address Received:", walletAddress);
  const user = await registryContract.methods.getUser(walletAddress).call();
  console.log("✅ Fetched user from chain:", user);
  return user;
  
}

module.exports = { registerOnChain, updateOnChain, getUserFromChain };
