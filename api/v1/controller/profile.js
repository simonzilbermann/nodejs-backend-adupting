const mongoose=require('mongoose');
const bcrypt=require("bcrypt");
const profiles = require('../model/profiles');
const users=require('../model/users');
// const jwt = require("jsonwebtoken");
const status=require('../model/status');


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
  delete_all_profiles:(req,res)=>{
    profiles.deleteMany({}).then(()=>{
        return res.status(200).json({msg:"delet all profiles!"})
    })
},

    create_profile_stg1:(req,res)=>{

        const {userid,image}=req.body;
        const profileidd = get_random_string(5);
        const created_at = Date(Date.now()).toString();
        users.find({userid}).then((userdata)=>{       
        profiles.find({userid}).then((rows)=>{  
          if ( rows.length == 0 ) {
            users.updateOne({userid},{$set:{profileid:profileidd}}).then((efect)=>{
              const newprofile = new profiles({
                _id:new mongoose.Types.ObjectId(),
                employment:userdata[0].employment,confirmdata:0,image,profileid:profileidd,userid,name:userdata[0].name,lastname:userdata[0].lastname,d_of_birth:userdata[0].d_of_birth,phone:userdata[0].phone,city:userdata[0].city,address:userdata[0].address,email:userdata[0].email,created_at,
                status:1
              });
              newprofile.save().then((data)=>{ 
              
                return res.status(200).json({msg:data});
              })
            })
        }
       else return   res.status(200).json({msg:rows[0]});
        })
      })
    

      
       
    },
    get_profile_byid_no_render:(req,res)=>{
      const profileid = req.body;
    
      profiles.find({profileid:profileid.profileid}).then((data)=>{
        if(data.length > 0 ){
  
          return res.status(200).json({msg:data[0]});
        }
        else{
          return res.status(409).json({msg:0});
        }
      })
    },
    get_profile_byid:(req,res)=>{
      const profileid = req.params.profileid;
      var total_satatus = 0;
      status.find().then((rows)=>{
        total_satatus = rows.length;
     
        var id = profileid+"";
        var arr = id.split("=");
        profiles.find({profileid:arr[1]}).then((data)=>{
     
          if(data.length > 0){
             return res.render('profile',{name:data[0].name,image:data[0].image,city:data[0].city,phone:data[0].phone,status:data[0].status+"/"+total_satatus,email:data[0].email,lastname:data[0].lastname,d_of_birth:data[0].d_of_birth}); 
          } 
        })
      })
     
    },
    block_delete:(req,res)=>{
        const  {profileid} = req.body;
        var email ="",subject ="",body="";
        var userid = "";
        profiles.find({profileid}).then((data)=>{
          if(data.length > 0){
            email = data[0].email;
            userid = data[0].userid;
            profiles.deleteOne({profileid}).then((rowsP)=>{
              users.deleteOne({userid}).then((rowsU)=>{
                if(rowsP.deletedCount > 0 && rowsU.deletedCount >0){
                  subject ="הפרופיל שלך נמחק ונחסם";
                  body ="אנחנו מצטערים לבשר לך כי הפרופיל שלך נחסם ונמחק מאחר שלא עמד בדרישות המערכת";
                  require('../../../emailsend').emailsend(email,subject,body);
                  require('./alerts').delete_by_proid({profileid});
                  return res.status(200).json({msg:"delete sucsseed"});
                } else{
                  return res.status(200).json({msg:"delete failed"});
                }

              })
            
            })
            
          }
          else{
            return res.status(200).json({msg:"delete failed"});
          }
        })

        
    },
    updatesalary:(req,res)=>{
      const {salary,profileid }= req.body;
      profiles.updateOne({profileid},{$set:{salary}}).then((effect)=>{
        if(effect.modifiedCount > 0){
          return res.status(200).json({msg:1});
        }
        else return res.status(407).json({msg:0});
      })
    },
    update_region:(req,res)=>{
      const {region,profileid}= req.body;
      profiles.updateOne({profileid},{$set:{region}}).then((effect)=>{
        if(effect.modifiedCount > 0){
          return res.status(200).json({msg:1});
        }
        else return res.status(407).json({msg:0});
      })
    },
    get_all_profiles:(req,res)=>{
      console.log("fetch");
      profiles.find({},{_id:false}).then((data)=>{
        if(data.length > 0){
          return res.status(200).json({msg:data});
        }
        else{
          return res.status(407).json({msg:"no profiles in DB"});
        }
      })
    },
    profiles_to_confirm:(req,res)=>{
      profiles.find({status:{$eq:6}},{_id:false}).then((data)=>{
          if(data.length > 0){
            for(let i =0;i<data.length;i++){
             
              let type = "status";
              let profileid = data[i].profileid;
              let content = "פרופיל בסטטוס 6 : "+profileid;

              require('./alerts').newalert({content,type});
            }
             return res.status(200).json({msg:data});
          }else{
             return res.status(409).json({msg:"no profiles yet ! "})
          }
      })
    }


   
}