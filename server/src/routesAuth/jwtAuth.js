const router = require("express").Router();
// add bcrypt
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");
const Admin = require("../models/Admin");
const Client = require("../models/Client");
//register

// neet to be admin to make another admin
router.post("/registerAdmin", validInfo, async (req, res, next) => {
  // TODO - needs checkScope
  try {
    //1. destructure the req.body (name, email, password)
    const { name, email, password } = req.body;

    //2. check if the user exists (if user exists then throw error)

    const user = await Admin.findOne({ user_email: email });

    if (user) {
      return res.status(401).send("User already exists");
    }
    //3. hash the password with argon2
    // DO NOT remove the hashing feature, in the future I wil make a master password that can add and remove users
    //this is for business's so they can issue passwords to employees.
    const hash = bcrypt.hashSync(password, 12);

    //4. enter the user into the database
    const newAdmin = new Admin({
      admin_name: name,
      admin_email: email,
      admin_password: hash,
    });

    const savedUser = await newAdmin.save();
    // The user was saved successfully
    // `savedUser` is the user document that was saved to the database
    // You can continue with your logic here
    if (!savedUser) {
      return res.status(401).send({ message: "Something went wrong" });
    }
    //5. generate the jwt token
    const token = jwtGenerator(savedUser._id); // TODO - ?need to generate an new JWT token here
    res.json({ token });
  } catch (err) {
    next(err);
  }
});
//register a Client


// signup for new client email password

router.post("/signup", validInfo, async (req, res, next) => {
  try {
    //1. destructure the req.body (name, email, password)
    const { email, password } = req.body;

    //2. check if the user exists

    const user = await Client.findOne({ client_email: email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email not accepted, contact admin" });
    }
    //3. check if used already has password
    if (user.client_password) {
      return res
        .status(401)
        .json({ message: "Password already set for this email" });
    }
    //4. hash the password with argon2

    const hash = bcrypt.hashSync(password, 12);
    console.log(hash);
    //5. enter the user into the database
    const savedUser = await Client.findByIdAndUpdate(
      user._id,
      { client_password: hash },
      { new: true }
    );

    if (!savedUser) {
      throw new Error("Something went wrong");
    }
    console.log(savedUser);
    //5. generate the jwt token
    const token = jwtGenerator(savedUser._id); // TODO - ?need to generate an new JWT token here
    const data = { isAuthenticated: true, isAdmin: false, token };
    res.json(data);
  } catch (err) {
    next(err);
  }
});
// login route
router.post("/login", validInfo, async (req, res, next) => {
  try {
    //1. destructure req.body
    const { email, password } = req.body;
    // console.log(email, password);
    //2. check if user does not exist (if not then throw error)
    const client = await Client.findOne({ client_email: email });
    // console.log(client);
    if (client) {
      const validPassword = await bcrypt.compare(
        password,
        client.client_password
      );
      if (!validPassword) {
        return res
          .status(401)
          .json({ message: "Password or Email is incorrect" });
      } else {
        const token = jwtGenerator(client._id);
        const data = { isAuthenticated: true, isAdmin: false, token };
        return res.json(data);
      }
    }

    const admin = await Admin.findOne({ admin_email: email });

    if (admin) {
      const validPassword = await bcrypt.compare(
        password,
        admin.admin_password
      );
      if (!validPassword) {
        return res
          .status(401)
          .json({ message: "Password or Email is incorrect" });
      } else {
        const token = jwtGenerator(admin._id);
        const data = { isAuthenticated: true, isAdmin: true, token };
        return res.json(data);
      }
    }

    return res.status(401).json({ message: "Not authorized" });
  } catch (err) {
    next(err);
  }
});

//bypass login if token exists
router.get("/is-verify", authorization, async (req, res, next) => {
  try {
    const data = { isAuthenticated: true, isAdmin: false };
    // console.log(req.user);
    const admin = await Admin.findById(req.user);
    // console.log(admin);
    if (admin) {
      data.isAdmin = true;
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
