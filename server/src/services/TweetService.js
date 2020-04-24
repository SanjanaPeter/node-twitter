import Tweet from './../models/Tweet';
import TweetAction from './../models/TweetAction';

module.exports = {
    createTweet:function(dataObj){

        return new Promise((resolve, reject) => {
            Tweet.findOneAndUpdate(dataObj, dataObj, {
                new: true,
                upsert: true,  // Don't want to update the document if it already exist
                rawResult: true // Return the raw result from the MongoDB driver
            })
            .exec(function(error, doc){
                console.log("Docccccument", doc);
                if(error){
                    console.log(error);
                    reject(error);
                }
                else{
                    resolve(doc);
                }
            });            
        });
    },

    markRetweet: async function(TweetAction){
        return new Promise((resolve, reject) => {
            TweetAction.save(async function (err, data) {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(data);
                }
            });          
        });
    },

    getUserTweets: function(userId){
        return new Promise((resolve, reject) => {
            Tweet.find({userId: userId},  function(err, arr) {
                if(err){
                    reject(err);
                }else{
                    resolve(arr);
                }
            });    
        });
    }
}

