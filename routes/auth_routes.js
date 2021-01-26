const { Router } = require("express");
const bcrypt = require("bcrypt");
const config = require("../config/default.json");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Minimal length is 6 symbols").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid registration info",
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "User already registered" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
    await new User({ email, password: hashedPassword }).save();
 
      res.status(201).json({ message: "User registered" });
    } catch (error) {
      res.status(500).json({ message: "something goin wrong" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter correectt email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid login info",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password. Try again" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({token, userId: user.id});
    } catch (error) {
      res.status(500).json({ message: "something goin wrong" });
    }
  }
);

module.exports = router;
