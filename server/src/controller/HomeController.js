import ResponseService from './../services/ResponseService'

module.exports = {

    home:async function(){
        
    },

    profile: async function(req, res){
        try{
            var userId = (req.query.userId)?req.query.userId:null;
            if(userId == null){
                ResponseService.apiResponse(res, 422, "Failed", "User Id cannot be blank!!");
            }
            else{
                var userData = await UserService.getUserData(userId);
                var tweets = await TweetService.getUserTweets(userId);
                var tweetsAndReplies = await RetweetService.getRetweets(userId);
                
            }
        }
        catch(error){
            console.log(error);
        }
    }
}