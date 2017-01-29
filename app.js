click("login",logInUser);
ifUserIsLoggedIn(function(){
	console.log(window.currentUser);
});
