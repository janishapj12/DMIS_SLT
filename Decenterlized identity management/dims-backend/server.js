const express =require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require("http");
const Web3 = require("web3");
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const auditLogRoutes = require('./routes/Aditlogroute');
const bio = require('./routes/authRoutes');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin:"http://localhost:8080",credentials: true }))

app.get((req,res) => res.send('hello'))

app.use('/api/users', userRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/auth", bio);



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server running on port" + PORT ))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


  // Create server once
const server = http.createServer(app);

// Prevent MaxListeners warning globally
server.setMaxListeners(20); // optional, safe limit


// Attach "close" listener only once
server.once("close", () => {
  console.log("Server closed");
});

// Optional: handle process exit gracefully
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => process.exit(0));
});