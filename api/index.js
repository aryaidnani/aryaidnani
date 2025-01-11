const cors = require("cors");
const express = require("express");
const { blogModel } = require("./db");
const { blogModel2 } = require("./db");
const { userModel } = require("./db");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = `${process.env.JWT_SECRET}`;

require("dotenv").config();

const key = process.env.MONGODB_KEY;

mongoose.connect(key);

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

app.post("/api/blogPost", async (req, res) => {
  const id = (await blogModel.find()).length + 1;
  const dateStr = dateString;
  const content = req.body.content;

  //Bulk Seeding

  // await blogs.forEach(async (el) => {
  //   const id = el.id;
  //   const dateStr = el.dateStr;
  //   const content = el.content;

  //   const newBlog = await blogModel2.create({
  //     id: id,
  //     dateStr: dateStr,
  //     content: content,
  //   });
  // });
  // ***************************************************************

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

app.get("/api/new", async (req, res) => {
  console.log(`running 1`);

  const allBlogs = await blogModel.find(); //Latest blogs
  console.log(`running 2`);

  res.json(allBlogs);
});

app.get("/api/old", async (req, res) => {
  console.log(`running 1`);

  const allBlogs2 = await blogModel2.find(); //Old blogs
  console.log(`running 2`);

  res.json(allBlogs2);
});

// Auth Backend

const signInMiddleware = async (req, res, next) => {
  const dbPass = await userModel.findOne();
  // if (dbPass.token === req.headers.token) {
  //   console.log(`existing`);
  //   next(res.json({ message: "verified" }));
  // } else {
  // const passwordEntered = req.body.password;

  // const verification = await bcrypt.compare(
  //   passwordEntered,
  //   String(dbPass.password)
  // );

  // if (verification) {
  //   const newToken = jwt.sign({ message: `${JWT_SECRET}` }, JWT_SECRET);
  //   await userModel.findOneAndUpdate({ token: newToken });
  //   console.log(`new`);
  //   next(res.json({ message: "Success", token: newToken }));
  // } else {
  //   res.json({ message: "Verification Failed" });
  // }
  // }

  try {
    jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
      try {
        console.log(`existing ${decoded.message}`);
        next(res.json({ message: "verified" }));
      } catch {
        console.log(err);
      }
    });
  } catch {
    const passwordEntered = req.body.password;

    const verification = await bcrypt.compare(
      passwordEntered,
      String(dbPass.password)
    );

    if (verification) {
      const newToken = jwt.sign({ message: `${JWT_SECRET}` }, JWT_SECRET);
      await userModel.findOneAndUpdate({ token: newToken });
      console.log(`new`);
      next(res.json({ message: "Success", token: newToken }));
    } else {
      res.json({ message: "Verification Failed" });
    }
  }
};

app.post("/api/post", signInMiddleware, (req, res) => {
  res.json({ message: "Welcome" });
});

app.listen(443);
// module.exports = app;
