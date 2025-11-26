require("dotenv").config();
const Web3 = require("web3");
const contract = require("../../Blockchain/build/contracts/CertificateRegistry.json");

const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:8545";
const web3 = new Web3(RPC_URL);

const networkId = Object.keys(contract.networks)[0];
const contractAddress = process.env.CERTIFICATE_REGISTRY_CONTRACT || (networkId ? contract.networks[networkId].address : null);

if (!contractAddress) throw new Error("CertificateRegistry contract address not found!");

const certificateContract = new web3.eth.Contract(contract.abi, contractAddress);

let senderAccountPromise = (async () => {
  if (process.env.PRIVATE_KEY) {
    const acct = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
    console.log("✅ Loaded account from PRIVATE_KEY:", acct.address);
    return acct.address;
  } else {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  }
})();

async function uploadCertificate(email, title, ipfsHash) {
  const senderAccount = await senderAccountPromise;
  const receipt = await certificateContract.methods
    .uploadCertificate(email, title, ipfsHash)
    .send({ from: senderAccount, gas: 3000000 });
  return receipt;
}

async function getCertificates(email) {
  return await certificateContract.methods.getCertificates(email).call();
}

async function deleteCertificate(email, index) {
  const senderAccount = await senderAccountPromise;
  const receipt = await certificateContract.methods
    .deleteCertificate(email, index)
    .send({ from: senderAccount, gas: 3000000 });
  return receipt;
}

module.exports = { uploadCertificate, getCertificates, deleteCertificate };
