## 🔐 Environment Configuration

Create a `.env` file in the root directory of the project and add the following variables.

### 🌐 Server Configuration
```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

USER_REGISTRY_CONTRACT=deployed_user_registry_contract_address
CERTIFICATE_REGISTRY_CONTRACT=deployed_certificate_registry_contract_address
PRIVATE_KEY=your_wallet_private_key
RPC_URL=http://127.0.0.1:8545

PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_api_key
PINATA_JWT=your_pinata_jwt
```
## 🔐 Environment runing 
```
npm install 
npm start  -- backend
npm run dev  -- frontend 
ganache  --- blockchain 
truffle compile  ---  blockchain
truffle migrate --- blockchain
```
