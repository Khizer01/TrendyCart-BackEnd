const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems, totalAmount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productId,
          },
          unit_amount: totalAmount, 
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve Session Data

router.get("/session/:id", async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
