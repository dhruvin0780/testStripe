let express = require("express"),
	app = express(),
	port = 3000,
	mongoose = require("mongoose"),
	Payment = require("./api/models/paymentModel"), //created model loading here
	bodyParser = require("body-parser");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/Paymentdb");

// app.use(bodyParser.urlencoded({ extended: true }));
mongoose
	.connect("mongodb://localhost:27017/Paymentdb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connection succusesfully..."))
	.catch((err) => console.log(err));
app.use(express.json());

// app.use(bodyParser.json());

let routes = require("./api/routes/populStayTransactionRoutes"); //importing route
routes(app); //register the route

// app.use(function (req, res) {
// 	res.status(404).send({ url: req.originalUrl + " not found" });
// });

app.get("/", (req, res) => {
	console.log("=---->>", req.body);
	res.send("hello");
});

const keySecret =
	"sk_test_51NkRaUSDgYl6hwSGqhpprbFImudV2lnbCXjFZgpntM6OkdQXUjzx5RahSSADEENQRUm8VIRBPdKT0HFfkm6MoMGO00vDj7ZpMJ";

const stripe = require("stripe")(keySecret);

//
app.post("/charge", (req, res) => {
	let amount = 500;

	stripe.customers
		.create({
			email: req.body.stripeEmail,
			source: req.body.stripeToken,
		})
		.then((customer) =>
			stripe.charges.create({
				amount,
				description: "Sample Charge",
				currency: "usd",
				customer: customer.id,
			}),
		)
		.then((charge) => res.render("charge.pug"));
});

//create customer
const createCustomer = async () => {
	const param = {};
	param.email = "moko@gmail.com";
	param.name = "Moko";
	param.description = "from code";

	await stripe.customers.create(param, (err, customer) => {
		if (err) {
			console.log("ERROR------>", err);
		}
		if (customer) {
			console.log("SUCCESS========>>");
		} else {
			console.log("Something wrong---->>");
		}
	});
};
// createCustomer();

//get customer
const retriveCustomer = async () => {
	await stripe.customers.retrieve(
		(id = "cus_OYEiCJUv9eYARL"),
		(err, customer) => {
			if (err) {
				console.log("ERROR------>", err);
			}
			if (customer) {
				console.log("SUCCESS========>>", JSON.stringify(customer, null, 2));
			} else {
				console.log("Something wrong---->>");
			}
		},
	);
};
// retriveCustomer();

//createToken
const createToken = async () => {
	await stripe.tokens.create(
		{
			card: {
				number: "4242424242424242",
				exp_month: 12,
				exp_year: 2023,
				cvc: "123",
			},
		},
		function (err, token) {
			if (err) {
				console.error(err);
			} else {
				console.log(token);
			}
		},
	);
};
// createToken();
//

async function createCardForCustomer() {
	try {
		const paymentMethod = await stripe.paymentMethods.create({
			type: "card",
			card: {
				number: "4242424242424242", // Test card number
				exp_month: 12,
				exp_year: 2023,
				cvc: "123",
			},
		});

		await stripe.paymentMethods.attach(paymentMethod.id, {
			customer: customer.id,
		});

		console.log("Payment method attached:", paymentMethod);
	} catch (error) {
		console.error("Error:", error);
	}
}
// createCardForCustomer();

//getToken
// stripe.tokens.retrieve("tok_visa", function (err, token) {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.log("_________________-------->>", token);
// 	}
// });

//addCardToCustomer
// const addCardToCustomer = () => {
// 	stripe.Customer.create_source((id = "cus_OYElYvM2D8YIOS")),
// 		(param = { source: "tok_1NlAdmSDgYl6hwSGrzV25Pwn" }),
// 		(err, card) => {
// 			if (err) {
// 				console.log("ERROR------>", err);
// 			}
// 			if (card) {
// 				console.log("SUCCESS========>>", JSON.stringify(card));
// 			} else {
// 				console.log("Something wrong---->>");
// 			}
// 		};
// };
// addCardToCustomer();

//create source(card...)
const createSource = () => {
	stripe.sources.create(
		{
			type: "ach_credit_transfer",
			currency: "usd",

			owner: {
				email: "moko@example.com",
			},
			ach_credit_transfer: bankAccountInfo,
		},
		(err, card) => {
			if (err) {
				console.log("ERROR--->", err);
			} else {
				console.log("CARD---->>", card);
			}
		},
	);
};
// createSource();

///
////
app.listen(port);

console.log("Payment RESTful API server started on: " + port);

//
// {
// 	id: 'tok_1Nl9ZkSDgYl6hwSGdypO2apH',
// 	object: 'token',
// 	card: {
// 	  id: 'card_1Nl9ZkSDgYl6hwSGrq5B4cPV',
// 	  object: 'card',
// 	  address_city: null,
// 	  address_country: null,
// 	  address_line1: null,
// 	  address_line1_check: null,
// 	  address_line2: null,
// 	  address_state: null,
// 	  address_zip: null,
// 	  address_zip_check: null,
// 	  brand: 'Visa',
// 	  country: 'US',
// 	  currency: 'usd',
// 	  cvc_check: null,
// 	  dynamic_last4: null,
// 	  exp_month: 8,
// 	  exp_year: 2024,
// 	  fingerprint: 'okQ9a6F09O01CC34',
// 	  funding: 'credit',
// 	  last4: '4242',
// 	  metadata: {},
// 	  name: null,
// 	  tokenization_method: null,
// 	  wallet: null
// 	},
// 	client_ip: null,
// 	created: 1693483336,
// 	livemode: false,
// 	type: 'card',
// 	used: false
//   }
