import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});