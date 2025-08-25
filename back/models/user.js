
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verificationCode:{
        type:String,
    },
    isVerified: {
        type: Boolean,
        default: false
    }, 
}, { timestamps: true })

const dataSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    uploadedOn: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    id:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:String,
    }
})


const userModel = mongoose.model('users', userSchema);
const fileModel = mongoose.model('fileData', dataSchema);
module.exports ={ userModel,fileModel};
