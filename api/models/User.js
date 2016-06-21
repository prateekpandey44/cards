/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');
module.exports = {

  schema:true,//this will show the items in the schema only

  attributes: {

    name:{
      type:'string',
      required:true
    },
    title:{
      type:'string'
    },
    email:{
      type:'string',
      email:true,
      required:true,
      unique:true
    },
    encryptedPassword:{
      type:'string'
    },
    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }

    //this helps to remove the the unwanted data in the output
  },
  beforeCreate: function (values,next) {
    //this check to make sure the password and password confermation matches before creating record
    if(!values.password || values.password != values.confirmation){
        return next({err: ["password doesn't match password confirmation"]});
    }
    bcrypt.hash(values.password,10,function passwordEncrypted(err,encryptedPassword){
      if (err) return next(err);
      values.encryptedPassword=encryptedPassword;
     // values.onLine=true;
      next();
    });
  }
};

