const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const authenticate = require('../service/authService').authenticate;

router.post(
  '/upload',
  authenticate,
  multer(multerConfig).single('file'),
  (request, response) => {
    response.status(201).json({ fileName: request.file.filename });
  }
);

module.exports = router;
