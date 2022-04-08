const mongoose= require('mongoose');
const schema=mongoose.Schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:200
    },
    image:{
        type: String,
        required:true,
        
    },
    price:{
        required:true,
        type:Number
    },
    category:{
        type:schema.Types.ObjectId,
        ref:"Category",
        
    }
})
module.exports=mongoose.model('Product',userSchema);