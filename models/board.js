/**
 * Created by ss on 2018-07-11.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = new Schema({
    SUBJECT: String,
    CONTENT: String, 

    AOD: String, 
    BIBLE: String, 
    BIBLE_SM: String, 
    VERSE: String, 
    BOOKTYPE: String, 
    BOOK: String, 
    DAY : Number 
});

module.exports = mongoose.model('bibledatas', boardSchema);