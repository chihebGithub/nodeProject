const express = require('express');
const router = express.Router();
const get_all_messages=require('../controllers/messageController').get_all_messages ;
const authenticateToken =require('../util/authenticate').authenticateToken;
/* GET users listing. */
router.get('/',authenticateToken, get_all_messages);
router.get('/:id', require('../controllers/messageController').get_msg_by_id );
router.delete('/:id', require('../controllers/messageController').delete_msg);
router.post('/', require('../controllers/messageController').dispatch_msg);
module.exports = router;
