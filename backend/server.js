const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./config/models/index.js");
const usersRouter = require("./routers/usersRouter");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync({})
  .then(() => {
    console.log("Synced database");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

app.use("/users", usersRouter);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
