const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogPost = new Schema({
  id: Number,
  dateStr: String,
  content: String,
});
const userDetails = new Schema({
  password: String,
  token: String,
});

const blogModel = mongoose.model("blogs", blogPost);
const blogModel2 = mongoose.model("blogs2", blogPost);
const userModel = mongoose.model("userDetails", userDetails);

module.exports = {
  blogModel,
  blogModel2,
  userModel,
};
