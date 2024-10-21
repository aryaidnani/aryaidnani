const cors = require("cors");
const express = require("express");
const { blogModel } = require("./db");
const mongoose = require("mongoose");
require("dotenv").config();

const key = process.env.MONGODB_KEY;

mongoose.connect(key, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());

app.use(express.json());

const date = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getOrdinalSuffix(day) {
  if (day % 10 === 1 && day % 100 !== 11) return "st";
  if (day % 10 === 2 && day % 100 !== 12) return "nd";
  if (day % 10 === 3 && day % 100 !== 13) return "rd";
  return "th";
}

const dateString = `${date.getDate()}<sup>${getOrdinalSuffix(
  date.getDate()
)}</sup> ${months[date.getMonth()]} '${String(date.getFullYear()).slice(2)}`;

console.log(dateString);

app.post("/api/blog-post", async (req, res) => {
  const id = req.body.id;
  const dateStr = dateString;
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

app.get("/api/blogData", async (req, res) => {
  console.log(`running 1`);

  const allBlogs = await blogModel.find();

  console.log(`running 2`);

  res.json(allBlogs);
});

// app.listen(443);
module.exports = app;
