Events = new Mongo.Collection('events');

if( Meteor.isServer ){
	Meteor.startup(function(){
		Meteor.methods({
			voteDate: function( eventId, dateId, voterId ){
				Events.update( {_id:eventId, 'dates._id':dateId }, {$push:{'dates.$.votes':voterId } });
			},
			unvoteDate: function( eventId, dateId, voterId ){
				Events.update( {_id:eventId, 'dates._id':dateId }, {$pull:{'dates.$.votes':voterId } });
			},
			votePlace: function( eventId, placeId, voterId ){
				Events.update( {_id:eventId, 'places._id':placeId }, {$push:{'places.$.votes':voterId } });
			},
			unvotePlace: function( eventId, placeId, voterId ){
				Events.update( {_id:eventId, 'places._id':placeId }, {$pull:{'places.$.votes':voterId } });
			},
		});
	});
}
