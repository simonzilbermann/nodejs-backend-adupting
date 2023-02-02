const router = require('express').Router();
const {delete_all,newalert,get_all_alert,get_alert_by_id} = require("../controller/alerts");

router.delete("/deleteall",delete_all);
router.post("/newalert",newalert);
router.get("/getall",get_all_alert);
router.post("/getbyid",get_alert_by_id);
module.exports=router;