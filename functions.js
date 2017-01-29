function click(elementId,fn){
	var element = document.getElementById(elementId);
	if(element){
		element.addEventListener("click", fn);

	}
}
click("login",logInUser);
function redirect(path){
	window.location=path;
	return false;
}
function logInUser(){
	//
	//
	//
	//
	redirect("chat.html")
}
