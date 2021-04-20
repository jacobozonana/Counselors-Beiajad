import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

function Stripe(props) {
const stripePromise = loadStripe(
  "pk_test_51Igu4wGzcAtJfG2jEuOZrsw0aDN0inDpktv8angrEEHB7YrqjQoqjyUvrI1oipzZGneTvBs7G9xRZYZSe3vff4s900MPYqkp8o"
);

  const [message, setMessage] = useState("");
  const [item, setItem] = useState(props.item);
  const [amount, setAmount] = useState(props.amount);
  const [quantity, setQuantity] = useState(props.quantity);

  const ProductDisplay = ({ handleClick }) => (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>{item}</h3>
          <h5>{amount}</h5>
        </div>
      </div>
      <button
        type="button"
        id="checkout-button"
        role="link"
        onClick={handleClick}
      >
        Checkout
      </button>
    </section>
  );
  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
      console.log(item)
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleClick = async (event) => {
    var datetokeep = { 
      type: props.type,
      date: props.date,
      time: props.time,
      note: props.note,
      user: props.user,
      doctor: props.doctor, 
    };
    localStorage.setItem("datetokeep", JSON.stringify(datetokeep));
    const stripe = await stripePromise;
    const response = await fetch(
      "http://localhost:8000/api/v1/create-checkout-session/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          quantity,
          item,
        }),
      }
    );
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

 
   

  return message ? (
    <>
      <div className="product">
        {/* <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        /> */}
        <div className="description">
          <h3>{item}</h3>
          <h5>{amount}</h5>
        </div>
      </div>
      <Message message={message} />
      <button id="checkout-button">Checkout</button>
    </>
  ) : (
    <ProductDisplay handleClick={handleClick} />
  );
}

export default Stripe;
