$(document).ready(function(){
  //validate
  //http://bassistance.de/jquery-pugins/jquery-plugin-validation/
  //http://docs.jquery.com/Plugins/validation/
  //http://docs.jquery.com/Plugins/Validation/validateoptions
  $('#sign-up-form').validate({
    rules:{
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        minlength: 6,
        required: true
      },
      confermation: {
        minlength: 6,
        equalTo: "password"
      }
  },
    success: function(element) {
    element
      .text('ok!').addclass('valid')
  }
  });
});
