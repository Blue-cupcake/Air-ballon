var background,backgroundImg;
var balloon,balloonPosition,balloonImage2;

function preload(){
balloonImage2=loadAnimation("Hot Air Ballon-02.png");
backgroundImg=loadImage("Hot Air Ballon-01.png");
}

function setup() {
  createCanvas(800,800);

  database = firebase.database();

  balloon=createSprite(100, 200, 50, 50);
  balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError )

 
  
}

function draw() {
  background(backgroundImg);  
  drawSprites();

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x-10;
}
else if(keyDown(RIGHT_ARROW)){
  balloon.x = balloon.x+10;
}
else if(keyDown(UP_ARROW)){
  balloon.y = balloon.y-10;
  updateHeight(0,-10);
  balloon.addAnimation("hotAirBallon")
  balloon.scale=balloon.scale-0.01;
}
else if(keyDown(DOWN_ARROW)){
  balloon.y = balloon.y+10;
}

  
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':height.x + x ,
    'y':height.y + y ,
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;

}

function showError(){
  console.log("Error in writing to database");
}