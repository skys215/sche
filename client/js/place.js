Template.places.helpers({
	hasVoted: function(){
		return _.include(this.votes, Meteor.userId() || Router.current().params.email_id );
	}
});

Template.places.events({
	'click .places .addPlace': function( event ){
		event.preventDefault();
		var self = $(event.target);
		var form = $(self).parents('form');

		var nameBox = form.find('input[name="place"]');
		var name = nameBox.val();
		if( !name ){
			alert( 'Place name cannot be null' );
			return false;
		}
		var place = {
			_id: uuid(),
			placeName: name,
			coord_x: 0,
			coord_y: 0,
			votes:[]
		};

		Events.update( this._id, {
			$push:{
				places: place
			}
		});
		nameBox.val('').focus();
	},
	'click .places .removePlace': function( event, template ){
		event.preventDefault();
		var self = $(event.target);
		var place_id = self.parents('li').attr('data-id');

		var a = Events.update( {
			_id: template.data._id
			},{
			$pull:{
				places:{
					_id: place_id
				}
			}
		});
	},
	'click .places .votePlace': function( event ){
		event.preventDefault();
		var self = $(event.target);

		var eventId = self.parents('div.meeting_form').attr('data-id');
		var voteAction = 'votePlace';
		if( self.hasClass('voted') ){
			voteAction = 'unvotePlace';
		}
		Meteor.call( voteAction, eventId, this._id, Meteor.userId() || Router.current().params.email_id);
	}
})
