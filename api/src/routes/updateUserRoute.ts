import express, {Request, response, Response, Router} from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import passport from 'passport';
import mongoose from 'mongoose';
import { UserInterface } from 'src/interface/UserInterface';
const UpdateRoute = Router();

UpdateRoute.delete('/remove-user', async (req: Request, res: Response) => {
    
    if(req.user){
        let {email, username, password} = req.body;
        let myEmail:string;
    
        User.findOne({email}, async (err: Error, userDoc: UserInterface) => {
            if(err) throw err;
            if(userDoc){
                bcrypt.compare(password, userDoc.password, (err, result) => {
                    if(err){
                        res.json({message: "wrong password"});
                    } 
                    if(result) {
                        myEmail = userDoc.email;
                        User.deleteOne({myEmail})
                            .then(() => res.json({message: "Remove User Successfully"}))
                            .catch(err => res.json(err));
                    } else {
                        res.json({message: "Password does not match"});
                    }
                    });
            }
        })
    }else{
        res.json({message: "You are unauthorized to do this"});
    }
});

UpdateRoute.patch('/')

export default UpdateRoute;