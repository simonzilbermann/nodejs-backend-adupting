const mongoose=require('mongoose');
mongoose.pluralize(null);
const alerts_schema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    alertid:String,
    type:String,
    content:String,
    profileid:String
});
module.exports=mongoose.model("alerts",alerts_schema);