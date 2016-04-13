module.exports = function(app, passport) {

	// Define POST route for /signup endpoint
	app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		res.redirect('/profile.html');
	});

	// Define POST route for /signup endpoint
	app.post('/login', passport.authenticate('local-login'), function(req, res) {
		res.redirect('/profile.html');
	});

	// Define GET route for /profile endpoint
	app.get('/profile', isLoggedIn, function(req, res) {
		res.json({
			user: req.user
		});
	});

	// Define GET route for /logout endpoint
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	// Define custom isLoggedIn middleware
	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();

		res.json({
			error: "User not logged in"
		});
	}

};