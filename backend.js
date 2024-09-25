const cors = require("cors");
const express = require("express");
const { blogModel } = require("./db");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:MS10DwmRLt0BWiru@cluster0.nstku.mongodb.net/blog-page"
);

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

app.get("/", async (req, res) => {
  const allBlogs = await blogModel.find();

  res.json(allBlogs);
});

app.listen(443);
