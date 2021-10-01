import Stripe from 'stripe';
import express, {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const StripeRoute = Router();
const STRIPE_KEY:any = process.env.STRIPE_KEY;
const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: '2020-08-27'
});

// StripeRoute.post('/payment', )