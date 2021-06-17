const Submission = require('../models/Submission');


module.exports = (app) => {
    app.post('/words', (req,res) => {

        const wordCount = (words) => {
            let trimmed = words.trim();
            let singleSpaced = trimmed.replace(/  +/g,' ');
            return singleSpaced.split(' ').length;
        };

        Submission.create({
            id: req.body.id,
            message: req.body.message,
            count: wordCount(req.body.message)
        })
            .then((submission) => res.json(submission))
            .catch((err) => console.log(err));
    });
};