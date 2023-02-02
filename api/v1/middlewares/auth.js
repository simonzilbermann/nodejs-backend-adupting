const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    
  
    try{
        console.log("check");
      
        const token=req.headers.authorization;      
    
        const { manager } = jwt.verify(token, process.env.SECRET_KEY);
        req.manager = manager;
       
        return res.status(200).json({msg:" authorized request "});
    }
    catch(error)
    {
       return res.status(401).json({msg:"not authorized request "});
    }

};


