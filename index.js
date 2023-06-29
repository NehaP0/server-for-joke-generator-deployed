const express = require('express');
const axios = require('axios')
const cors = require('cors')
require('dotenv').config();

const app = express();
const apiPort = 8080; // Choose a port number that is not in use

app.use(express.json());
app.use(cors())

// OpenAI API credentials
const openaiApiKey = process.env.OPENAI_API_KEY;



// API endpoint for generating jokes
app.get('/jokes', async (req, res) => {
    try {
      const keyword = req.query.keyword;
      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: `joke about ${keyword}`,
        max_tokens: 100,
        temperature: 0.7,
        n: 1
      }, {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      });
  
      const joke = response.data.choices[0].text.trim();
      res.json({ joke });
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      res.status(500).json({ error: error });
    }
  });

// Start the server
app.listen(apiPort, () => {
  console.log(`Server is listening on port ${apiPort}`);
});
