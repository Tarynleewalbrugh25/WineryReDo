import express from 'express'
import bodyParser from 'body-parser'
import { products } from '../model/index.js'

const productRouter = express.Router()

//fetch all items
productRouter.get('/', (req, res)=>{
    try{
        products.fetchProducts(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve a product'
        })
    } 
})
productRouter.get('/:id', (req, res) => {
    try {
        products.fetchProducts(req, res); // Call fetchStock function to retrieve a single stock
    } catch (e) {
        console.error("Error fetching product:", e);
        res.status(500).json({
            status: res.statusCode,
            msg: 'Failed to get product'
        });
    }
});
productRouter.post('/add', bodyParser.json(),(req, res)=>{
    try{
        products.addProduct(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Failed to add new product'
        })
    }
})

productRouter.delete('/product/:id',bodyParser.json(), (req, res) => {
    try {
        products.deleteProduct(req, res);
    } catch (e) {
        console.error('Error deleting product:', e);
        res.status(500).json({
            status: res.statusCode,
            msg: 'Failed to remove product. Please try again later.'
        });
    }
});

productRouter.patch('/product/:id', bodyParser.json(), (req, res)=>{
    try{
        products.updateProduct(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Failed to update product try again later'
        })
    }
})
export{
    productRouter
}