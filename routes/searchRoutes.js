const express = require('express');
const router = express.Router();
const controller = require('../controllers/searchController');

router.get('/:query', controller.search_videos);

module.exports = router;
