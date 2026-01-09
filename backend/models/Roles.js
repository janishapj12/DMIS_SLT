const mongoose =require ('mongoose');
const { v4: uuidv4 } = require('uuid');

const roleSchema =new mongoose.Schema({
    _id:{
        type:String,
        default:uuidv4,
    },
    name:{
        type:String,
        required:true
    },
    description: {type:String},
    permissions:{
        type:Array,
        required:true,
    },
    is_system_role:{
        type:Boolean,
        default:false,
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model('Role',roleSchema);