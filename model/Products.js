import { Connection as db } from "../config/index.js";
class Products {
    fetchProducts(req, res) {
        const qry = `
            SELECT prodID, prodName, prodAmount, prodQuantity, prodCat,prodBrand,prodURL
            FROM Products;
        `;
        db.query(qry, (err, results) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                results
            });
        });
    }
    fetchProduct(req, res) {
        const qry = `
           SELECT prodID, prodName, prodAmount, prodQuantity, prodCat,prodBrand, prodURL
           FROM Products;
           WHERE itemID = ?;
        `;
        db.query(qry, [req.params.id], (err, result) => {
            if (err) {
                console.error("Error fetching product:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            res.json({
                status: res.statusCode,
                result: result[0]
            });
        });
    }
    addProduct(req, res) {
        const qry = `
            INSERT INTO Products
            SET ?;
        `;
        db.query(qry, [req.body], (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: 'New Product added'
            });
        });
    }

    deleteProduct(req, res) {
        const prodID = req.params.id;
        if (!prodID) {
            return res.status(400).json({ msg: 'Product ID is required' });
        }
        const qry = `
            DELETE FROM Products
            WHERE prodID = ?
        `;
        db.query(qry, [prodID], (err) => {
            if (err) {
                console.error('Error deleting Product:', err);
                return res.status(500).json({ msg: 'Failed to delete Product' });
            }
            res.json({
                status: res.statusCode,
                msg: 'Product deleted'
            });
        });
    }
    updateProduct(req, res) {
        const qry = `
            UPDATE Products
            SET ?
            WHERE prodID = ${req.params.id};
        `;

        db.query(qry, [req.body], (err) => {
            if (err) {
                console.error('Error updating:', err);
                return res.status(500).json({ msg: 'Failed to update product' });
            }
            res.json({
                status: res.statusCode,
                msg: 'Product updated'
            });
        });
    }
}
export { Products };
























































































































