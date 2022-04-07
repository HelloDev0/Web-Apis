const mongoose= require('mongoose');
const schema=mongoose.Schema
const userSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true,
        min:6,
        max:200
    },
    product:[{
        type:schema.Types.ObjectId,ref:"Product",
        required:true,

    }]
})
module.exports=mongoose.model('Category',userSchema);
