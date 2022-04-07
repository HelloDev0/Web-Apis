const mongoose = require('mongoose');
const schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    user: {
        type: schema.Types.ObjectId, ref: "User",
        required: true,
    },
    product: [{
        type: schema.Types.ObjectId, ref: "Product",
        required: true,
    }],
    quantity:Number
})
module.exports = mongoose.model('Cart', userSchema);
