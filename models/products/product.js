const mongoose = require('mongoose')
const validator = require('validator')

const productSchema = new mongoose.Schema({
    productCode:{
        type:String,
        required: true
    },
    productName:{
        type:String,
        required: true
    },
    description:{
        type: Sequelize.TEXT,
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
    }
})

const Product = mongoose.model('Product',productSchema)
module.exports = Product;