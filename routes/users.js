const express = require('express');
const router = express.Router();
const get_all_users=require('../controllers/userController').get_all_users ;
const add_user=require('../controllers/userController').add_user ;
const update_user= require('../controllers/userController').update_user;
const authenticateToken =require('../util/authenticate').authenticateToken;
/* GET users listing. */
router.get('/',authenticateToken ,get_all_users);
router.get('/:id',require('../controllers/userController').get_user_by_id);
router.post('/login',require('../controllers/userController').login);
router.put('/change/:email',require('../controllers/userController').change_password);
router.post('/register', add_user);
router.put('/update/:id',update_user);
router.delete('/delete/:id',require('../controllers/userController').delete_user);
module.exports = router;

 