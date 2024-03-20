const validater=(userid,password,kidneyid)=>{
    if(userid!="ashad" || password!="pass"){
        return {msg:"Something wrong with userid or pass"}
     }
     else if(kidneyid!=1 && kidneyid!=2){
        return  {msg:"Some thing wrong with kidney id"};
     }
     return {msg:"go ahead"};
}
function lastcall(req,res,next){
    res.json({msg:"Your health is perfect.by next"})
}
const mainmiddleware=(req,res,next)=>{
    const {kidneyid}=req.query;
    const {userid,password}=req.headers;
    const validater_resp=validater(userid,password,kidneyid);
    if(validater_resp.msg!="go ahead"){
        // res.json(validater_resp);
        res.send(validater_resp);
    }
    else{
        next();
    }
}

export {lastcall,validater,mainmiddleware};