const mongoose=require('mongoose');
const managers = require('../model/managers');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const profiles = require('../model/profiles');

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

login_manager:(req,res)=>{
    const { email,pass} = req.body;
        managers.find({email}).then((rows)=>{
            if(rows.length ==0){
                return res.status(409).json({msg:"email not found"});
            }
            bcrypt.compare(pass,rows[0].pass).then((status)=>{
                if(!status)
                return res.status(409).json({msg:"password not match"});
                else{
                    const manager = rows[0];
                    // Create a JWT for the manager
                    const token = jwt.sign({ manager }, process.env.SECRET_KEY, {
                      expiresIn: '1h',
                    });
                    // Send the JWT in the response 
               
                    return res.status(200).json({ msg: token });
                  }
                
               
            })
        })

},

save_manager:(req,res)=>{
    const { email,pass,name} = req.body;
    const mid = get_random_string(5);
    bcrypt.hash(pass,12).then((hashPass)=>{
        const newmanager = new managers({
            _id:new mongoose.Types.ObjectId(),
            mid,email,pass:hashPass,name
        
        }); 
        managers.find({email}).then((rows)=>{
            if(rows.length > 0){
                    return res.status(409).json({msg:"email already exist!!"});
            }else{
                newmanager.save().then((data)=>{
                   
                    return res.status(200).json({msg:"saved!"});
                })
            }
        })
    })
},
delete_manager:(req,res)=>{
    const mid = req.body;
    managers.deleteOne({mid:mid.mid}).then((rows)=>{
        if(rows.deletedCount > 0){
            return res.status(200).json({mag:"deleted"});
        }
        else{
            return res.status(409).json({msg:"cant delete"});
        }
    })
},
get_all_managers:(req,res)=>{
    managers.find({},{_id:false}).then((data)=>{
        if(data.length > 0){
            return res.status(200).json({msg:data});
        }
        else{
            return res.status(409).json({msg:"not found"});
        }
       
    })
},
confirmation_data:(req,res)=>{
    const profileid = req.body;
    profiles.updateOne({profileid},{$set:{confirmdata:1}}).then((row)=>{
        if(row.modifiedCount >0){
            return res.status(200).json({msg:row.modifiedCount});
        }
        else{
            return res.status(407).json({msg:0});
        }
    })
}


}