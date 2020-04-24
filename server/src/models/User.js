import crypto from 'crypto';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: {type:String},
    phone: {type:Number, default: null },
    email:{type:String, required: true },
    password:{type:String, required: true },
    salt: { type: String},
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    deleted: { type: String, enum: ['yes', 'no'], default: 'no' },
});


UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
};
  
module.exports = mongoose.model('User', UserSchema);
