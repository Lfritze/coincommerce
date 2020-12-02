// import our 'User' from the userSchema 
const User = require('../models/user');

// import the npm braintree package
const braintree = require('braintree');

require('dotenv').config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // this is for production
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

// this is based off of the docs here: https://developers.braintreepayments.com/reference/request/client-token/generate/node
exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, function(err, response) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce
  let amountFromTheClient = req.body.amount
  // charge
  let newTransaction = gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
      submitForSettlement: true
      }
    }, 
    (error, result) => {
      if(error) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};