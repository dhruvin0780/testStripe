// const { config } = require("dotenv");
// const { Configration, OpenAIApi } = require("openai");
// const config = new Configration({
// 	apiKey: "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",
// });

// const openai = require("openai");

require("dotenv").config();
const { Configration, OpenAIApi } = require("openai");

const configration = new Configration({
	apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configration);
//write a code for checking number is prime
