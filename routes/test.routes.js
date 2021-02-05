const { Router } = require("express");
const Test = require("../models/Test");
const Answers = require("../models/UserAnswer");
const shortid = require("shortid");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const router = Router();

// /api/test/create
router.post("/create", auth, async (req, res) => {
  try {
    const { from } = req.body;
    const existing = await Test.findOne({ from });

    if (existing) {
      return res.json({ test: existing });
    }

    const test = new Test({
      name: from.name,
      description: from.description,
      isTest: from.isTest,
      owner: req.user.userId,
      questionsList: from.questionsList,
      answersList: from.answersList,
    });
    if(from.image.length>2){
      test.image = from.image;
    }

    await test.save();
    res.status(201).json({ test });
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

// /api/test/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    res.json(test);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

// /api/test
router.get("/", auth, async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

// /api/user/delete
router.post("/delete", auth, async (req, res) => {
  try {
    const { testId } = req.body;
    const candidate = await Test.findById(testId);
    if (candidate) {
      await Test.findByIdAndDelete(testId);
      await Answers.deleteMany({testId});
      return res.status(200).json({ message: "Тест видалено успішно"})
    } else {
      return res.status(404).json({ message: "Тест не знайдено" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так. Помилка серверу : " + error });
  }
});

module.exports = router;
