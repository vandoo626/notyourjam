// Paste the backend proxy code I provided earlier
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/odds', async (req, res) => {
  try {
    const response = await axios.get('https://api.the-odds-api.com/v4/sports/upcoming/odds', {
      params: {
        apiKey: process.env.ODDS_API_KEY,
        regions: 'us',
        markets: 'h2h',
        oddsFormat: 'american',
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Failed to fetch odds' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
