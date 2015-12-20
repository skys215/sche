var ERRORS_KEY = 'loginErrors';

Template.login.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.login.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.login.events({
	'click .login': function(event, template){
		event.preventDefault();
		var email = template.$('input[name="email"]').val();
		var password = template.$('input[name="password"]').val();
		Meteor.loginWithPassword(email, password, function(error) {
			if (error) {
				console.log(error);
				return Session.set(ERRORS_KEY, {'none': error.reason});
			}

			Router.go('/');
		});
	}
})
