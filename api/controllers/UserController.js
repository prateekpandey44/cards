/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'new':function(req,res){
   // res.locals.flash=_.clone(req.session.flash);
    res.view();
    //req.session.flash={};
  },

  create:function(req,res,next){
    //Create a User with the params sent form
    //the sign up form --> new.ejs
    User.create(req.params.all(),function userCreated(err, user){
      if(err){
        console.log(err);
        req.session.flash={
          err:err
        }


        return res.redirect('/user/new');
      }
        // return next(err);

      //After successfully creating the user redirect to show action
      //from episode 6//res.json(user);
      //req.session.flash={};
      res.redirect('/user/show/'+user.id);
    });
  },

  //render the profile view (e.g /view/show.ejs)
  show: function(req,res,next){
    User.findOne(req.param('id'),function foundUser (err,user){
      if(err) return next(err);
      if(!user) return next();
      res.view({
        user:user
      });
    });
  },
  index: function(req,res,next){
    //Get an array of all the users in the User Collection(e.g. table)
    User.find(function foundUser (err,user){
      if(err) return next(err);
      //pass the array down to the /views/index.ejs page
      res.view({
        user:user
      });
    });
  },
  //render the edit view (/views/edt.ejs)
  edit: function(req,res,next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next('User doesn\'t exist');

      res.view({
        user: user
      });
    });
  },
  update: function (req,res,next) {
       User.update(req.param('id'),req.params.all(),function userUpdate (err){
      if(err){
        return res.redirect('/user/edit/'+ req.param('id'));
      }
      res.redirect('/user/show/' + req.params('id'));
    });
  },
  destroy: function (req,res,next) {
    User.findOne(req.param('id'),function foundUser (err,user){
      if(err) return next(err);

      if(!user) return next ('User doesn\'t exist.');
      User.destroy(req.param('id'),function userDDestroyed(err){
        if(err) return next(err);

      });
      res.redirect('/user');
    });
  }
};

