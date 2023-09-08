"use strict";

require("dotenv").config();

// Keys for Stripe
// const keySecret = process.env.SECRET_KEY;

const keySecret =
	"sk_test_51NkRaUSDgYl6hwSGqhpprbFImudV2lnbCXjFZgpntM6OkdQXUjzx5RahSSADEENQRUm8VIRBPdKT0HFfkm6MoMGO00vDj7ZpMJ";

// Stripe API
const stripe = require("stripe")(keySecret);

//getting payment
exports.list_all_payments = async (req, res) => {
	let param = {
		limit: req.query.limit || 10,
	};
	await stripe.charges.list(param, async (err, charges) => {
		if (err) {
			console.log(err);
			res.send(`REQUEST ERROR---->>${err}`);
		} else {
			res.json(charges);
		}
	});
};

//create charge
// exports.create_a_payment = async (req, res) => {
// 	//create a token
// 	const createToken = await stripe.tokens.create(
// 		{
// 			bank_account: {
// 				country: req.body.source.country,
// 				currency: req.body.source.currency,
// 				account_holder_name: req.body.source.account_holder_name,
// 				account_holder_type: req.body.source.account_holder_type,
// 				routing_number: req.body.source.routing_number,
// 				account_number: req.body.source.account_number,
// 			},
// 		},
// 		async (err, token) => {
// 			if (err) {
// 				console.log(err);
// 				res.send(`DURING TOKEN CREATING ERROR---->>${err}`);
// 			} else {
// 				const userID = req.body.customer_id;
// 				await console.log("----->.", token);
// 				//create source
// 				await stripe.customers.createSource(
// 					userID,
// 					{ source: token.id },
// 					async (err, card) => {
// 						if (err) {
// 							console.error("Error linking payment source to customer:", err);
// 						} else {
// 							// Payment source has been linked to the customer.
// 							console.log(
// 								"Payment source has been linked to the customer====>>",
// 								card,
// 							);

// 							//verify the account
// 							await stripe.customers.verifySource(
// 								userID,
// 								token.bank_account.id,
// 								{
// 									amounts: [32, 45],
// 								},
// 								async (err, result) => {
// 									if (err) {
// 										console.log(err);
// 										res.send(`DURING PAYMENT VERIFYNG ERROR---->>${err}`);
// 									} else {
// 										console.log("Payment source verified:===>>", result);
// 										// You can now proceed with creating the payment.

// 										//create charges
// 										await stripe.charges.create(
// 											{
// 												amount: req.body.amount,
// 												currency: req.body.currency,
// 												source: token.id,
// 												// customer: userID,
// 											},
// 											(err, charge) => {
// 												if (err) {
// 													console.log(err);
// 													res.send(`DURING CHARGE CREATING ERROR---->>${err}`);
// 												} else {
// 													res.json(charge);
// 												}
// 											},
// 										);
// 									}
// 								},
// 							);
// 						}
// 					},
// 				);
// 			}
// 		},
// 	);
// };

// exports.create_a_payment = async (req, res) => {
// 	const userID = req.body.customer_id;

// 	// Create a new token specifically for the charge
// 	const chargeToken = await stripe.tokens.create({
// 		bank_account: {
// 			country: req.body.source.country,
// 			currency: req.body.source.currency,
// 			account_holder_name: req.body.source.account_holder_name,
// 			account_holder_type: req.body.source.account_holder_type,
// 			routing_number: req.body.source.routing_number,
// 			account_number: req.body.source.account_number,
// 		},
// 	});
// 	console.log("Charge token=====>>", chargeToken);

// 	// Link the payment source (token) to the customer
// 	const linkedSource = await stripe.customers.createSource(userID, {
// 		source: chargeToken.id,
// 	});
// 	console.log("linkedSource====>>", linkedSource);

// 	const verifySource = await stripe.customers.verifySource(
// 		userID,
// 		linkedSource.id,
// 		{
// 			amounts: [32, 45],
// 		},
// 	);
// 	console.log("verifySource====>>", verifySource);

// 	// Create a charge using the new token
// 	try {
// 		const charge = await stripe.charges.create({
// 			amount: req.body.amount,
// 			currency: req.body.currency,
// 			source: chargeToken.id,
// 			customer: userID,
// 		});

