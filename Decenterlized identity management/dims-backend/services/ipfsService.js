const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

const PINATA_JWT = process.env.PINATA_JWT; // Pinata v2 JWT

async function uploadToPinata(filePath) {
  try {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const data = new FormData();
    data.append("file", fs.createReadStream(filePath));

    const res = await axios.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        ...data.getHeaders(),
      },
    });

    console.log("✅ File uploaded to IPFS via Pinata v2:", res.data.IpfsHash);
    return res.data.IpfsHash;
  } catch (error) {
    console.error("❌ Pinata upload failed:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { uploadToPinata };
