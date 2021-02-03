const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Answers = require("../models/UserAnswer");
const auth = require("../middleware/auth.middleware");
const router = Router();

// /api/user/me
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

// /api/user/delete
router.post("/delete", auth, async (req, res) => {
  try {
    const { userId } = req.body;
    const candidate = await User.findById(userId);
    if (candidate) {
      await User.findByIdAndDelete(userId);
      await Answers.deleteMany({userId});
      return res.status(200).json({ message: "Користувача видалено успішно"})
    } else {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так. Помилка серверу : " + error });
  }
});

// /api/user/change
router.post("/change", auth, async (req, res) => {
  try {
    const {
      email,
      password,
      login,
      userType,
      surname,
      name,
      patronymic,
      address,
      specialization,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    if (password.length < 6) {
      await User.findOneAndUpdate(
        { email: email },
        {
          login,
          userType,
          surname,
          name,
          patronymic,
          address,
          specialization,
        }
      );
      res.status(201).json({
        message: "Дані користувача (не включаючи пароль) змінено успішно.",
      });
    } else {
      await User.findOneAndUpdate(
        { email: email },
        {
          password: hashedPassword,
          login,
          userType,
          surname,
          name,
          patronymic,
          address,
          specialization,
        }
      );
      res.status(201).json({ message: "Дані користувача змінено успішно." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Щось пішло не так. Помилка серверу : " + error });
  }
});

// /api/user
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

// /api/user/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

module.exports = router;
