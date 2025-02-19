import express from 'express';
import axios from 'axios';
import cors from 'cors';
import * as dotenv from 'dotenv'

dotenv.config();

let redmineBaseUrl = process.env.REDMINE_BASE_URL;
let redmineApiKey = process.env.REDMINE_API_KEY;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:6001'
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/issues', async (req, res) => {
  try {
    const redmineResponse = await axios.get(`${redmineBaseUrl}/issues.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Redmine-API-Key': redmineApiKey
      },
      params: req.query // forwards query parameters
    });
    res.json(redmineResponse.data);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Failed to fetch issues from Redmine.' });
  }
});