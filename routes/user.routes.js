const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth.middleware");
const router = Router();

// /api/user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

// /api/user/change
router.post("/change", auth, async (req, res) => { 
  try {
    const { email, password, login, userType} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    if(password.length <6){
      await User.findByIdAndUpdate(req.user.userId, {email, login, userType});
    }
    else{
      await User.findByIdAndUpdate(req.user.userId, {email, password: hashedPassword, login, userType});
    }

    res.status(201).json({ message: "Дані користувача змінено успішно." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Щось пішло не так. Помилка серверу : " + error });
  }
});

module.exports = router;
