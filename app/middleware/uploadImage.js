const multer = require('multer');
const path = require('path');

const uploadUserPicture = (req, res, next) => {
  const { image } = req.body;
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path.join(__dirname, 'public/img/users'));
    },
    filename: (req, file, cb) => {
      const uniqueFileName = Date.now() + '-' + image + '-' + Math.round(Math.random() * 1e9);
      req.fileName = uniqueFileName;
      cb(null, file.filename + '-' + uniqueFileName);
    },
  });
  const upload = multer({ storage });
  upload.single('upload_user_image');
  next();
};

module.exports = { imageUserUpload: uploadUserPicture };
