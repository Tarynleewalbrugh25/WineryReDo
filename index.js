import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import { config } from 'dotenv';
import { userRouter } from './controller/UserController.js';
import { productRouter } from './controller/ProductController.js';
import { supplierRouter } from './controller/SupplierController.js';
import { errorHandling } from './middleware/ErrorHandling.js';

config(); // Load environment variables

const app = express();
const port = +process.env.PORT || 1000;

// Middleware setup
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});

app.use(
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended: true,
    }),
    cookieParser(), // Use cookie-parser middleware
    cors()
);

app.get('^/$|/BellaItalia', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/index.html'));
});

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/supplier', supplierRouter);
app.use(errorHandling);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
