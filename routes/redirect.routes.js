const { Router } = require("express");
const router = Router();
const Link = require("../models/Link");

// /api/t/:code
router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (!link) {
      res.status(404).json({ message: "Link not found" });
    }
    link.clicks++;
    await link.save();
    return res.redirect(link.from);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка" + e });
  }
});

module.exports = router;
