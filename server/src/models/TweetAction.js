var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TweetActionSchema = new Schema({
    userId: {type: Schema.ObjectId, ref: 'User', required: true},
    tweetId: {type: Schema.ObjectId, ref: 'Tweet', required: true},
    action: {type:String, required: true, enum: ['retweet', 'like'] },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    deleted: { type: String, enum: ['yes', 'no'], default: 'no' }
});


module.exports = mongoose.model('TweetAction', TweetActionSchema);