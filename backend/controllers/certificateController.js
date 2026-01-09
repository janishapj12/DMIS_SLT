const Certificate = require("../models/certificateModel");
const { uploadCertificate, getCertificates, deleteCertificate } = require("../services/certificateRegistry");
const { uploadToPinata } = require("../services/ipfsService");

// Upload a new certificate
exports.upload = async (req, res) => {
  try {
    const { email, title, walletAddress } = req.body;

    // File uploaded from frontend (using multer)
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filePath = req.file.path;

    // 1️⃣ Upload file to IPFS via Pinata
    const ipfsHash = await uploadToPinata(filePath);

    // 2️⃣ Upload certificate data to blockchain
    const receipt = await uploadCertificate(walletAddress, email, title, ipfsHash);

    // 3️⃣ Save in MongoDB
    const cert = await Certificate.create({
      email,
      title,
      ipfsHash,
      uploadedBy: walletAddress || receipt.from,
      timestamp: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Certificate uploaded successfully",
      blockchainTx: receipt.transactionHash,
      certificate: cert,
      ipfsLink: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all certificates for an email
exports.getAll = async (req, res) => {
  try {
    const { email } = req.params;

    // Get certificates from blockchain
    const blockchainCerts = await getCertificates(email);

    // Get certificates from MongoDB
    const mongoCerts = await Certificate.find({ email });

    res.status(200).json({
      success: true,
      blockchain: blockchainCerts,
      database: mongoCerts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete certificate by index (blockchain) and MongoDB ID
exports.delete = async (req, res) => {
  try {
    const { walletAddress, email, index, mongoId } = req.body;

    // 1️⃣ Delete from blockchain
    const receipt = await deleteCertificate(walletAddress, email, index);

    // 2️⃣ Delete from MongoDB
    await Certificate.findByIdAndDelete(mongoId);

    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
      blockchainTx: receipt.transactionHash,
      deletedMongoId: mongoId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
