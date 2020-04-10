# Accepting a card payment for Jesar's Hotdog Pin Inc. 

A simple, locally hosted site that allows a customer to purchase one hotdog pin for $12. 

## How to run locally

This project is implemented using Node.js with webhooks.

Follow the steps below to run locally.

**1. Clone and configure the project**

```
git clone https://github.com/jesarshah/jesars-hotdog-pin
```

**Using the Stripe CLI**

If you haven't already installed the CLI, follow the [installation steps](https://github.com/stripe/stripe-cli#installation) in the project README. The CLI is useful for locally testing webhooks and Stripe integrations.

You will need a Stripe account in order to run the demo. Once you set up your account, go to the Stripe [developer dashboard](https://stripe.com/docs/development#api-keys) to find your API keys.

```
STRIPE_PUBLISHABLE_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
```

`STATIC_DIR` tells the server where the client files are located and does not need to be modified unless you move the server files.

**2. Follow the server instructions on how to run:**

```
cd server # there's a README in this folder with instructions
npm install
npm start
```

**3. Run a webhook locally:**

To test the integration with a local webhook on your machine, you can use the Stripe CLI to easily spin one up.

First [install the CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#link-account).

```
stripe listen --forward-to localhost:4242/webhook
```

The CLI will print a webhook secret key to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your .env file.

You should see events logged in the console where the CLI is running.


## Author(s)

[@jesarhshah](https://twitter.com/jesarshah)
