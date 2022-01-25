const express = require('express');
const router = express.Router();
const controller = require('../controllers/downloadController');

router.get('/:id', controller.download_video);

module.exports = router;
