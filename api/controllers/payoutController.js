"use strict";

require("dotenv").config();

// Keys for Stripe
// const keySecret = process.env.SECRET_KEY;

const keySecret =
	"sk_test_51NkRaUSDgYl6hwSGqhpprbFImudV2lnbCXjFZgpntM6OkdQXUjzx5RahSSADEENQRUm8VIRBPdKT0HFfkm6MoMGO00vDj7ZpMJ";

// Stripe API
const stripe = require("stripe")(keySecret);

exports.list_all_payouts = async (req, res) => {
	let param = {
		limit: req.query.limit || 10,
	};
	await stripe.payouts.list(param, function (err, payouts) {
		if (err) {
			console.log(err);
			res("REQUEST ERROR");
		} else {
			res.json(payouts);
		}
	});
};

exports.create_a_payout = async (req, res) => {
	let param = {
		amount: req.body.amount,
		currency: req.body.curreny,
		destination: req.body.destination_id,
		description: req.body.description || "",
	};
	await stripe.payouts.create(param, (err, payout) => {
		if (err) {
			console.log(err);
			res("REQUEST ERROR");
		} else {
			res.json(payout);
		}
	});
};

exports.read_a_payout = async (req, res) => {
	let payoutID = req.params.payoutId;
	await stripe.payouts.retrieve(payoutID, function (err, payout) {
		if (err) {
			console.log(err);
			res("REQUEST ERROR");
		} else {
			res.json(payout);
		}
	});
};

exports.cancel_a_payout = async (req, res) => {
	let payoutID = req.params.payoutId;
	await stripe.payouts.cancel(payoutID, (err, payout) => {
		// asynchronously called
		if (err) {
			console.log(err);
			res("REQUEST ERROR");
		} else {
			res.json(payout);
		}
	});
};
