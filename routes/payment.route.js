const express = require('express');
const router = express.Router();

const Stripe = require('stripe')('sk_test_51PKyZHIsdYrHJ88Z8E4XZIS2vQWgd1u3YA7kqRzwySrhJiUzc14DePzJWChpO3mNTDXDgMqoMovhlsAqDQ73ty0G00LA8VDaIx');

router.post('/', async (req, res) => { 
  
    try {
        const session = await Stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: req.body.cartItems.map(item => {
           
            return {
              price_data: {
                currency: "TND",
                product_data: {
                  name: item.designation,
                },
                unit_amount: item.prix*100,
              },
              quantity: item.cartQuantity,
            }
          }),
          success_url: `${process.env.CLIENT_URL}`,
          cancel_url: `${process.env.CLIENT_URL}`,
        })
          res.json({ sessionId: session.id })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
  });

module.exports = router;
