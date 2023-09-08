"use strict";

require("dotenv").config();

// Keys for Stripe
// const keySecret = process.env.SECRET_KEY;
const keySecret =
	"sk_test_51NkRaUSDgYl6hwSGqhpprbFImudV2lnbCXjFZgpntM6OkdQXUjzx5RahSSADEENQRUm8VIRBPdKT0HFfkm6MoMGO00vDj7ZpMJ";

// Stripe API
const stripe = require("stripe")(keySecret);

//getUser
exports.list_all_users = async (req, res) => {
	let param = {
		limit: req.query.limit || 10,
	};

	await stripe.customers.list(param, (err, customers) => {
		if (err) {
			console.log(err);
			res.send("REQUEST ERROR");
		} else {
			res.json(customers);
		}
	});
};

//createUser
exports.create_a_user = async (req, res) => {
	await stripe.customers.create(req.body, (err, customers) => {
		if (err) {
			console.log("err--------->>", err);
			res.send("REQUEST ERROR");
		} else {
			res.json(customers);
			console.log("CUSTOMER--------", customers);
		}
	});
};

//findUser
exports.read_a_user = async (req, res) => {
	let userID = req.params.userId;

	await stripe.customers.retrieve(userID, (err, customer) => {
		// asynchronously called
		if (err) {
			console.log(err);
			res("REQUEST ERROR");
		} else {
			res.json(customer);
		}
	});
};

//updateUser
exports.update_a_user = async (req, res) => {
	let userID = req.params.userId;
	let param = {};
	if (req.body.account_balance) {
		param.balance = req.body.account_balance;
	}
	if (req.body.description) {
		param.description = req.body.description;
	}
	if (req.body.email) {
		param.email = req.body.email;
	}
	if (req.body.first_name) {
		param.metadata = param.metadata || {};
		param.metadata.first_name = req.body.first_name;
	}
	if (req.body.last_name) {
		param.metadata = param.metadata || {};
		param.metadata.last_name = req.body.last_name;
	}
	await stripe.customers.update(userID, param, (err, customer) => {
		// asynchronously called
		if (err) {
			console.log(err);
			res.send("REQUEST ERROR--->>", err);
		} else {
			res.json(customer);
		}
	});
};

//deleteUser
exports.delete_a_user = async (req, res) => {
	let userID = req.params.userId;
	const findUser = await stripe.customers.retrieve(userID);
	// console.log("----", findUser);

	if (findUser.deleted === false) {
		await stripe.customers.del(userID, (err, confirmation) => {
			// asynchronously called
			if (err) {
				console.log(err);
				res.send("REQUEST ERROR----", err);
			} else {
				// res.json(customer);
				res.send("delete successfully...");
			}
		});
	} else {
		res.send("User not found...");
	}
};
