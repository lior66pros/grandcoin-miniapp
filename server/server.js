
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

const users = {};

app.use(cors());
app.use(bodyParser.json());

app.post("/wallet/balance", (req, res) => {
  const { telegramId } = req.body;
  if (!telegramId) return res.status(400).json({ error: "Missing telegramId" });

  if (!users[telegramId]) {
    users[telegramId] = { balance: 10 };
  }

  res.json({ balance: users[telegramId].balance });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
