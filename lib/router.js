Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',function(){
	if( Meteor.isClient ){
		if( Meteor.user ){
			this.render('home');
		}
		else{
			this.render('login');
		}
	}
});

Router.route('/register');
Router.route('/login');
