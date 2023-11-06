import {RESTDataSource} from '@apollo/datasource-rest';

class ProductsAPI extends RESTDataSource {
     constructor(){
        super();
        this.baseURL =  "http://localhost:9078";
     }

     async getProduct(id){
        console.log(`in call id = ${id}`)
        const productPromise =  this.get(`/api/products/${id}`);
        return productPromise;
     } 

     async getProducts(){
        const productsPromise =   this.get(`/api/products`);
        return productsPromise;
     }
     async createProduct(product){
     
        const newProductPromise =  this.post('/api/products', {
            body:product
        });
        return newProductPromise;
     }

     async updateProduct(id,product){
        const updatedProductPromise =  this.put(`/api/products/${id}`, {
            body:product
        });
        return updatedProductPromise;
     }

     async deleteProduct(id){
        const deletedProductPromise = this.delete(`/api/products/${id}`);
        return deletedProductPromise;
     }
}

export default ProductsAPI;

