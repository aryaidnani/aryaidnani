const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogPost = new Schema({
  id: Number,
  dateStr: Number,
  content: String,
});

const blogModel = mongoose.model("blogs", blogPost);

module.exports = {
  blogModel,
};
