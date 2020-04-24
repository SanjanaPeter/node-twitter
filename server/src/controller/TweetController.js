import TweetService from './../services/TweetService';
import ResponseService from './../services/ResponseService';
import TweetModel from './../models/Tweet';
import TweetAction from './../models/TweetAction';

module.exports = {
    newTweet: async function(req, res){
        try{
            var params = (req.body)?req.body:{};
            var userId = (params)?params.userId:null;
            var email = (params)?params.email:null;
            var tweet = (params.tweet)?params.tweet:null;
            var validation = await createTweet_validations(userId, tweet);
            if(validation == null){
                var tweetObj = new TweetModel({
                    userId: userId,
                    tweet: tweet
                });
                var result = await tweetObj.save();
                //var result = await TweetService.createTweet({userId: userId, tweet:tweet});
                if(result){
                    ResponseService.apiResponse(res, 200, "Success", result);
                }
                else{
                    ResponseService.apiResponse(res, 500, "Failed", result);
                }
            }else{
                ResponseService.apiResponse(res, 500, "Failed", (validation)?validation:"Some error occured, please try again later");

            }
        }
        catch(error){
            console.log("Create new Tweet error:", error)
        }
    },

    retweet: async function(req, res){
        try{
            var tweetId = (req.query)?req.query.tweetId:{};
            var userId = (req.query)?req.query.userId:null;
            if(tweetId!=null && userId != null){
                var retweetAction = new TweetAction({
                    userId: userId,
                    tweetId: tweetId,
                    action:'retweet'
                })
                var retweeted = await TweetService.markRetweet(retweetAction);
                ResponseService.apiResponse(res, 200, "Success", "Successfully retweeted!");
            }else{
                ResponseService.apiResponse(res, 500, "Failed", (validation)?validation:"Some error occured, please try again later");

            }
        }
        catch(error){
            console.log("Create new Tweet error:", error)
        }
    },

    tweet_liked: async function(req, res){
        try{
            var tweetId = (req.query)?req.query.tweetId:{};
            var userId = (req.query)?req.query.userId:null;
            if(tweetId!=null && userId != null){
                var tweet_like_action = new TweetAction({
                    userId: userId,
                    tweetId: tweetId,
                    action:'like'
                })
                var tweet_like = await TweetService.markRetweet(tweet_like_action);
                ResponseService.apiResponse(res, 200, "Success", "Successfully retweeted!");
            }else{
                ResponseService.apiResponse(res, 500, "Failed", (validation)?validation:"Some error occured, please try again later");

            }
        }
        catch(error){
            console.log("Create new Tweet error:", error)
        }
    }


}

async function createTweet_validations(userId, tweet){
    var error = null;
    if(userId==null || userId == undefined || userId == ""){
        error = "Invalid userId";
        return error;
    }

    if(tweet==null || tweet == undefined || tweet == ""){
        error = "Tweet cannot be empty!!!";
        return error;
    }
    return error;
}