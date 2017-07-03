var width;
var height;
var player;
var playersize = 20;
var bg;

var SCENE_W = 3000;
var SCENE_H = 3000;

function setup() {
	//Setting up the canvas as the whole width/height of the user's screen
	width = window.innerWidth;
	height = window.innerHeight;
	createCanvas(width, height);
	backgroundColor = color(51);
	
	//Creating the groups for the entities to fill
	food = new Group();
	players = new Group();
	
	//Create player sprite, x,y positions, and initial position
	var middle = createVector(width/2, height/2);
	player = createSprite(width/2, height/2, 20, 20)
	
	player.draw = function(){
		fill(255,118,0);
		ellipse(0,0,playersize);
	}
	
	player.setCollider("circle",0,0,playersize/2);
	
	players.add(player);
	
	//Some background for reference
	for (var i=0; i<100; i++){
		bitfood = createSprite(random(SCENE_W),random(SCENE_H),10,10);
		bitfood.setCollider("circle",0,0,5);
		bitfood.draw = function(){
			fill(0,182,255);
			ellipse(0,0,5);
		}
		
		food.add(bitfood);
	}
	
}

function draw() {
	background(51);
	
	player.velocity.x = (camera.mouseX-player.position.x)/20;
	player.velocity.y = (camera.mouseY-player.position.y)/20;

	camera.position.x = player.position.x;
	camera.position.y = player.position.y;

	if(player.position.x < 0)
		player.position.x = 0;
	if(player.position.y < 0)
		player.position.y = 0;
	if(player.position.x > SCENE_W)
		player.position.x = SCENE_W;
	if(player.position.y > SCENE_H)
		player.position.y = SCENE_H;
	
	//Draw the background sprites first
	drawSprites(food);
	drawSprites(players);
	
	food.collide(player, consume);
	
	print(player.position);
	
}

function consume(bitfood){
	playersize += 2;
	player.setCollider("circle",0,0,playersize/2);
	
	player.draw = function(){
		fill(255,118,0);
		ellipse(0,0,playersize);
	}
	
	bitfood.remove();
}
