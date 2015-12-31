Template.invitees.events({
	'keyup input[name="email"]': function( event, template ){
		var code = event.keyCode;
		//Enter
		if( code == 13 ){
			template.$('.invite')[0].click();
		}
	},
	'click .invitees .invite': function( event, template ){
		event.preventDefault();
		addNewInvitee( this, template );
	}
});

Template.home.helpers({
	invitesReady: function() {
		return Router.current().eventsHandle.ready();
	},
	invitees: function(){
		return Events.find({_id:this._id}, {invitees:1});
	}
})
var addNewInvitee= function( events, template ){
	var emailBox = template.$('input[name="email"]');
	var email = emailBox.val();
	var inv_list = template.$('ul.invitees_list');

	var inv_item = $('<li>');
	inv_item.text( email );
	inv_item.appendTo( inv_list );
	emailBox.val('');
	var invs = events.invitees;
	if( !invs ){
		invs = [];
	}
	var inv = {
		id: uuid(),
		email: email,
		has_viewed: false
	};
	invs.push( inv );

	var meeting = {
		$set: {
			invitees: invs
		}
	};
	if( Events.find({_id: events._id}, {'invitees.email': email}).count() ){
		alert('You have already invited '+ email );
		return false;
	}
	Events.update( events._id, meeting );
}
