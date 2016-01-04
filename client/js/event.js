Template.newEvent.events({
	'click .meeting .create': function( event ){
		var self = $(event.target);
		var form = $(self).parents('form');

		var name = form.find('input[name="title"]').val();
		if( !name ){
			alert( 'Event name cannot be null' );
			return false;
		}
		var description = form.find('textarea[name="description"]').val();
		var meeting = {
			uid: Meteor.userId(),
			name: name,
			description: description,
			invitees: [{_id:Meteor.userId(), email:Meteor.user().email}],
			dates   : [],
			places  : []
		};

		meeting._id = Events.insert( meeting );
		Router.go('home');
	}
});

Template.invitees.helpers({
	isMyEvent: ( Meteor.userId() == this.uid )
});
Template.viewEvent.events({
	'click .meeting .update': function( event ){
		event.preventDefault();
		var self = $(event.target);
		var form = $(self).parents('form');

		var name = form.find('input[name="title"]').val();
		if( !name ){
			alert( 'Event name cannot be null' );
			return false;
		}
		var meeting = {
			$set: { name: name }
		};

		meeting._id = Events.update( this._id, meeting );
		Router.go('event/'+meeting._id);
	},

	'click .meeting_form .delete': function( event ){
		event.preventDefault();
		if( confirm('Are you sure you want to delete?') ){
			Events.remove({_id:this._id});
			Router.go('home');
			return true;
		}
		else{
			return false;
		}
	}
});

