const express = require('express');
const router = express.Router();
const controller = require('../controllers/infoController');

router.get('/:id', controller.get_video_info);

module.exports = router;
