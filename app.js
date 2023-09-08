require("dotenv").config();

// Keys for Stripe
// const keyPublishable = process.env.PUBLISHABLE_KEY;
// const keySecret = process.env.SECRET_KEY;
const keyPublishable =
	"pk_test_51NkRaUSDgYl6hwSGGc6yjaJn2ICLG7GGMUHskbT6hIRiAWIgJEBosHOClOpW1gPLgORakGX0ZC5ENUgwE06EKOOU009Yqq2uxp";
exports.keySecret =
	"sk_test_51NkRaUSDgYl6hwSGqhpprbFImudV2lnbCXjFZgpntM6OkdQXUjzx5RahSSADEENQRUm8VIRBPdKT0HFfkm6MoMGO00vDj7ZpMJ";

// Library and Framework
const app = require("express")();
const stripe = require("stripe")(keySecret);

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({ extended: false }));

// Express routes
app.get(
	"/",
	(req, res) => res.render("index.pug", { keyPublishable }),
	res.send("hello"),
);

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

app.listen(3000);

//logically

//Recursive function
// function factorial(n) {
// 	if (n === 0) {
// 		return 1; // Base case
// 	} else {
// 		return n * factorial(n - 1); // Recursive case
// 	}
// }

// console.log(factorial(5)); // Output: 120
