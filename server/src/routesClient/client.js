const router = require("express").Router();
const Project = require("../models/Project");
const Client = require("../models/Client");
const multer = require("multer");
const upload = multer();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// TODO - add validation and autherisation to index.js

// get Client info (once logged in)
router.get("/account", async (req, res, next) => {
  try {
    // all Client info is being returned, should not include password
    let clientData = await Client.findOne({ _id: req.user });

    clientData = clientData.toObject();

    // remove stipe_account_id from response
    delete clientData.stripe_account_id;

    res.json(clientData);
  } catch (err) {
    next(err);
  }
});
// Onboard Client to Stripe
router.post("/onboard", async (req, res, next) => {
  try {
    let clientData = await Client.findOne({ _id: req.user });
    console.log(clientData);
    clientData = clientData.toObject();
    const accountLink = await stripe.accountLinks.create({
      account: clientData.stripe_account_id,
      refresh_url: process.env.CLIENT_DOMAIN,
      return_url: process.env.CLIENT_DOMAIN,
      type: "account_onboarding",
    });
    res.json(accountLink);
  } catch (err) {
    next(err);
  }
});

// Stripe connect account dashboard link
router.post("/dashboard", async (req, res, next) => {
  try {
    let clientData = await Client.findOne({ _id: req.user });
    clientData = clientData.toObject();
    const accountLink = await stripe.accounts.createLoginLink(
      clientData.stripe_account_id
    );
    res.json(accountLink);
  } catch (err) {
    next(err);
  }
});
// // GET all clients
// router.get("/accounts", authorization, checkScope, async (req, res, next) => {
//   try {
//     const allClients = await Client.find();
//     res.json(allClients);
//   } catch (err) {
//     next(err);
//   }
// });
// // POST new CLient
// router.post("/accounts", authorization, checkScope, async (req, res, next) => {
//   try {
//     const { email, country } = req.body;

//     const account = await stripe.accounts.create({
//       type: "express",
//       email: email,
//       country: country,
//       capabilities: {
//         card_payments: {
//           requested: true,
//         },
//         transfers: {
//           requested: true, // TODO - check if this is required
//         },
//       },
//     });

//     const newClient = new Client({
//       client_email: email,
//       client_country: country,
//       stripe_account_id: account.id,
//     });
//     console.log(newClient);
//     const savedClient = await newClient.save();
//     console.log(savedClient);
//     res.json(savedClient);
//   } catch (err) {
//     next(err);
//   }
// });

// // get a stripe connect account details
// router.get("/accounts/:id", async (req, res, next) => {
//   try {
//     const account = await stripe.accounts.retrieve(req.params.id);
//     res.json(account);
//   } catch (err) {
//     next(err);
//   }
// });

// // delete a stripe connect account
// router.delete("/accounts/:id", async (req, res, next) => {
//   try {
//     const account = await stripe.accounts.del(req.params.id);
//     res.json(account);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
