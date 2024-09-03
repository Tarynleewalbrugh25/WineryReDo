import express from 'express'
import bodyParser from 'body-parser'
import { suppliers } from '../model/index.js'

const supplierRouter = express.Router()

//fetch all items
supplierRouter.get('/', (req, res)=>{
    try{
        suppliers.fetchSuppliers(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve a supplier'
        })
    } 
})
supplierRouter.get('/:id', (req, res) => {
    try {
        suppliers.fetchSuppliers(req, res); // Call fetchStock function to retrieve a single stock
    } catch (e) {
        console.error("Error fetching supplier:", e);
        res.status(500).json({
            status: res.statusCode,
            msg: 'Failed to get supplier'
        });
    }
});
supplierRouter.post('/addNew',bodyParser.json(),(req, res)=>{
    try{
        suppliers.addSupplier(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Failed to add new supplier'
        })
    }
})

supplierRouter.delete('/supplier/:id', (req, res) => {
    try {
        suppliers.deleteSupplier(req, res);
    } catch (e) {
        console.error('Error deleting supplier:', e);
        res.status(500).json({
            status: res.statusCode,
            msg: 'Failed to remove supplier. Please try again later.'
        });
    }
});

supplierRouter.patch('/supplier/:id', bodyParser.json(), (req, res)=>{
    try{
        suppliers.updateSupplier(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Failed to update supplier try again later'
        })
    }
})
export{
    supplierRouter
}