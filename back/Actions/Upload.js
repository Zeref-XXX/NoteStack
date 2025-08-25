const {fileModel} = require("../models/user"); 

const Upload = async (req, res) => {
    try { 
        const filedata=new fileModel(req.body);
        await filedata.save();

        res.status(201).json({ message: " Sign Up success", success: true })

    }catch(err){
        console.log(err);
    }
}

module.exports = Upload;