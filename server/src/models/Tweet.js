var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TweetSchema = new Schema({
    userId: {type: Schema.ObjectId, ref: 'User', required: true},
    //tweetId: {type:Number , default:0},
    tweet: {type:String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    deleted: { type: String, enum: ['yes', 'no'], default: 'no' }
});

// var TweetModel = mongoose.model('tweet', TweetSchema);

// var TweetSchema = mongoose.Schema({
//     testvalue: {type: String}
// });

// TweetSchema.pre('save', function (next) {
//     var doc = this;
//     TweetSchema.findByIdAndUpdate({_id: 'entityId'}, {$inc: { tweetId: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.testvalue = counter.seq;
//         next();
//     });
// });

module.exports = mongoose.model('tweet', TweetSchema);