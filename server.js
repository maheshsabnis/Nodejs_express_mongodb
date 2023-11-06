import express from 'express';
import DataAccess from './dataaccess.js';

const app = express();

const da = new DataAccess();

const port  = process.env.PORT || 9078;

app.use(express.json());

app.get('/api/products', da.getProducts);

app.get('/api/products/:id', da.getProduct);

app.post('/api/products', da.createProduct);

app.put('/api/products/:id',da.updateProduct);

app.delete('/api/products/:id', da.deleteProduct);


app.listen(port, ()=>{
    console.log(`Server Started on PORT ${port}`);
});