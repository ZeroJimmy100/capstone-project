import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const PUB_KEY:any = process.env.REACT_APP_PUB_KEY 
const stripePromise = loadStripe(`${PUB_KEY}`);

export default function StripeContainer() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm/>
        </Elements>
    )
}
