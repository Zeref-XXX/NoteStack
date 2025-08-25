const {fileModel} = require("../models/user"); 


const findData = async (req, res) => {
    try {  
        const data=await fileModel.find();
        res.send(data);
    }catch(err){
        console.log(err);
    }
}


module.exports = findData;