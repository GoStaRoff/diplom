const { Router } = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Пошта вказана не вірно.").isEmail(),
    check("password", "Мінімальна довжина паролю 6 символів").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Неправильно введені дані",
        });
      }
      const { email, password , kurs, surname, name, patronymic, specialization} = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Користувач вже зареєстрований" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      await new User({ email, password: hashedPassword , kurs, surname, name, patronymic, specialization}).save();

      res.status(201).json({ message: "Користувач зареєстрований успішно." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Щось пішло не так. Помилка серверу : " + error });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Пошта вказана не вірно.").normalizeEmail().isEmail(),
    check("password", "Введіть пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Неправильні дані",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Користувача не знайдено." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Не вірний пароль. Спробуйте знову" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "24h",
      });
      res.json({ token, userId: user.id, typeUser: user.userType });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Щось пішло не так. Помилка серверу : " + error });
    }
  }
);

module.exports = router;
