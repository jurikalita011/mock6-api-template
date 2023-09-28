const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./routes/UserRoutes");
const postRouter = require("./routes/PostRoutes");
const auth = require("./middlewares/auth");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use(auth);
app.use("/post", postRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("running at port 7000");
});
