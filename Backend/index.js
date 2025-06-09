let dotEnv = require("dotenv");
let mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "20mb" }));

const userRoute = require("./routes/userRoute");

let PORT = process.env.PORT || 4000;

dotEnv.config();
//checking db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected success");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`server started on ${PORT} port`);
});