// 		res.json(charge);
// 	} catch (err) {
// 		console.log(err);
// 		res.send(`DURING CHARGE CREATING ERROR---->>${err}`);
// 	}
// };
//Cascadia Code, Anonymous Pro, Noctis Viola,fira code
exports.create_a_payment = async (req, res) => {
	const userID = req.body.customer_id;
	try {
		// Create a new token specifically for the charge
		// const chargeToken = await stripe.tokens.create({
		// 	bank_account: {
		// 		country: req.body.source.country,
		// 		currency: req.body.source.currency,
		// 		account_holder_name: req.body.source.account_holder_name,
		// 		account_holder_type: req.body.source.account_holder_type,
		// 		routing_number: req.body.source.routing_number,
		// 		account_number: req.body.source.account_number,
		// 	},
		// });
		// console.log("Charge token=====>>", chargeToken);

		// Link the payment source (token) to the customer
		// const linkedSource = await stripe.customers.createSource(userID, {
		// 	source: chargeToken.id,
		// });

		// console.log("Linked Payment Source:", linkedSource);

		// Create a charge using the linked payment source
		// const charge = await stripe.charges.create({
		// 	amount: req.body.amount,
		// 	currency: req.body.currency,
		// 	source: linkedSource.id,
		// 	// customer: userID,
		// 	description: req.body.description,
		// });
		// res.json(charge);

		// Create an ACH payment method
		// Charge the customer's bank account
		// const charge = await stripe.charges.create({
		// 	amount: req.body.amount,
		// 	currency: req.body.currency,
		// 	source: achPaymentMethod.id, // Use the ACH payment method as the source
		// 	description: req.body.description,
		// });

		// Collect customer's bank account information (you may obtain this from a form)
		const bankAccountInfo = {
			account_holder_type: "individual", // Replace with appropriate value
			account_holder_name: "John Doe", // Replace with the account holder's name
			routing_number: "110000000", // Replace with the customer's bank routing number
			account_number: "000123456789", // Replace with the customer's bank account number
			country: "US", // Replace with the customer's country
		};

		// Create a payment source (ACH debit) using the collected bank account information
		stripe.tokens.create(
			{
				bank_account: bankAccountInfo,
			},
			async (err, token) => {
				if (err) {
					console.error(err);
				} else {
					console.log("ACC--------", token);

					// Link the payment source (token) to the customer
					const linkedSource = await stripe.customers.createSource(userID, {
						source: token.id,
					});

					// verify the account
					await stripe.customers.verifySource(
						userID,
						token.id,
						{
							amounts: [32, 45],
						},
						async (verifiedTOKEN) => {
							await stripe.charges.create(
								{
									amount: 1000, // Amount in cents (e.g., $10.00)
									currency: "usd",
									source: verifiedTOKEN.id, // Use the ACH debit token as the source
									description: "ACH Debit Charge Example",
								},
								(chargeErr, charge) => {
									if (chargeErr) {
										console.error(chargeErr);
									} else {
										console.log(charge);
										// The charge was successful; you can handle the successful payment here
										res.json(charge);
									}
								},
							);
						},
					);

					// Charge the bank account using the token
				}
			},
		);
	} catch (err) {
		console.log(err);
		res.send(`GETTING ERROR DURING THE CHARGE CREATING ---->>${err}`);
	}
};

//read payment
exports.read_a_payment = async (req, res) => {
	const paymentID = req.params.paymentId;

	await stripe.charges.retrieve(paymentID, async (err, charge) => {
		if (err) {
			console.log(err);
			res.send(`REQUEST ERROR---->>${err}`);
		} else {
			res.json(charge);
		}
	});
};

//update payment
exports.update_a_payment = async (req, res) => {
	const paymentID = req.params.paymentId;
	const param = {
		description: req.body.description,
	};
	await stripe.charges.update(paymentID, param, async (err, charge) => {
		if (err) {
			console.log(err);
			res.send(`REQUEST ERROR---->>${err}`);
		} else {
			res.json(charge);
		}
	});
};
