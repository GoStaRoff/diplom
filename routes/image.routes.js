const { Router } = require("express");
const path = require("path");
const multer = require("multer");
const auth = require("../middleware/auth.middleware");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}).single("myImage");

const router = Router();

router.post("/upload" ,async (req, res) => {
  upload(req, res, (err) => {
    if (!err) return res.status(200).json({ message: req.file.filename });
    else return res.status(500).json({ message: "Щось пішло не так : " + err });
  });
});

router.get("/download/:imgName", async (req, res) => {
  try {
    res.statusCode = 200;

    res.setHeader("Content-Type", "image/jpeg");

    require("fs").readFile(
      `./public/uploads/${req.params.imgName}`,
      (err, image) => {
        res.end(image);
      }
    );
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так. Помилка : " + e });
  }
});

module.exports = router;
