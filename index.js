const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const createCheckoutSession = require('./api/checkout');
const webhook = require('./api/webhook');

const app = express();
const port = 8080;

// We need the raw body to verify webhook signatures.
// Let's compute it only when hitting the Stripe webhook endpoint.
app.use(
  express.json({
    verify: (req, res, buffer) => (req['rawBody'] = buffer),
  }),
);
// cors module so react app can send request to node server
app.use(cors({ origin: true }));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/create-checkout-session', createCheckoutSession);

app.post('/webhook', webhook);

app.listen(port, () => console.log('server listening on port', port));
