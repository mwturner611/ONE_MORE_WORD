const Submission = require('../models/Submission');


module.exports = (app) => {
    app.post('/words', (req,res) => {

        let response = {};

        // clean up user's message submission to array to count
        const wordCount = (words) => {
            let trimmed = words.trim();
            let singleSpaced = trimmed.replace(/  +/g,' ');
            return singleSpaced.split(' ').length;
        };

        // create a new value in the database with count
        Submission.create({
            id: req.body.id,
            message: req.body.message,
            count: wordCount(req.body.message)
        })
        // retrieve all word counts from DB
            .then(() => Submission.find({}, {count:1,_id:0}))

            // use reduce to sum the submission counts
            .then((counts) => {
            
                let initialValue = 0;
                    
                let sum = counts.reduce((accumulator,currentValue) => accumulator + currentValue.count, initialValue)    
                    
                response = {"count":sum}
            })
            // return json object
            .then(() => res.json(response))
            .catch((err) => {
            console.log(err)
            res.json("Please submit a JSON object with an 'id' and 'message'key fields only")}
            );
    });

    // welcome message if someone goes to url
    app.get('/', (req,res)=> {
        res.json("Welcome to the word count!")
        });
};