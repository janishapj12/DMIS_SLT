# 🏗️ Project Name: [DIMS]


Create a `.env` file in the root directory:

env
```
PORT=5000
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Project"
JWT_SECRET=your_jwt_secret

USER_REGISTRY_CONTRACT=
PRIVATE_KEY=
RPC_URL=http://127.0.0.1:8545

```

⚡ Installation
```
npm i
npm install -g ganache        # Install Ganache
npm install -g truffle        # Install Truffle

```
🚀 Running the Blockchain

```
ganache
truffle compile
truffle migrate --network development

```

📦 Project Structure

```
/backend
  ├─ controllers/
  ├─ models/
  ├─ routes/
  ├─ service/  # BlockchainSerevice.js
  ├─ server.js

/blockchain
  ├─ contracts/    
  ├─ migrations/   
  ├─ test/
  └─ truffle-config.js

/frontend
  ├─ src/
  ├─ public/
  └─ package.json
```


