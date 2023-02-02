const router = require('express').Router();
const {block_delete,profiles_to_confirm,get_all_profiles,update_region,create_profile_stg1,get_profile_byid,get_profile_byid_no_render,updatesalary,delete_all_profiles}=require("../controller/profile.js");

router.post("/region",update_region);
router.post("/delete_profile",block_delete);
router.post("/create",create_profile_stg1);
router.get("/allpro",get_all_profiles);
router.get("/con_prof",profiles_to_confirm);
router.get("/getpro/:profileid",get_profile_byid);
router.post("/getbyid",get_profile_byid_no_render);
router.post("/salary",updatesalary);
router.get("/delete_all_pro",delete_all_profiles);

module.exports=router;