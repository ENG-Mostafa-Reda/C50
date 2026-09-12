const { Op } = require("sequelize");
const { Comment, User, Post } = require("../models/associations");

exports.bulkCreate = async (req, res) => {
  try {
    const comments = await Comment.bulkCreate(req.body.comments || req.body);
    res.status(201).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId !== Number(req.body.userId)) {
      return res.status(403).json({ message: "Only the owner can update this comment" });
    }

    comment.content = req.body.content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.findOrCreate = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    const [comment, created] = await Comment.findOrCreate({
      where: { postId, userId, content },
      defaults: { postId, userId, content }
    });

    res.status(created ? 201 : 200).json({ comment, created });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const word = req.query.word;
    const { rows, count } = await Comment.findAndCountAll({
      where: { content: { [Op.like]: `%${word}%` } }
    });
    res.json({ count, comments: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.newest = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      order: [["createdAt", "DESC"]],
      limit: 3
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.details = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, as: "user" },
        { model: Post, as: "post" }
      ]
    });
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};