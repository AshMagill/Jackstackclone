const express = require("express");
const router = require("express").Router();
const Client = require("../models/Client");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// TODO - add validation and autherisation to index.js

// Stripe webhook to confirm onboard of client to stripe

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res, next) => {
    console.log("buggy1");
    try {
      const sig = req.headers["stripe-signature"];
      let event;
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_KEY
        );
      } catch (err) {
        console.error(err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
      // Handle the event
      if (event.type === "account.updated") {
        console.log("buggy2");
        const account = event.data.object;
        const client = await Client.findOneAndUpdate(
          { stripe_account_id: account.id },
          {
            details_submitted: account.details_submitted ? true : false,
            payouts_enabled: account.payouts_enabled ? true : false,
            charges_enabled: account.charges_enabled ? true : false,
            onboarded:
              account.details_submitted &&
              account.payouts_enabled &&
              account.charges_enabled
                ? true
                : false,
          }
        );
        console.log("client", client);
      }
      res.json({ received: true });
    } catch (err) {
      next(err);
    }
  }
);

// app.post('/webhook', async (req, res) => {
//     const sig = req.headers['stripe-signature'];
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, 'your_stripe_webhook_secret');
//     } catch (err) {
//       console.error('Webhook error:', err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the event
//     if (event.type === 'account.updated') {
//       const account = event.data.object;
//       // Assuming you have a field in your Client model to store Stripe account information
//       const updatedClient = await Client.findOneAndUpdate({ stripeAccountId: account.id }, { $set: { stripeAccountInfo: account } }, { new: true });
//       console.log('Client updated:', updatedClient);
//     }

//     res.json({ received: true });
//   });

module.exports = router;
