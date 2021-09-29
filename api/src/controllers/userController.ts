import User from '../models/userModel';
import express, {Response, Request} from 'express';

module.exports.createUser = (request: Request, response: Response) => {
    const {email, password} = request.body;
    User.create({
        email,
        password
    })
        .then(user => response.json(user))
        .catch(err => response.status(400).json(err));
}