const mongoose = require('mongoose')
const Schema = mongoose.Schema

const withdrawalSchema = new Schema({
    type : {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },

    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Withdrawal', withdrawalSchema)
