var user1={
	name: "Htnamus",
	id:2,
	sayHello: function(){
		console.log("Hello "+ this.name);
	}

};
var user2={
	name: "Htnamus2",
	id:2,
	sayHello: function(){
		console.log("Hello "+ this.name);
	}

};
var users=[
	user1,user2
];
console.log(users[0]);
