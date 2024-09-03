import { Connection as db } from "../config/index.js";
class Suppliers {
    fetchSuppliers(req, res) {
        const qry = `
           SELECT suppID,suppName,suppAdd,suppCon 
           FROM Suppliers
        `;
        db.query(qry, (err, results) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                results
            });
        });
    }
    fetchSupplier(req, res) {
        const qry = `
           SELECT suppID,suppName,suppAdd,suppCon 
           FROM Suppliers
           WHERE suppID = ?;
        `;
        db.query(qry, [req.params.id], (err, result) => {
            if (err) {
                console.error("Error fetching supplier:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ error: "supplier not found" });
                return;
            }
            res.json({
                status: res.statusCode,
                result: result[0]
            });
        });
    }


    addSupplier(req, res) {
        const qry = `
            INSERT INTO Suppliers
            SET ?;
        `;
        db.query(qry, [req.body], (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: 'New supplier added'
            });
        });
    }

    deleteSupplier(req, res) {
        const suppID = req.params.id;
        if (!suppID) {
            return res.status(400).json({ msg: 'supplier ID is required' });
        }
        const qry = `
            DELETE FROM Stocks
            WHERE suppID = ?
        `;
        db.query(qry, [suppID], (err) => {
            if (err) {
                console.error('Error deleting supplier:', err);
                return res.status(500).json({ msg: 'Failed to delete supplier' });
            }
            res.json({
                status: res.statusCode,
                msg: 'supplier deleted'
            });
        });
    }
    updateSupplier(req, res) {
        const qry = `
            UPDATE Suppliers
            SET ?
            WHERE suppID = ${req.params.id};
        `;

        db.query(qry, [req.body], (err) => {
            if (err) {
                console.error('Error updating:', err);
                return res.status(500).json({ msg: 'Failed to update supplier' });
            }
            res.json({
                status: res.statusCode,
                msg: 'supplier updated'
            });
        });
    }
}
export { Suppliers };