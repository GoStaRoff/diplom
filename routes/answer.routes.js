const { Router } = require("express");
const Answers = require("../models/UserAnswer");
const Test = require("../models/Test");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = Router();

// /api/answers/add
router.post("/add", auth, async (req, res) => {
  try {
    const { testId, userId, answersList, isTest } = req.body;
    let counter = 0;
    if (!isTest) {
      for (let i = 0; i < answersList.length; i++) {
        for (let j = 0; j < answersList[i].length; j++) {
          if (answersList[i][j].status && answersList[i][j].userSelect) {
            counter++;
          }
        }
      }
    }
    const existing = await Answers.findOne({ testId: testId, userId: userId });
    if (existing) {
      await Answers.findOneAndUpdate({ userId, testId }, { answersList, result: `${counter}/${answersList.length}` });
      res.status(201).json({ message: "Відповіді успішно оновлені" });
    } else {
      await new Answers({ testId, userId, answersList,result: `${counter}/${answersList.length}` }).save();
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
    let tests = Array(answers.length);
    for (let i = 0; i < answers.length; i++) {
      tests[i] = await Test.findById(answers[i].testId);
    }

    return res.json(tests);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

// /api/answers/test/:testId
router.get("/test/:testId", auth, async (req, res) => {
  try {
    const answers = await Answers.find({testId: req.params.testId});
    let users = Array(answers.length);
    for (let i = 0; i < answers.length; i++) {
      users[i] = await User.findById(answers[i].userId);
    }
    return res.json({answers,users})
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
})

// /api/answers
router.post("/", auth, async (req, res) => {
  try {
    const { testId, userId } = req.body;
    const answers = await Answers.findOne({ userId, testId });
    res.status(200).json(answers);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

module.exports = router;
