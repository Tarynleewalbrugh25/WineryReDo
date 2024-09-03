import express from 'express';
import bodyParser from 'body-parser';
import { users } from '../model/index.js';
import { verifyAToken } from '../middleware/AuthenticateUser.js';
const userRouter = express.Router();
// Fetch users
userRouter.get('/', (req, res) => {
    try {
        users.fetchUsers(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve users'
        });
    }
});
// Fetch user
userRouter.get('/:id', (req, res) => {
    try {
        users.fetchUser(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve user'
        });
    }
});
// Add a user
userRouter.post('/signup', bodyParser.json(), (req, res) => {
    try {
        users.createUser(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to create user'
        });
    }
});
// Delete a user
userRouter.delete('/user/:id', bodyParser.json(), (req, res) => {
    try {
        users.deleteUser(req, res); // Changed from products to users
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to remove user, try again later'
        });
    }
});
// Update a user
userRouter.patch('/user/:id', bodyParser.json(), (req, res) => {
    try {
        users.updateUser(req, res); // Changed from products to users
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to update user, try again later'
        });
    }
});
userRouter.post('/login', bodyParser.json(), (req, res)=>{
    try{
        users.login(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'failed to log in'
        })
    }
})
export { userRouter, express };