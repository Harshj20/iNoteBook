var jwt = require('jsonwebtoken');
var JWT_SECURE = 'harshIsAwesome';

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
         res.status(401).send('Access denied');
    }
    else{
    try{
    const data = jwt.verify(token, JWT_SECURE);
    req.user = data.user;
    console.log(req.user);
    next();
    }catch(err){
        res.status(401).send('Access denied');
    }
}
}
module.exports = fetchuser;