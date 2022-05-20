const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    tag: {
        type: String,
        default: 'General'
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('notes', NotesSchema);