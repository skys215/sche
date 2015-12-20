Router.configure({
	layoutTemplate: 'layout'
});

Router.route('register');
Router.route('login');
Router.route('home');

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
