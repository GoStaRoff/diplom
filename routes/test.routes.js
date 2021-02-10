const { Router } = require("express");
const Test = require("../models/Test");
const Answers = require("../models/UserAnswer");
const shortid = require("shortid");
const fs = require("fs");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const router = Router();

const updateImages = async () => {
  try {
    const tests = await Test.find();
    let images = [];
    for (let i = 0; i < tests.length; i++) {
      if (tests[i].image) images.push(tests[i].image);
      const questions = tests[i].questionsList;
      for (let j = 0; j < questions.length; j++) {
        if (questions[j].image) images.push(questions[j].image);
      }
      const answers = tests[i].answersList;
      for (let j = 0; j < answers.length; j++) {
        for (let k = 0; k < answers[j].length; k++) {
          if (answers[j][k].image) images.push(answers[j][k].image);
        }
      }
    }
    const files = fs.readdirSync("./public/uploads/");
    for (let i = 0; i < files.length; i++) {
      if (!images.includes(files[i]))
        fs.unlinkSync("./public/uploads/" + files[i]);
    }
  } catch (e) {
    console.log("UPDATE IMAGES ERROR : " + e);
  }
};

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
      instruction: from.instruction,
      isTest: from.isTest,
      owner: req.user.userId,
      questionsList: from.questionsList,
      answersList: from.answersList,
    });
    if (from.image.length > 2) {
      test.image = from.image;
    }

    await test.save();
    updateImages();
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
      await Answers.deleteMany({ testId });
      updateImages();
      return res.status(200).json({ message: "Тест видалено успішно" });
    } else {
      updateImages();
      return res.status(404).json({ message: "Тест не знайдено" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Щось пішло не так. Помилка серверу : " + error });
  }
});

module.exports = router;
