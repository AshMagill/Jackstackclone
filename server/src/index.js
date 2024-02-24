const mongoose = require("mongoose");
// dummy product routes
const products = require("./dummyData.json");
const authorization = require("./middleware/authorization");
const checkAdmin = require("./middleware/checkAdmin"); // TODO - ?needs auth and scope here
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Set up MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// // cors allowed urls are placed in the whitelist
// const whitelist = [process.env.CLIENT_DOMAIN, "https://hooks.stripe.com"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         // Allow the request to proceed without an error
//         callback(null, false);
//       }
//     },
//   })
// );

app.get("/products", (req, res) => {
  const { page, search, filters } = req.query;
  let filteredProducts = products.products;
  // Apply search filter
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.item_name.toLowerCase().includes(search.toLowerCase())
    );
  }
  // Apply filters
  if (filters) {
    const filterArray = JSON.parse(filters);
    filteredProducts = filteredProducts.filter((product) =>
      product.tags.some((tag) => filterArray.includes(tag))
    );
  }
  // Pagination
  const pageSize = 10; // Adjust this value according to your needs
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  res.json({
    products: paginatedProducts,
    totalProducts: filteredProducts.length,
    pageSize: pageSize,
  });
});

app.use(cors());

// webhook routes
app.use("/webhook", require("./routesWebhook/webhook"));

app.use(express.json()); //req.body

//ROUTES
//register and login routes
app.use("/auth", require("./routesAuth/jwtAuth"));

//admin routes
app.use("/admin", authorization, checkAdmin, require("./routesAdmin/admin"));

// //client routes
app.use("/client", authorization, require("./routesClient/client"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ message: err.message });
});

app.listen(process.env.SERVER_PORT || 5001, () => {
  console.log(`listening on port ${process.env.SERVER_PORT || 5001}`);
});
