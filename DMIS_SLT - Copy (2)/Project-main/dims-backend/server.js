const express =require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const auditLogRoutes = require('./routes/Aditlogroute');
const bio = require('./routes/authRoutes');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin:"http://localhost:8081",credentials: true }))

app.get((req,res) => res.send('hello'))

app.use('/api/users', userRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/auth", bio);



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server running on port" + PORT ))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));