// middleware/multerMiddleware.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const handleUpload = (req, res, next) => {
  upload.single("songFile")(req, res, (err) => {
    if (err) {
      // Xử lý lỗi khi tải lên
      return res.status(400).json({ error: "Không thể tải lên tệp" });
    }
    // Tiếp tục middleware chain nếu không có lỗi
    next();
  });
};

module.exports = handleUpload;
