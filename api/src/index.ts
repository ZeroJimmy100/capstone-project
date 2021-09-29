import mongoose, {Error} from 'mongoose';
import express, {Request, Response} from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/userModel';
import { UserInterface } from './interface/UserInterface';
import routes from './routes/AllRoutes/routes';


dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const url:any = process.env.MONGO_DB_URL;
const local_url: any = process.env.URL_APP;
const mongodb_port:any = process.env.MONGO_DB_PORT;
const client_port:any = process.env.CLIENT_PORT;
// const key:any = process.env.SENDGRID_API_KEY;

// sgMail.setApiKey(key);

// mongoose.connect(url, { // <- old way
//     useCreateIndex: true,
//     useNewURLParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect(url, {},
    (err: Error) => {
        if(err) throw err;
        console.log("Connected to Mongo")
    }
);

// MiddleWare

const app = express();
app.use(express.json());
app.use(cors({origin: local_url+client_port, credentials: true}));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Passport 

passport.use(new LocalStrategy({usernameField: 'email', passwordField:'password'}, (email, password, done) => {
    User.findOne({email: email}, (err: any, user: any) => {
        if(err) throw err;
        if(!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if(err) throw err;
            if(result === true){
                return done(null, user);
            }else {
                return done(null, false);
            }
        });
    });
}));

passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id: string, cb) => {
    User.findOne({_id: id}, (err: Error, user: any) => {
        const userInformation:any = { 
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
            firstName: user.firstName,
            lastName: user.lastName
        };
        cb(err, userInformation);
    })
});

// Routes
app.use(routes); // new way to do routes

// app.post('/register', async (req: Request, res: Response) => { // <- old way (register route)
//     let {email, username, password} = req.body;
    
//     if(!email || !password || typeof email !== "string" || typeof password !== "string"){
//         res.send("improper values");
//         return;
//     }

//     User.findOne({email}, async (err: Error, userDoc: UserInterface) => {
//         if(err) throw err;
//         if(userDoc) res.json({message: "User already Exist"});
//         if(!userDoc){
//             const hashedPassword = await bcrypt.hash(password, 10);
//             const newUser = new User({
//                 username,
//                 email,
//                 password: hashedPassword
//             });
//             await newUser.save();
//             res.send("success");
//         }
//     })

    
// });

// Login Routes 
app.post("/login", function(req, res, next) {
    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err)
        }
        if(!user){
            return res.send({message: "Invalid Password or Email"});
        }
        req.logIn(user, function(err){
            if(err){
                return next(err);
            }
            return res.send({message: "Successfully Authenicated"});
        });
    })(req, res);
});

app.get("/user", (req, res) => {
    res.json({user: req.user});
});

// Logout Route 
app.get("/logout", (req, res) => {
    req.logout();
    res.send("Successfully Logout");
});

// Update User Route 
app.delete("/update/remove-user", async (req: Request, res: Response) => {
    // let {email: bodyEmail, username, password: bodyPassword} = req.body;
    let bodyEmail = req.body.email;
    let bodyPassword = req.body.password;
    let bodyUsername = req.body.username;

    let {email, username}: any = req.user
    if(req.user && email === bodyEmail){
        let myEmail:string;
        
        User.findOne({bodyEmail}, async (err: Error, userDoc: UserInterface) => {
            if(err) throw err;
            if(userDoc && bodyEmail === userDoc.email){
                bcrypt.compare(bodyPassword, userDoc.password, (err, result) => {
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
        res.status(404).send({message: "You are unauthorized to do this command"});
    }
});

app.patch("/update/update-user", async (req: Request, res: Response) => {
    if(req.user){

    } else {
        res.status(404).send({message: "You are unauthorized to do this command"})
    }
})

// app.patch('/update-username', (req, res) => {
//     let { username } = req.body;

// });

app.listen(mongodb_port, () => {
    console.log(`server started`);
})