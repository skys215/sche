Template.layout.events({
	'click .logout': function(){
		Meteor.logout(function(error){
			if( error ){
				console.log(error);
			}
			else{
				Meteor.logout();
				Router.go('/login');
			}
		});
	}
});
Template.layout.helpers({
	currentUser: function(){
		return Meteor.user();
	}
})


Template.home.helpers({
	eventsReady: function() {
		return Router.current().eventsHandle.ready();
	},
	events: function(){
		return Events.find({uid:Meteor.userId()});
	}
})

uuid = function(){
	return new Meteor.Collection.ObjectID().toHexString();
}
