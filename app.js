const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv = require("dotenv/config");
const app = express();

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

const port = process.env.PORT;
const db = process.env.DB;
app.use(cors());
app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json({ limit: "32mb", extended: true }));
app.use(express.urlencoded({ limit: "32mb", extended: true }));

app.use("/post", postRoutes);
app.use("/user", userRoutes);

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(db, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB ye başarılı şekilde bağlanıldı"));

app.listen(port, () => {
  console.log(`nodejs server ${port} portundan ayaklandı`);
});
