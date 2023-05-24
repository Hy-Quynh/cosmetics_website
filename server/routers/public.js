const express =  require('express');
const publicController = require('../controllers/public');
const router = express.Router();

router.put('/view/:blogId', publicController.changeBlogView)

module.exports = router;
