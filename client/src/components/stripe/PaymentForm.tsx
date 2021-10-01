import React, {useState} from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import './css/paymentForm.css';

interface PaymentInterface{
    type: any,
    card: any
}

const payment_url:any = process.env.REACT_APP_PAYMENT; 

const CARD_OPTIONS: any = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess] = useState<boolean>(false);
    const stripe = useStripe();
    const elements = useElements();
    const cardElement:any = elements?.getElement(CardElement);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const {error, paymentMethod}: any = await stripe?.createPaymentMethod({
            type: 'card',
            card: cardElement
        });
        if(!error){
            try{
                const {id} = paymentMethod;
                const response = await axios.post(payment_url, {
                    amount: 1000,
                    id: id,
                });

                if(response.data.success){
                    console.log("Successful Payment");
                    setSuccess(true);
                }
            } catch(err) {
                console.log("Error", err);
            }
        } else {
            console.log(error.message);
        }
    };

    return (
        <div className="itemPayBox">
        {!success ? 
        <div className="paypayBox">
            <h3>Purchasing Hoodie</h3>
            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                </fieldset>
                <button className="pay-btn">Pay</button>
            </form>
        </div>
        : 
        <div className="itemPayBox">
            <div className="textPaymentBox">
                <h2>Congraduation! You just bought a hoodie</h2>
            </div>
        </div>    
        }
        </div>
    )
}
