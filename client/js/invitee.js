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
		return false;
	},
	'click .invitees .removeInvitee': function( event, template ){
		event.preventDefault();

		Events.update( {
			_id: template.data._id
			},{
			$pull:{
				invitees:{
					_id: this._id
				}
			}
		});
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

	var inv = {
		_id: uuid(),
		email: email,
		has_viewed: false,
		sent_invitation: false
	};

	if( events.invitees.length && Events.find({_id: events._id, 'invitees.email': email}).count() ){
		alert('You have already invited '+ email );
		emailBox.focus();
		return false;
	}
	Events.update( events._id, {
		$push: {
			'invitees': inv
		}
	});
	emailBox.val('');
	emailBox.focus();
	return false;
}
