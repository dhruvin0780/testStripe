"use strict";

require("dotenv").config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;

// const keySecret =
// 	"sk_test_51NkRaUSDgYl6hwSGqhpprbFImudV2lnbCXjFZgpntM6OkdQXUjzx5RahSSADEENQRUm8VIRBPdKT0HFfkm6MoMGO00vDj7ZpMJ";

// Stripe API
const stripe = require("stripe")(keySecret);

exports.list_all_cards = async (req, res) => {
	let user_id = req.query.userID;
	let param = {
		limit: req.query.limit || 10,
	};
	// await stripe.customers.listCards(user_id, param, async (err, cards) => {
	// 	// asynchronously called
	// 	if (err) {
	// 		console.log(err);
	// 		res.send(`REQUEST ERROR---->>${err}`);
	// 	} else {
	// 		res.json(cards);
	// 	}
	// });
};
// Cascadia Code,Noctis Viola

//createCard
exports.create_a_card = async (req, res) => {
	try {
		console.log("------->>", req.body);

		await stripe.tokens.create(
			{
				card: {
					name: req.body.name || "",
					number: req.body.card_number.toString(),
					exp_month: parseInt(req.body.exp_month),
					exp_year: parseInt(req.body.exp_year),
					cvc: req.body.cvc,
					// address_line1: req.body.address_line1 || "",
					// address_line2: req.body.address_line2 || "",
					// address_city: req.body.address_city || "",
					// address_state: req.body.address_state || "",
					// address_zip: req.body.address_zip || "",
					// address_country: req.body.address_country || "",
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
					console.log("TOKEN------", token);

					// await stripe.customers.createSource(
					// 	userID,
					// 	param,
					// 	async (err, card) => {
					// 		if (err) {
					// 			console.log(err);
					// 			res.send(`REQUEST ERROR---->>${err}`);
					// 		} else {
					// 			res.json(card);
					// 		}
					// 	},
					// );
				}
			},
		);
	} catch (error) {
		console.log("ERROR=========>>", error);
		res.send({
			ERROR: error,
		});
	}
};

//getCard
exports.read_a_card = async (req, res) => {
	let userID = req.params.userId;
	let cardID = req.params.cardId;

	stripe.customers.retrieveCard(userID, cardID, async (err, card) => {
		if (err) {
			console.log(err);
			res.send(`REQUEST ERROR---->>${err}`);
		} else {
			res.json(card);
		}
	});
};

//updateCard
exports.update_a_card = async (req, res) => {
	let userID = req.params.userId;
	let cardID = req.params.cardId;
	let param = {};

	stripe.customers.updateCard(userID, cardID, param, async (err, card) => {
		if (err) {
			console.log(err);
			res.send(`REQUEST ERROR---->>${err}`);
		} else {
			res.json(card);
		}
	});
};

//deleteCard
exports.delete_a_card = async (req, res) => {
	let userID = req.params.userId;
	let cardID = req.params.cardId;

	stripe.customers.deleteCard(userID, cardID, async (err, confirmation) => {
		if (err) {
			console.log(err);
			res.send(`REQUEST ERROR---->>${err}`);
		} else {
			res.json(confirmation);
		}
	});
};

//create a new card
// exports.createCard = async (req, res) => {
// 	try {
// 		console.log("------->>", req.body);
// 		// let userID = req.body.user_id;
// 		// const token = await stripe.tokens
// 		// 	.create({
// 		// 		card: {
// 		// 			number: req.body.card_number,
// 		// 			exp_month: req.body.exp_month,
// 		// 			exp_year: req.body.exp_year,
// 		// 			cvc: req.body.cvc,
// 		// 		},
// 		// 	})
// 		// 	.then((result) => {
// 		// 		if (result.error) {
// 		// 			console.error(result.error);
// 		// 			// Handle error
// 		// 		} else {
// 		// 			console.log("token--------------------------------", token);
// 		// 			// Use this token in your backend for testing
// 		// 		}
// 		// 	});
// 		// console.log("token--------------------------------", token);

// 		// let param = {
// 		// 	source: token,
// 		// };
// 		// console.log("TOKEN------", token, userID, param);
// 		// await stripe.customers.createSource(userID, param, async (err, card) => {
// 		// 	if (err) {
// 		// 		console.log(err);
// 		// 		res.send(`REQUEST ERROR---->>${err}`);
// 		// 	} else {
// 		// 		res.json(card);
// 		// 	}
// 		// });

// 		//----------------------------------

// 		// Attach the payment method to the customer
// 		// await stripe.paymentMethods.attach(paymentMethod.id, {
// 		// 	customer: customer.id,
// 		// });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
//create card with stripe
// exports.createCard = async (req, res) => {
// 	try {
// 		const paymentMethod = await stripe.tokens.create(
// 			{
// 				card: {
// 					number: req.body.card_number,
// 					exp_month: req.body.exp_month,
// 					exp_year: req.body.exp_year,
// 					cvc: req.body.cvc,
// 				},
// 			},
// 			(err, token) => {
// 				if (err) {
// 					console.log("ERROR-----", err);
// 				} else {
// 					console.log("CARDS TOKEN-----", token);
// 				}
// 			},
// 		);
// 	} catch (error) {
// 		console.log("error------", error);
// 	}
// };
