const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  username: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  content: { type: String, required: true },
});
const CommentsModel = mongoose.model("comment", commentsSchema);

module.exports = CommentsModel;
