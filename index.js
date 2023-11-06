import {startStandaloneServer} from '@apollo/server/standalone';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { ApolloServer } from '@apollo/server';

import ProductsAPI from './graphql_product.js';

const typeDefs = `#graphql
type Product {
    ProductId: String,
    ProductName: String,
    Manufacturer: String,
    Description: String,
    Price: Int
}

input ProductInput {
    ProductId: String,
    ProductName: String,
    Manufacturer: String,
    Description: String,
    Price: Int
}

  type Query {
    getProducts: [Product]
    getProductById(id:String):Product
  },

  type Mutation {
    addProduct(product:ProductInput):Product
    updateProduct(id:String, product:ProductInput):Product
    deleteProduct(id:String): String
  }
`;

/* Defining Resolver */
const resolvers={
    Query:{
     getProducts:async (_,__,{dataSources},info)=>{
        return dataSources.productsAPI.getProducts();
     },
     getProductById: async (_,args,{dataSources}, info)=>{
        const result =  await dataSources.productsAPI.getProduct(args.id);
        console.log(`In index = ${JSON.stringify(result)}`);
        return result;
     }
    },
    Mutation: {
     addProduct:async (_, args, {dataSources}, info)=>{
       const input = {
        ProductId: args.product.ProductId,
        ProductName: args.product.ProductName,
        Manufacturer: args.product.Manufacturer,
        Description: args.product.Description,
        Price: args.product.Price
      };
      const addResult =  await dataSources.productsAPI.createProduct(input);
      return addResult;
     },

     updateProduct:async (_, args, {dataSources}, info)=>{
      const input = {
       ProductId: args.product.ProductId,
       ProductName: args.product.ProductName,
       Manufacturer: args.product.Manufacturer,
       Description: args.product.Description,
       Price: args.product.Price
     };
     const updateResult =  await dataSources.productsAPI.updateProduct(args.id, input);
     return updateResult;
    },
    deleteProduct:async(_, args, {dataSources}, info)=>{
      const deleteResult =  await dataSources.productsAPI.deleteProduct(args.id);
      return deleteResult;
    }
  } 
 }

 const server = new ApolloServer({
    typeDefs,
    resolvers
});  

 /* Defining the Standalone Server */

 const {url} = await startStandaloneServer(server,{
    context: ({req})=>{
        const {cache} = server;
        return {
            dataSources: {
                productsAPI: new ProductsAPI({cache})
            },
        };
    }
 });

 console.log(`🚀  Server ready at ${url}`);