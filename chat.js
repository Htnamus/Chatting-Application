ifUserIsLoggedIn(function(){
	updateUserData();
	loadUsers(function(users){
		var usersList="";
		for (var uid in users) {
			var user=users[uid];
			if(window.currentUser.id!=uid){
				console.log(user);
				usersList+=renderUser(user);
			}
		}
		getElement("chat_member").innerHTML=usersList;
	});
});
