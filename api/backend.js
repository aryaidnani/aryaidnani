const cors = require("cors");
const express = require("express");
const { blogModel } = require("../db");
const mongoose = require("mongoose");
require("dotenv").config();

(async function connectDB() {
  try {
    console.log(`awaiting`);
    await mongoose.connect(process.env.MONGODB_KEY);
    console.log(`connected`);
  } catch (error) {
    console.log(`Failed with: ${error}`);
  }
})();

const app = express();
app.use(cors());

app.use(express.json());

app.post("/blog-post", async (req, res) => {
  const id = req.body.id;
  const dateStr = req.body.dateStr;
  const content = req.body.content;

  const newBlog = await blogModel.create({
    id: id,
    dateStr: dateStr,
    content: content,
  });

  res.json({
    message: "Success",
    newBlog,
  });
});

app.get("/blogData", async (req, res) => {
  console.log(`running 1`);

  const allBlogs = await blogModel.find();

  console.log(`running 2`);

  res.json(allBlogs);
});

app.listen(443);
// module.exports = app;
