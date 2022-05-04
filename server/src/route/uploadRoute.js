const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

router.get(
  '/upload',
  multer(multerConfig).single('file'),
  (request, response) => {
    console.log(request.file);
    response.json({ message: 'OK' });
  }
);

module.exports = router;
