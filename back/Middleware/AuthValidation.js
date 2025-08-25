const joi= require('joi')

// const signupValidation=(req,res,next)=>{
//     const Schema=joi.object({
//         name:joi.string().min(3).max(19).required(),
//         password:joi.string().min(3).required()
//     })
//     const {error}= Schema.validate(req.body);
//     if(error){
//         return res.status(400).json({message:"bad server config",error})
//     }
//     next();
// }

const loginValidation=(req,res,next)=>{
    const Schema=joi.object({ 
        email:joi.string().email().required(),
        password:joi.string().min(3).required()
    })
    const {error}= Schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"bad server config",error})
    }
    next();
}

module.exports={loginValidation}