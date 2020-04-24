import UserService from './../services/UserService';
import ResponseService from './../services/ResponseService';

import UserModel from './../models/User';
import TweetService from './../services/TweetService';

module.exports = {
    signUp: async function(req, res){
        try{
            var params = (req.body)?req.body:{};
            var email = (params && Object.keys(params).length>0)?params.email:null;
            var name = (params && Object.keys(params).length>0)?params.name:params.email;
            var password = (params && Object.keys(params).length>0)?params.password:null;

            var validation = await signup_validations(email, password);
            if(validation == null){
                var check_exist = await UserService.userExist(email);
                if(check_exist && check_exist.length>0){
                    ResponseService.apiResponse(res, 500, "Failed", "Email already exist!!");
                }
                else{
                    //Create new user
                    var dataObj = {name:name, email:email, password:password };
                    var userObj = new UserModel(dataObj);
                    await userObj.setPassword(password);
                    var insert = await userObj.save();
                    ResponseService.apiResponse(res, 200, "Success", "User created successfully!!");
                }
            }
            else{
                ResponseService.apiResponse(res, 422, "Failed", validation);
            }

        }
        catch(error){
            console.log("SignUp error: ", error);
        }
    },

    signIn: async function(req, res){
        try{
            var params = (req.body)?req.body:{};
            var email = (params && Object.keys(params).length>0)?params.email:null;
            var password = (params && Object.keys(params).length>0)?params.password:null;

            var validation = await signup_validations(email, password);
            if(validation == null){
                var userObj = await UserService.userExist(email);
                if(userObj == null || userObj == undefined || userObj.length==0){
                    ResponseService.apiResponse(res, 422, "Failed", userObj);
                }
                else{
                    var result = await userObj[0].validatePassword(password);
                    if(result == true){
                        ResponseService.apiResponse(res, 200, "Success", userObj[0]);        
                    }
                    else{
                        ResponseService.apiResponse(res, 422, "Failed", "Invalid credentials");
                    }
                }
            }
            else{
                ResponseService.apiResponse(res, 422, "Failed", validation);
            }

        }catch(error){
            console.log("User signIn error", error);
        }
    },

    profile: async function(req, res){
        try{
            var params = (req.params)?req.params:{};
            var userId = (params)?params.userId:null;
            if(userId !=null){
                var userObj = await UserService.getUserById(userId);
                if(userObj == null || userObj == undefined || Object.keys(userObj).length==0){
                    ResponseService.apiResponse(res, 422, "Failed", userObj);
                }
                else{
                    var tweets = await TweetService.getUserTweets(userId);
                    var data = {
                        id:userObj._id,
                        email:userObj.name,
                        phone:userObj.phone,
                        tweets: tweets
                    }
                    ResponseService.apiResponse(res, 200, "Success", data);        
                }
            }
            else{
                ResponseService.apiResponse(res, 500, "Failed", "User Id cannot be blank!!");
            }
        }
        catch(error){
            console.log(error);
        }
    }
}


async function signup_validations(email, password){
    try{
        var error = null;
        if(email==null || email == undefined || email == ""){
            error = "Email cannot be left blank";
            return error;
        }
    
        if(password==null || password == undefined || password == ""){
            error = "Password cannot be left blank";
            return error;
        }
    
        var email_validate = await UserService.validateEmail(email);
        if(email_validate != true){
            error = "Invalid email, please recheck it!!";
            return error;
        }
        return error;    
    }catch(err){
        console.log(err);
    }
}
