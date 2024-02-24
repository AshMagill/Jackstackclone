const router = require("express").Router();
const Client = require("../models/Client");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// TODO - add validation and autherisation to index.js
// GET all clients
router.get("/clients", async (req, res, next) => {
  try {
    const clients = await Client.find({}, "_id client_email");
    res.json(clients);
  } catch (err) {
    next(err);
  }
});
// POST new CLient
router.post("/clients", async (req, res, next) => {
  try {
    const { email, country } = req.body;

    const account = await stripe.accounts.create({
      type: "express",
      email: email,
      country: country,
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true, // TODO - check if this is required
        },
      },
    });

    const newClient = new Client({
      client_email: email,
      client_country: country,
      stripe_account_id: account.id,
    });
    console.log(country);
    console.log(newClient);
    const savedClient = await newClient.save();
    console.log(savedClient);
    res.json(savedClient);
  } catch (err) {
    next(err);
  }
});

// TODO protect this route

// get a stripe connect account details
router.get("/clients/:id", async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    const clientObject = client.toObject();
    delete clientObject.stripe_account_id;
    res.json(clientObject);
  } catch (err) {
    next(err);
  }
});
// TODO protect this route
// delete a stripe connect account
router.delete("/clients/:id", async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      throw new Error("Client not found");
    }
    const account = await stripe.accounts.del(client.stripe_account_id);
    if (account.deleted === true) {
      await Client.findByIdAndDelete(client._id);
      res.json({ message: "Client deleted" });
    } else {
      throw new Error("Stripe account not deleted");
    }
  } catch (err) {
    next(err);
  }
});

// TODO verify client onboarded
// router.get("/onboard", async (req, res, next) => {
//   try {
//     const account = await stripe.accounts.retrieve(req.body.account);
//     console.log(account);
//     const client = await Client.findOne({ stripe_account_id: account.id });
//     console.log(client);
//     client.onboarded = true;
//     await client.save();
//     res.json(client);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
