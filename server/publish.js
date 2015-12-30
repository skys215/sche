Meteor.publish('events', function(){
	return Events.find({uid: this.userId})
})
