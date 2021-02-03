const { Router } = require("express");
const Answers = require("../models/UserAnswer");
const Test = require("../models/Test");
const shortid = require("shortid");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const router = Router();

// /api/answers/add
router.post("/add", auth, async (req, res) => {
  try {
    const { testId, userId, answersList } = req.body;
    const existing = await Answers.findOne({ testId: testId, userId: userId });
    if (existing) {
      await Answers.findOneAndUpdate({ userId, testId }, { answersList });
      res.status(201).json({ message: "Відповіді успішно оновлені" });
    } else {
      await new Answers({ testId, userId, answersList }).save();
      res.status(201).json({ message: "Відповіді додані" });
    }
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

// /api/answers/of/:id
router.get("/of/:id", auth, async (req, res) => {
  try {
    const answers = await Answers.find({ userId: req.params.id });
    console.log(answers)
    let tests = Array(answers.length);
    answers.forEach( async(answer, answerIndex) =>{
      tests[answerIndex] = await Test.findById(answer.testId)
    });
    res.json(tests)
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

module.exports = router;
