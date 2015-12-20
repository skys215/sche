Template.home.events({
	'click .logout': function(){
		Meteor.logout(function(error){
			if( error ){
				console.log(error);
			}
			else{
				Router.go('/');
			}
		});
	}
});
