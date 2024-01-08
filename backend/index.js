const express = require("express");
require("dotenv").config();
const sequelize = require("./db/index");
require("express-async-errors");
const router = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

(async () => {
  try {
    await sequelize.sync();
    console.log("Models have been synchronized successfully.");
  } catch (error) {
    console.error("Unable to sync models with the database:", error);
  }
})();

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
