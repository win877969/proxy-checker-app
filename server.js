const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/check-proxy", async (req, res) => {
  const { proxy } = req.body;

  try {
    // Test proxy using Axios
    const response = await axios.get("https://example.com", {
      proxy: {
        host: proxy.split(":")[0],
        port: parseInt(proxy.split(":")[1]),
      },
      timeout: 5000,
    });

    res.status(200).send({
      status: "NGACENG",
      latency: response.elapsedTime, // Optionally measure latency
    });
  } catch (error) {
    res.status(400).send({
      status: "TURU",
      error: error.message,
    });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

