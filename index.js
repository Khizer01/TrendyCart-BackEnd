const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

dotenv.config();

const options = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connect = async () => {
  try{
  await mongoose.connect(process.env.MONGO_URI, options);
  console.log('Connected to DB');
  }
  catch(err){
    console.log(err);
  };
}
  connect();

  app.use(express.json());
  app.use(cors());
  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/product", productRoute);
  app.use("/api/cart", cartRoute);
  app.use("/api/order", orderRoute);
  app.use("/api/checkout", stripeRoute);
  
  const PORT  = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})