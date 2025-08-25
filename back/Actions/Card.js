const {fileModel} = require("../models/user"); 


const Card = async (req,res)=>{
    try{
        const {userId} = req.body;
        const data = await fileModel.find({id:userId});
        res.status(200).json({data});
    }catch(err){
        console.log(err);
    }
}

module.exports = Card;