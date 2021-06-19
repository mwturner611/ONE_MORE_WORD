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

// Connect to the Mongo DB
mongoose
	.connect("mongodb://mongo:27017/mongo-test" || 'mongodb://localhost/wordCount', {
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