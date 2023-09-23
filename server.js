const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Create an endpoint to proxy the external API request
app.get("/get-fortune", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY; // Replace with your actual API key
    const apiUrl = `${process.env.API_BASE_URL}/generate`;

    // Make a GET request to the external API with the API key
    const response = await axios.get(apiUrl, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });

    // Forward the response from the external API to the client
    res.json({ fortune: response.data.fortune });
  } catch (error) {
    console.error("Error fetching fortune:", error);
    res.status(500).json({ error: "Failed to fetch fortune" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
