var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_blog');
var Schema = mongoose.Schema

var articleSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    readNum: {
        type: Number,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Article', articleSchema)