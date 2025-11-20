require("dotenv").config();
const axios = require("axios");

async function summarizeText(input) {
  const text = typeof input === "object" && input.text ? input.text : input;

  if (!text || text.trim().split(/\s+/).length < 50) {
    throw new Error("Please enter a longer note (at least 50 words).");
  }

  try {
    const response = await axios.post(
       "https://router.huggingface.co/hf-inference/models/pszemraj/led-large-book-summary",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 300000, // 5 minutes timeout for large docs
      }
    );

    const data = response.data;

    if (Array.isArray(data) && data[0]?.summary_text) {
      return data[0].summary_text;
    } else if (typeof data === "object" && data.summary_text) {
      return data.summary_text;
    } else {
      console.error("Unexpected response format:", data);
      throw new Error("Unexpected Hugging Face response format.");
    }
  } catch (error) {
    console.error("Hugging Face API error:", error.response?.data || error.message);
    throw new Error("Summarization failed.");
  }
}

module.exports = { summarizeText };

