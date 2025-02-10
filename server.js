const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000; // ✅ Railway will set PORT automatically

// Generate Mines Using Provably Fair Algorithm
app.post("/predict-mines", (req, res) => {
    const { serverSeed, clientSeed, mineCount } = req.body;

    if (!serverSeed || !clientSeed || mineCount < 1 || mineCount > 24) {
        return res.status(400).json({ error: "Invalid input parameters!" });
    }

    // Generate HMAC-SHA256 hash
    const hash = crypto.createHmac("sha256", serverSeed).update(clientSeed).digest("hex");

    // Convert hash to numbers
    let numbers = [];
    for (let i = 0; i < hash.length; i += 2) {
        let num = parseInt(hash.substr(i, 2), 16) % 25;
        if (!numbers.includes(num)) numbers.push(num);
        if (numbers.length === mineCount) break;
    }

    res.json({ mines: numbers });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
