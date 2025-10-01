# 🌐 DIMS Web App - Decentralized Identity Management System

![DIMS Banner](https://img.shields.io/badge/DIMS-Blockchain%20MERN-green)

> A modern, decentralized identity management system built with **MERN Stack** and **Blockchain integration**, supporting **MetaMask login**, user registration, statistics tracking, and more.

---

## 🔥 Features

- ✅ **User Registration & Login**
  - Register with email/password
  - Login securely with JWT
- ✅ **MetaMask Wallet Integration**
  - Login using Ethereum wallet
  - Seamless blockchain authentication
- ✅ **User Dashboard**
  - View user statistics
  - Track activity and identity information
- ✅ **Admin Panel**
  - Monitor all users
  - Analytics & reports
- ✅ **Blockchain Smart Contract**
  - User identity stored on Ethereum/Ganache network
  - Immutable records with secure contract interaction

---

## 🛠 Tech Stack

| Layer           | Technology |
|-----------------|------------|
| Frontend        | React.js, Tailwind CSS |
| Backend         | Node.js, Express.js, MongoDB |
| Blockchain      | Ethereum, Solidity, Truffle, Web3.js |
| Authentication  | JWT, MetaMask |

---

## ⚡ Project Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/DMIS_SLT.git
cd DMIS_SLT

```
📂 Folder Structure
```
DIMS/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ App.js
├─ blockchain/
│  ├─ contracts/
│  ├─ migrations/
│  └─ truffle-config.js
└─ README.md
```

🔗 Useful Commands

```
npm run dev – Start backend server with nodemon
npm start – Start React frontend
truffle migrate – Deploy smart contracts
ganache – Start local blockchain
```


2️⃣ Environment Variables


```
PORT=5000
MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret"

USER_REGISTRY_CONTRACT="your_contract_address"
PRIVATE_KEY="your_wallet_private_key"
RPC_URL="http://127.0.0.1:8545"
```






📜 License

This project is licensed under the MIT License.
© 2025 DIMS Web App | Built with ❤️ by SLT
