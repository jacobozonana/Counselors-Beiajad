const stripe = require("stripe")(
  process.env.STRIPE_API_KEY
);
const express = require("express");
const app = express();
app.use(express.static("."));

const YOUR_DOMAIN = process.env.YOUR_DOMAIN

module.exports = {
  pay: async (req, res) => {
    const { body } = req;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: body.item,
              images: ["https://i.imgur.com/EHyR2nP.png"],
            },
            unit_amount: body.amount,
          },
          quantity: body.quantity,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    res.json({ id: session.id });
  },
};
