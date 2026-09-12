const { Sequelize } = require("sequelize");
const { Post, User, Comment } = require("../models/associations");

exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = new Post({ title, content, userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findByPk(req.params.postId);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.userId !== Number(userId)) {
      return res.status(403).json({ message: "Only the owner can delete this post" });
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.details = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title"],
      include: [
        { model: User, as: "user", attributes: ["id", "name"] },
        { model: Comment, as: "comments", attributes: ["id", "content"] }
      ]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.commentCount = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",
        [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"]
      ],
      include: [
        { model: Comment, as: "comments", attributes: [], required: false }
      ],
      group: ["Post.id"]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};