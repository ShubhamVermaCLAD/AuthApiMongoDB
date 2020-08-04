const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const mongooseConnection=require('./connection/mongoDBConnection')
const authRoutes=require('./routes/authRoutes');
const {decode}=require('./util/jwtToken');
const app=express();
const PORT=process.env.PORT | 3000;


// body parser
app.use(express.json());
const decodeToken=async(req,res,next)=>{
    const accessToken=req.header('accesstoken');
    if(!accessToken){
        res.status(401).send({errorStatus:405, errorMessage:"Access Token Required."})
    }
    try{
        const verified=decode(accessToken,process.env.TOKEN_SECRET);
        req.user=verified;
        next();
    }catch(err){
        res.status(400).send({errorStatus:405, errorMessage:"Invalid Access Token."})
    }
}
app.use('/api/w',decodeToken);
app.use('/api/user',authRoutes);
app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))