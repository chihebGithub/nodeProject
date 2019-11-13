const express = require('express');
const router = express.Router();
const get_all_messages=require('../controllers/messageController').get_all_messages ;

/* GET users listing. */
router.get('/', get_all_messages);
router.post('/', require('../controllers/messageController').dispatch_msg);
module.exports = router;