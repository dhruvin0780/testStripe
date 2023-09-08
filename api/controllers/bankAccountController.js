"use strict";

require("dotenv").config();

// Keys for Stripe
// const keySecret = process.env.SECRET_KEY;

const keySecret =
	"sk_test_51NkRaUSDgYl6hwSGqhpprbFImudV2lnbCXjFZgpntM6OkdQXUjzx5RahSSADEENQRUm8VIRBPdKT0HFfkm6MoMGO00vDj7ZpMJ";

// Stripe API
const stripe = require("stripe")(keySecret);

exports.list_all_bankAccounts = async (req, res) => {
	let user_id = req.query.userID;
	let param = {
		limit: req.query.limit || 10,
		object: "bank_account",
	};

	await stripe.customers.listSources(user_id, param, (err, bank_accounts) => {
		if (err) {
			console.log(err);
			res.send(`REQUEST ERROR---->>${err}`);
		} else {
			console.log("Bank Account------------------------", bank_accounts);
			res.json(bank_accounts);
		}
	});
};

//create account
exports.create_a_bankAccount = async (req, res) => {
	// console.log("-------", req.body);
	await stripe.tokens.create(
		{
			bank_account: {
				country: req.body.country,
				currency: req.body.currency,
				account_holder_name: req.body.account_holder_name,
				account_holder_type: req.body.account_holder_type,
				routing_number: req.body.routing_number,
				account_number: req.body.account_number,
			},
		},
		async (err, token) => {
			if (err) {
				console.log(err);
				res.send(`REQUEST ERROR---->>${err}`);
			} else {
				let userID = req.body.user_id;
				let param = {
					source: token.id,
				};

				//create source
				await stripe.customers.createSource(
					userID,
					param,
					async (err, bank_account) => {
						if (err) {
							console.log(err);
							res.send(`REQUEST ERROR---->>${err}`);
						} else {
							//verify account
							// await stripe.customers.verifySource(userID, bank_account.id, {
							// 	amounts: [32, 45],
							// });

							res.send(bank_account, token);
						}
					},
				);
			}
		},
	);
};
// stripe.customers.verifySource(
// 	"cus_OYc0fALDfYIESX",
// 	"ba_1NmbGiSDgYl6hwSGsJ3ycjYq",
// 	{
// 		amounts: [32, 45],
// 	},
// );

//get Acc By UserId And AccId
exports.read_a_bankAccount = async (req, res) => {
	let userID = req.body.user_id;
	let bankAccountID = req.body.bank_account_id;
	console.log("--------->>", userID, "----", bankAccountID);
	await stripe.customers.retrieveSource(
		userID,
		bankAccountID,
		(err, external_account) => {
			// asynchronously called
			console.log("------>>", external_account);
			if (err) {
				console.log(err);
				res.send(`REQUEST ERROR---->>${err}`);
			} else {
				res.send(external_account);
			}
		},
	);
};

//update-Acc
exports.update_a_bankAccount = async (req, res) => {
	let userID = req.body.user_id;
	let bankAccountID = req.body.bank_account_id;
	const { account_holder_type, account_holder_name } = req.body;
	const param = {
		account_holder_type: account_holder_type,
		account_holder_name: account_holder_name,
	};
	console.log("--", param);
	await stripe.customers.updateSource(
		userID,
		bankAccountID,
		param,
		async (err, bank_account) => {
			// asynchronously called
			if (err) {
				console.log(err);
				res.send(`REQUEST ERROR---->>${err}`);
			} else {
				res.json(bank_account);
			}
		},
	);
};

//delete-Acc
exports.delete_a_bankAccount = async (req, res) => {
	let userID = req.body.user_id;
	let bankAccountID = req.body.bank_account_id;
	await stripe.customers.deleteSource(
		userID,
		bankAccountID,
		async (err, confirmation) => {
			// asynchronously called
			if (err) {
				console.log(err);
				res("REQUEST ERROR");
			} else {
				res.json(confirmation);
			}
		},
	);
};
