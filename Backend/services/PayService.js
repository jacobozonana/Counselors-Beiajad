const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

module.exports = {
  pay: async (request, response) => {
    const { body } = request;
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
      metadata: body.datetopay,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    response.json({ id: session.id });
  },
  whook: (request, response) => {
    const event = request.body;
    const { ScheduleController } = require("../controllers");
    const { ScheduleValidator } = require("../validators");
    switch (event.type) {
      case "checkout.session.completed":
        ScheduleValidator.create,
          ScheduleController.paytocreate(event.data.object.metadata);
        break;
    }
    response.send();
  },
};
