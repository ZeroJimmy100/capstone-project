import express, {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import mongoose from 'mongoose';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { UserInterface } from 'src/interface/UserInterface';


dotenv.config();
const sgMail = require('@sendgrid/mail');
const key:any = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(key);
const RegisterRoute = Router();

RegisterRoute.post('/', async (req: Request, res: Response) => {
    let {email, username, password, firstName, lastName} = req.body;
    
    if(!email || !password || typeof email !== "string" || typeof password !== "string"){
        res.send("improper values");
        return;
    }

    User.findOne({email}, async (err: Error, userDoc: UserInterface) => {
        if(err) throw err;
        if(userDoc){
            res.send({status: "error", message: "User already Exist"});
        }
        if(!userDoc){
            const cryptoKey = crypto.randomBytes(64).toString('hex');
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                emailToken: cryptoKey,
                isVerified: false,
                accountBalance: 0,
                listOfAddress: [],
                phoneNum: "",
                firstName,
                lastName
            });
            await newUser.save();

            const message = {
                to: email,
                from: "hr.lookup.mailer@gmail.com",
                subject: "Welcome To LookUp",
                text: `
                Hello new user, thank you for registering on our site,
                Please copy and paste the address below to verify your account,
                http://${req.headers.host}/register/verify-email?token=${cryptoKey}
                `,
                html: `
                    <h1>Hello new user</h1>
                    <p>Thanks for registering on our site.</p>
                    <p>Please click on the link below to verify your account.</p>
                    <button><a href="http://${req.headers.host}/register/verify-email?token=${cryptoKey}">Verify your account</a></button>
                `
            }
            sgMail.send(message)
                .then((emailResponse:Response) => console.log("Email sent..."))
                .catch((error:Error) => console.log(error.message));
            res.status(200).send({status:"success", message:"User has Successfully Created"});
        }
    })
})

RegisterRoute.get('/verify-email', async (req: Request, res: Response, next) => {
    try{
        const user = await User.findOneAndUpdate({emailToken: req.query.token}, {isVerified: true});
        if(!user){
            return res.redirect('http://localhost:3000');
        }
        await user.save()
        const newUser = await User.findOneAndUpdate({emailToken: req.query.token}, {emailToken: null});
        await newUser.save();
        await req.login(newUser, async (err) => {
            if(err) return next(err);
            res.redirect('http://localhost:3000');
        });
    } catch(error){
        console.log(error);
    }
})

export default RegisterRoute;