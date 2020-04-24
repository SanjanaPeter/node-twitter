import User from './../models/User';

module.exports = {
    createUser:function(dataObj, checkObj){

        return new Promise((resolve, reject) => {
            User.findOneAndUpdate(dataObj, checkObj, {
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

    userExist: function(email){
        return new Promise((resolve, reject) => {
            User.find({email: email})
            .exec(function(error, doc){
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

    validateEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    userSignIn: function(email, password){
        User.findOne({email:email, deleted: 'no'})
            .then((user) => {
                //validatePassword is defined inside the User model
                if(!user || !user.validatePassword(password)){
                    console.log("1")
                    return "invalid";
                }
                else{
                    return null;
                }
            })
            .catch((error) => {
                return error
            });
    },

    getUserById: function(userId){
        return new Promise(function(resolve, reject){
            User.findOne({_id:userId, deleted: 'no'})
            .exec(function(error, doc){
                if(error){
                    console.log(error);
                    reject(error);
                }
                else{
                    resolve(doc);
                }
            });  
        });
    }
}