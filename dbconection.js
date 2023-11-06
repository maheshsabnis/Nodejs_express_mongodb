import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/productsdb", {
    useNewUrlParser:true
});

const productSchema = new mongoose.Schema({
    ProductId:{
        type: String
    },
    ProductName:{
        type: String
    },
    Manufacturer:{
        type: String
    },
    Description:{
        type: String
    },
    Price:{
        type: Number
    }
});

const Products = mongoose.model('productsdb',productSchema);

export {Products}