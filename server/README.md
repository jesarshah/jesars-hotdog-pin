# Accepting a payment for Jesar's HotDogPin Inc

An [Express server](http://expressjs.com) implementation

## Requirements

- Node v10+
- [Configured .env file](../README.md)

## Configure the .env file

To run this successfully locally, set up the correct public and secret keys in your `.env` file. 

Then, get your webhook signing secret by running (this requires downloading the Stripe CLI):

```
stripe listen --forward-to localhost:4242/webhook
```

Copy the webhook signing secret to the `.env`. 

## Instructions to run

Keep one terminal open with the webhook forward to localhost port and open a new one [like here](https://github.com/stripe/stripe-cli), typing in the following commands: 

```
npm install
npm start
```
