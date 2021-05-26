// Import Package
const express = require("express");
app = express();
app.use(express.json());

// // Enviornment Variable setup
require("dotenv").config();

// // import router file
const productRouter = require("./routes/product");

// // define PORT
const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/v1", productRouter);

// PORT listening
app.listen(PORT, () => {
  console.log(`Port is listening on ${PORT}`);
});
