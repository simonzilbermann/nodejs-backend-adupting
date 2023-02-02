const router = require('express').Router();
const {get_user_by_id,get_all_users_no_render,get_all_users,register,login,recover_pass,reset_pass,delete_all_users,enable_user}=require("../controller/users.js");

router.get("/delete_all",delete_all_users);
router.get("/get_all",get_all_users_no_render);
router.get("/getall",get_all_users);
router.post("/reg",register);
router.post("/getuserByid",get_user_by_id);
router.post("/log",login);
router.post("/rec",recover_pass);
router.post("/res",reset_pass);
router.post("/enable",enable_user);

module.exports=router;