Router.configure({
	layoutTemplate: 'layout'
});
Router.onBeforeAction(function(){
		// all properties available in the route function
		// are also available here such as this.params

		if (!Meteor.userId()) {
			// if the user is not logged in, render the Login template
			this.render('Login');
		} else {
			// otherwise don't hold up the rest of hooks or our route/action function
			// from running
			this.next();
		}
	},{
		except: ['login','register']
	}
);

Router.route('register');
Router.route('login');
Router.route('home', {
	onBeforeAction: function () {
		this.eventsHandle = Meteor.subscribe('events');
		this.next();
	},
	data: function(){
		return Events.find({uid:this.userId});
	},
	action: function(){
		this.render('home');
	}
});

Router.route('newEvent', {
	path: 'event/create',
	action: function(){
		this.render('newEvent');
	}
});

Router.route('viewEvent', {
	path: 'event/:_id',
	data: function(){
		return Events.findOne(this.params._id);
	},
	action: function(){
		this.render();
	}
});

Router.route('event')

Router.route('/',function(){
	if( Meteor.isClient ){
		if( Meteor.user() ){
			this.redirect('home');
		}
		else{
			this.redirect('login');
		}
	}
});
