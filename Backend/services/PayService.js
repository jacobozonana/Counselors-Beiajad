const stripe = require("stripe")(
  "sk_test_51Igu4wGzcAtJfG2jyXDAHqWt3wGhWPz8s5gAK3V0zI9idIWKtff1uTI9ugWWaLPTawEDJugvcXR9SaP3XWEhnjsw008EL10EFg"
);
const express = require("express");
const app = express();
app.use(express.static("."));

const YOUR_DOMAIN = "http://localhost:8000/";

module.exports = {
  pay: async (req, res) => {
      const { amount, quantity } = req.body;
      console.log(quantity)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: "Consulta para el dia .....",
              images: ["https://i.imgur.com/EHyR2nP.png"],
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    res.json({ id: session.id });
  },
};
