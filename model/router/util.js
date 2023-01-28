const jwt = require('jsonwebtoken');
const secret = "s23d23fg34k2jb34";
function step_back(req, res, next){
    if(!req.cookies.DataLogin)
        next();
    return res.redirect('/index');
}
function auntenticando(req,res,next){
    jwt.verify(req.cookies.DataLogin,secret,(err)=>{
            if(!err) 
                next()
            return res.redirect('/login');
        }   
    );
 }
module.exports = {
    auntenticando,
    secret,
    step_back
};