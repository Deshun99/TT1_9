const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length <= 50;
            },
            message: 'First name must be at most 50 characters long.'
        }
    },
    last_name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length <= 50;
            },
            message: 'Last name must be at most 50 characters long.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return value.length <= 20;
            },
            message: 'Username must be at most 20 characters long.'
        }
    }
});

module.exports = mongoose.model('User', userSchema);