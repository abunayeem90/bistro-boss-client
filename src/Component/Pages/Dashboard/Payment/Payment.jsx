import SectionTitle from "../../../SectionTitle/SectionTitle";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div>
            <SectionTitle heading={"Paymenr"} subHeading={"Please pay to eat"}></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;