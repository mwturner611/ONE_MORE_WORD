

module.exports = (app) => {
    app.post('/words', (req,res) => {
        const sent = {
            newId: req.body.id + 1,
            words: req.words
        }
        res.json(sent.newId)
        // .catch((err) => console.log(err));
    });
};