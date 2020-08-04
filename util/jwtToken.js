const jwt=require('jsonwebtoken');

const encode=(payload)=>{
    return jwt.sign(payload, process.env.TOKEN_SECRET);
}
const decode=(payload)=>{
    return jwt.verify(payload,process.env.TOKEN_SECRET)
}
module.exports={
    encode,
    decode
}