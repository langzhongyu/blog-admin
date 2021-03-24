var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_blog');
var Schema = mongoose.Schema

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)