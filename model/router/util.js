const jwt = require('jsonwebtoken');
const secret = "s23d23fg34k2jb34";
function step_back(req, res, next){
    if(req.cookies.DataLogin){
        res.redirect('/index');
    }else{
        next();
    }
}
function auntenticando(req,res,next){
    jwt.verify(req.cookies.DataLogin,secret,(err)=>{
     if(err){
         console.log(err)
         throw new Error
     }else{
         next()
     };    
    });
 }
module.exports = {
    auntenticando,
    secret,
    step_back
};