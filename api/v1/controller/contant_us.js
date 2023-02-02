
const contentus=require('../model/contentus');
const mongoose=require('mongoose');

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

    contentus_ticket:(req,res)=>{
    const managerEmail =process.env.USEREMAIL;
    const { fullname,email,subject,phone,body}=req.body;
    const created_at = Date(Date.now()).toString();
    const ticket=new contentus({
        _id:new mongoose.Types.ObjectId(),
        ticketid:get_random_string(5),
        fullname,email,subject,phone,body,created_at
        });
        ticket.save().then((data)=>{
           
            var msgbody="היי תודה על פנייתך מספר : "+ticket.ticketid+"\n <br />  אנו מטפלים בפניות קודמות  <br />,הפנייה העוברה לטיפול נשוב ונטפל בהקדם אנא התעדכן במייל \n <br /> הפנייה שנשלחה במערכת: נושא- "+subject+"\n<br />"+"גוף הפנייה: "+body;
            require('../../../emailsend').emailsend(email,subject,msgbody);
            var managerSubject="פנייה חדשה מספר: " +ticket.ticketid;
            var managerbody="אימייל משתמש: " + email+", טלפון משתמש: " + phone +", גוף הפנייה: "+body;
            require('../../../emailsend').emailsend(managerEmail,managerSubject,managerbody);
            var cleanbody =body+"";
            var cleansubject = subject+"";
            while(cleanbody.includes(',')){
                cleanbody = cleanbody.replace(",", "");
            }
            while(cleansubject.includes(',')){
                cleansubject = cleansubject.replace(",", "");
            }
            var content = email+","+phone+","+cleanbody+","+cleansubject+","+ticket.ticketid;
            var type="content_us";
            require('./alerts').newalert({content,type});

            return res.status(200).json({msg:1});
        });

    }


   
}