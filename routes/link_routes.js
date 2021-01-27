const { Router } = require("express");
const Link = require();
const router = Router();

router.post("/generate", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

router.get("/", async (req, res) => {
  try {
      const links = await Link.find({owner: null}); //?????
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

router.get("/:id", async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

module.exports = router;
