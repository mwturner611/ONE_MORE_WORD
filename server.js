const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose
	.connect(process.env.DB_URI || 'mongodb://localhost/wordCount', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		createIndexes: true,
	})
	.then(() => console.log('connected to db...'))
	.catch((err) => console.log(err));
//==============================================
require('./models/Submission');

// API routes
app.get('/', (req,res)=> {
    res.json("Hey, your page works")
});

require("./routes/api-routes.js")(app);



// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});