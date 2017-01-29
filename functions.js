function click(elementId,fn){
	var element = document.getElementById(elementId);
	if(element){
		element.addEventListener("click", fn);
	}
}
function redirect(path){
	window.location=path;
	return false;
}
function logInUser(){
	logInWithGoogle();
}
function logInWithGoogle(){
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
  		var user = result.user;
		createUser(user.uid,user.displayName,user.email)
		//Create user
	}).catch(function(error) {
  		console.log(error.message);
	});

}
function createUser(uid, uname, uemail){
	var database = firebase.database();
	var usersRef= database.ref("users");
	var user={
		id:uid,
		name:uname,
		email:uemail
	}
	usersRef.child(uid).set(user).then(function (){
		var user = firebase.auth().currentUser;

		if (user) {
  	// User is signed in.
	} else {
  // No user is signed in.
	}
		redirect("chat.html");
	});
}
function ifUserIsLoggedIn(fn){
	firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
	  	window.currentUser = {
      	    		id: user.uid,
      	    		name: user.displayName,
      	    		email: user.email,
        	};
          	fn();
  	}
	else {
    // No user is signed in.
  	}
});
}
function getElement(id){
	return document.getElementById(id);
}
function updateUserData(){
	var usernameElement = getElement("username");
	usernameElement.textContent = window.currentUser.name;
}
function loadUsers(fn){
	var database =firebase.database();
	var usersRef=database.ref("users");
	usersRef.on('value',function(snapshot){
		var users=snapshot.val();
		fn(users);
	});
};
function renderUser(user){
	var uid = user.id;
	var chat_id=getChatId(window.currentUser.id,uid);
	console.log(uid);
	var name=user.name;
	var html = '<div id="' + chat_id + '" class="chat_member" >' + name + '</div>';
	return html;
}
function getChatId(id1,id2) {
	if(id1>id2){
		return id1+""+id2;
	}
	else
		return id2+""+id1;
}
function onClickMultiple(className,func) {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains(className)) {
            func(event.target);
        }
    });
}
function loadMessages(chat_id,fn){
	var database =firebase.database();
	var usersRef=database.ref("users");
	usersRef.on('value',function(snapshot){
		var database =firebase.database();
		var chatsRef=database.ref("chats");
		var chats
		chatsRef.child(chat_id).on('value',function(snapshot){
			var messages=snapshot.val();
			fn(messages);
		});
	});
}
function renderMessage(message){
	var text=message.text;
	var msgClass="message";

	if(message.sender_id==window.currentUser.id){
		msgClass="message_by_me";
	}
	var html='<div class='+msgClass+'">'+text+'</div>';
	return html;
}
function sendMessage(chat_id,text) {
	var message={
		text:text,
		sender_id:window.currentUser.id,
	}

	var database= firebase.database();
	var chatsRef=database.ref("chats");
	var char =chatsRef.child(chat_id);
	var newMessage=chatsRef.push().key;

	chat.child(newMessageId).set(message);

}
