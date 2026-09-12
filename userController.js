const { Op } = require("sequelize");
const { User } = require("../models/associations");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: "Email already exists" });

    const user = User.build({ name, email, password, role });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.upsertUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const id = Number(req.params.id);

    const user = await User.findByPk(id);

    if (user) {
      user.set({ name, email, password, role });
      await user.save({ validate: false });
      return res.json(user);
    }

    const newUser = await User.create(
      { id, name, email, password, role },
      { validate: false }
    );

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.findByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.query.email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["role"] }
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};