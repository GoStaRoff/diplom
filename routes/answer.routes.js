const { Router } = require("express");
const Answers = require("../models/UserAnswer");
const shortid = require("shortid");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const router = Router();

// /api/answers/add
router.post("/add", auth, async (req, res) => {
  try {
    const { testId, userId, answersList } = req.body;
    const existing = await Answers.findOne({ testId: testId, userId: userId});
    if (existing) {
      await Answers.findOneAndUpdate({userId,testId}, { answersList });
      res.status(201).json({ message: "Відповіді успішно оновлені" });
    } else {
        await new Answers({testId, userId, answersList}).save();
    } 
  } catch (e) {
      console.log(e)
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

module.exports = router;
