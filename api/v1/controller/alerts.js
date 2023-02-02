const mongoose=require('mongoose');
const alerts = require('../model/alerts');
function get_random_string(length){
    let str="";
    const chars="abcdefghijklmnopqrstuvwxyz0123456789";
    let index;
    for(let i=0;i<length;i++)
    {
        index=Math.floor(Math.random() * chars.length);
        str+=chars[index];
    }
    return str;

}
module.exports={
    newalert:(req,res)=>{
        const {content,type} = req;
       
        if(type =="status"){
            var profileid = content+"";
            profileid = profileid.split(' ');
            profileid = profileid[profileid.length-1];

            alerts.find({profileid},{_id:false}).then((data)=>{
               
                if(data.length < 1){
                    const alertid = get_random_string(10);
                    const alert = new alerts({
                    _id:new mongoose.Types.ObjectId(),
                    alertid,content,type,profileid
                    });
                    alert.save();
                }
            })
        }
        else if(type =="content_us"){
            const alertid = get_random_string(10);
            const alert = new alerts({
            _id:new mongoose.Types.ObjectId(),
            alertid,content,type
            });
            alert.save();   
        }
    },
    get_all_alert:(req,res) =>{
        alerts.find({},{_id:false}).then((data)=>{
            if(data.length > 0){
                return res.status(200).json({msg:data});
            }
            else{
                return res.status(409).json({msg:"no alerts founds"});
            }
        })
    },
    get_alert_by_id:(req,res)=>{
        const alertid = req.body;
        alerts.find({alertid},{_id:false}).then((data)=>{
            if(data.length ==1){
                return res.status(200).json({msg:data[0]});
            }
            else{
                return res.status(408).json({msg:"no alert found"});
            }
        })
    },
    delete_all:(req,res)=>{
        alerts.deleteMany({},{}).then((rows)=>{
            if(rows.deletedCount > 0){
                return res.status(200).json({msg:"all alert deleted"});
            }
            else  return res.status(200).json({msg:"nothing to delete"});
        })
    },
    delete_by_proid:(req,res)=>{
        const profileid = req;
        console.log(profileid);
        alerts.deleteOne({profileid:profileid.profileid}).then((rows)=>{
        })
    }
}