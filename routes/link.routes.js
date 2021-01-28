const { Router } = require("express");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const config = require('config');
const router = Router();

router.post("/generate", async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const {from} = req.body;
    
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId }); //?????
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id); //?????
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

module.exports = router;
