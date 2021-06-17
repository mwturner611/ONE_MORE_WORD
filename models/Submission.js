const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
	
    id: { type: String, required: true },
    message: { type: String, required: true },
    count: { type: Number, required: true }
});

module.exports = Submission = mongoose.model('Submission', SubmissionSchema);