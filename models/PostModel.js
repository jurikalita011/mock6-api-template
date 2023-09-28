const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  username: { type: String },
  content: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});
const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
