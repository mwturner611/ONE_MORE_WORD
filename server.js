const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets 
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const dburl = "mongodb+srv://mwturner611:8tLHe7lGc6FiSAED@one-more-word.thzas.mongodb.net/one-more-word?retryWrites=true&w=majority"
// Connect to the Mongo DB
mongoose
	.connect(dburl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		createIndexes: true,
	})
	.then(() => console.log('connected to db...'))
	.catch((err) => console.log(err));
//==============================================
require('./models/Submission');

// api route reference
require("./routes/api-routes.js")(app);

// listen on active port
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});