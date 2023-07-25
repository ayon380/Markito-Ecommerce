import mongoose from "mongoose";
const replySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema], // Nested array of replies (sub-documents)
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"EUser",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema], // Nested array of comments (sub-documents)
  likes: {
    type: Number,
    default: 0,
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
