"use strict";

require("dotenv").config();

// Keys for Stripe
// const keySecret = process.env.SECRET_KEY;

const keySecret =
	"sk_test_51NkRaUSDgYl6hwSGqhpprbFImudV2lnbCXjFZgpntM6OkdQXUjzx5RahSSADEENQRUm8VIRBPdKT0HFfkm6MoMGO00vDj7ZpMJ";

// Stripe API
const stripe = require("stripe")(keySecret);

exports.list_all_balances = function (req, res) {
	stripe.balance.retrieve(function (err, transactions) {
		// asynchronously called
		if (err) {
			console.log(err);
			res.send("REQUEST ERROR");
		} else {
			res.json(transactions);
		}
	});
};
