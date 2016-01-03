Template.dates.onRendered(function(){
	$('input[name="eventDate"]').bootstrapMaterialDatePicker({
		time: false,
		minDate: new Date()
	}).on('change', function( e, date ){
		$('input[name="eventStartTime"]').bootstrapMaterialDatePicker('setMinDate', date );
	});

	$('input[name="eventStartTime"]').bootstrapMaterialDatePicker({
		date: false,
		format: 'HH:mm'
	}).on('change', function( e, date ){
		$('input[name="eventEndTime"]').bootstrapMaterialDatePicker('setMinDate', date);
	});

	$('input[name="eventEndTime"]').bootstrapMaterialDatePicker({
		date: false,
		format: 'HH:mm'
	});
});

Template.dates.helpers({
	hasVoted: function(){
		return _.include(this.votes, currentUserId() );
	}
});

Template.dates.events({
	'click .addDate': function( events ){
		event.preventDefault();
		var self = $(event.target);
		var form = $(self).parents('form');
		var date = form.find('input[name="eventDate"]').val();
		var startTime =	form.find('input[name="eventStartTime"]').val();
		var endTime =	form.find('input[name="eventEndTime"]').val();

		var dates = this.dates;

		var hasSameDateTime = Events.find({
			_id: this._id,
			dates:{
				date: date,
				startTime: startTime,
				endTime: endTime
			}
		}).count();
		if( hasSameDateTime ){
			alert('Date already added.');
			return false;
		}

		var time = {
			_id: uuid(),
			date: date,
			startTime: startTime,
			endTime: endTime,
			votes: [ currentUserId() ]
		}

		var meeting = {
			$push: { dates: time }
		};
		Events.update( this._id, meeting );
	},
	'click .removeDate': function( event, template ){
		event.preventDefault();
		var self = $(event.target);
		var time_id = self.parents('li').attr('data-id');

		Events.update( {
			_id: template.data._id
			},{
			$pull:{
				dates:{
					_id: time_id
				}
			}
		});
	},
	'click .voteDate': function( event ){
		event.preventDefault();
		var self = $(event.target);

		var eventId = self.parents('div.meeting_form').attr('data-id');
		var voteAction = 'voteDate';
		if( self.hasClass('voted') ){
			voteAction = 'unvoteDate';
		}
		Meteor.call( voteAction, eventId, currentUserId() );
	}
});
