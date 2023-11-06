import { Products } from "./dbconection.js";
 
export default class DataAccess {
    constructor(){

    }
     getProducts=async(req,resp)=>{
        const query = Products.find({}); 
        const products = await query.exec();
        resp.send( 
            products
         );
    }
    getProduct=async(req,resp)=>{
        console.log(`in API id = ${req.params.id}`);
        const id = req.params.id; 
        const product = await Products.find({_id:id});  
        resp.send( 
            product[0]
           );
    }
    createProduct=async(req,resp)=>{
         
        const product = {
            ProductId:req.body.ProductId,
            ProductName:req.body.ProductName,
            Manufacturer:req.body.Manufacturer,
            Description:req.body.Description,
            Price:parseInt(req.body.Price)
        };
        const result = await Products.create(product);
        resp.send( 
            result
        );
    }
    updateProduct=async(req,resp)=>{
        
        const id = req.params.id; 
        const product = {
            ProductId:req.body.ProductId,
            ProductName:req.body.ProductName,
            Manufacturer:req.body.Manufacturer,
            Description:req.body.Description,
            Price:parseInt(req.body.Price)
        };
        const result = await Products.findByIdAndUpdate({_id:id},product, {new:true});
        resp.send( result
          );
    }

    deleteProduct=async(req,resp)=>{
        const id = req.params.id; 
        console.log(`in rest delete id = ${id}`);
        const res =  await Products.findOneAndRemove({_id:id});
        resp.send(res
          );
    };

};