const express = require("express");
const cors = require("cors");
const authRouter = require("./src/routers/authRouter");
const connectDB = require("./src/config/connectDb");
const { errMiddleHandle } = require("./src/middlewares/ErrMiddleHandle");
const app = express();

const port = 3000;
app.use(cors());
app.use(express.json());
connectDB();
app.use("/auth", authRouter);
app.use("/", (req, res) => {
  res.send({ mes: "hello" });
});
app.use(errMiddleHandle);
app.listen(port, () => {
  console.log(`app listen port ${port}`);
});
