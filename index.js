const express = require("express");
const data = require("./models/data");

const app = express();

const port = 4000;

// Handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.status = 200;
  res.end(JSON.stringify(data));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
