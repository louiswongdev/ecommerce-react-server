const stripeAPI = require('../stripe');

function webhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(
      req['rawBody'],
      sig,
      process.env.WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log(`⚠️  Webhook signature verification failed.`);
    return res.status(400).send(`Webhook error ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log(`🔔  Payment received!`, session);
  }
}

module.exports = webhook;
