import { Connection as db } from "../config/index.js"       
import {hash, compare} from 'bcrypt'                       
import { createToken } from "../middleware/AuthenticateUser.js"   
class Users{   
    fetchUsers(req, res) {           
        const qry = `                
        SELECT userID, firstName, lastName, gender, emailAdd, userPwd, userRole
        FROM Users;  
        `                                   
        db.query(qry, (err, results)=>{
            if(err) throw err               
            res.json({                     
                status: res.statusCode,
                results                       
            })
        })
    }
    fetchUser(req, res) {          
        const qry = ` 
        SELECT userID, firstName, lastName, gender, emailAdd, userPwd, userRole               
        FROM Users
        WHERE userID = ${req.params.id};  
        `                                    
        db.query(qry, (err, result)=>{
            if(err) throw err              
            res.json({                     
                status: res.statusCode,
                result                      
            })
        })
    }
    async createUser(req, res) {
        // Payload
        let data = req.body
        data.userPwd = await hash(data?.userPwd, 8)
        let user = {
            emailAdd: data.emailAdd,
            userPwd: data.userPwd
        }
        const qry = `
        INSERT INTO Users
        SET ?;
        `     
        db.query(qry, [data], (err)=>{
            if(err) {
                res.json({
                    status: res.statusCode,
                    msg: 'This email address already exist'
                })
            }else {
                // Create a token
                let token = createToken(user)
                res.json({
                    status: res.statusCode,
                    token,
                    msg: 'You\'re registered'
                })
            }
        })   
    }
    
    deleteUser(req, res) {
        const userID = req.params.id;
        if (!userID) {
            return res.status(400).json({ msg: 'User ID is required' });
        }
        const qry = `
            DELETE FROM Users
            WHERE userID = ?;
        `;
        db.query(qry, [userID], (err) => {
            if (err) {
                console.error('Error deleting User:', err);
                return res.status(500).json({ msg: 'Failed to delete User' });
            }
            res.json({
                status: res.statusCode,
                msg: 'User deleted'
            });
        });
    }
    login(req, res) {
        const { emailAdd, userPwd } = req.body;
        const qry = `
            SELECT userID, firstName, lastName, gender, emailAdd, userPwd, userRole
            FROM Users
            WHERE emailAdd = '${emailAdd}';
            `;
        db.query(qry, async (err, result) => {
            if (err) throw err;
            if (!result?.length) {
                res.json({
                    status: res.statusCode,
                    msg: 'wrong email address'
                });
            } else {
                //validate password
                const validPass = await compare(userPwd, result[0].userPwd);
                if (validPass) {
                    const token = createToken({
                        emailAdd,
                        userPwd
                    });
                    res.json({
                        status: res.statusCode,
                        msg: 'you are logged in',
                        token,
                        result: result[0]
                    });
                } else {
                    res.json({
                        status: res.statusCode,
                        msg: 'Please provide the correct password.'
                    });
                }
            }
        });
    }
    
    updateUser(req, res) {
        const qry = `
            UPDATE Users
            SET ?
            WHERE userID = ?;
        `;
        const { userID } = req.body;
        db.query(qry, [req.body, userID], (err) => {
            if (err) {
                console.error('Error updating:', err);
                return res.status(500).json({ msg: 'Failed to update User' });
            }
            res.json({
                status: res.statusCode,
                msg: 'User  updated'
            });
        });
    }
}
export {
    Users
}