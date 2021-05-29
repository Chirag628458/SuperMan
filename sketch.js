

const Engine= Matter.Engine;
const World= Matter.World;
const Bodies= Matter.Bodies;

var engine, world;
var bg;
var ground, groundImg
var bl1, bl2, bl3, bl4
var bl1img,bl2img, bl3img, bl4img
var bgSprite
var hero, heroImg;
var enemy, enemyImg;
var enemy2, enemy2Img;
var score=0;
var laser, laserImg;
var laserGroup
var enemyGroup;
var blSprite;
var restart, resetImg;

var gameState="play";

function preload(){
  bg= loadImage("background.PNG");
  bl1img= loadImage("building1.png");
  bl2img= loadImage("building2.png");
  bl3img= loadImage("building3.png");
  bl4img= loadImage("building4.png");
  groundImg= loadImage("ground.png");
  heroImg=loadImage("superhero1.png")
  enemyImg=loadImage("enemy.png")
  enemy2Img=loadImage("obstacle.png")
  laserImg= loadImage("laser.png")
  resetImg=loadImage("reset1.png")
}

function setup() {
  createCanvas(1800,700);
  
  engine= Engine.create();
  world= engine.world;


  bgSprite=createSprite(0,0,800,400);
  bgSprite.addImage(bg)
  bgSprite.scale= 10
  bgSprite.velocityX=-5

  ground=createSprite(870, 650, 7000, 150)
  ground.velocityX= -5;
  ground.x= ground.width/2;
  
  hero=createSprite(350,177)
  hero.addImage(heroImg);
  hero.scale= 0.2
  hero.rotateToDirection=true;
  hero.maxSpeed= 4
  hero.friction=0.99
  
  restart=createSprite(750,420,20,40);
  restart.addImage(resetImg); 
  restart.scale= 0.5

  


laserGroup= new Group();
enemyGroup= new Group();
}

function draw() {
  background("white");
  Engine.update(engine);
if(gameState=="play"){
   restart.visible=false;

  if(bgSprite.x<0){
    bgSprite.x= bgSprite.width/2;
  }

  if(ground.x<0){
    ground.x=ground.width/2;
  }

  if(keyDown("DOWN_ARROW")){
   hero.y=hero.y+5
  }

  if(keyDown("UP_ARROW")){
   hero.y= hero.y-5;
  }

  

  if(keyDown("space")){
    createLaser();
  }
  
  if(laserGroup.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    laserGroup.destroyEach();
    score= score+50;
  }
  
  spawnBuilding()
  spawnEnemy()



  if(score===500){
   
    gameState="end";
    
  }
}
  
  else if(gameState==="end"){
    restart.visible= true;

    bgSprite.velocityX=0;
    ground.velocityX=0
    enemyGroup.destroyEach();
   
    blSprite.destroy();
    laserGroup.visible= false;
    if(mousePressedOver(restart)){
      reset();
    }

  }
  drawSprites();

  if(score===500){
    textSize(20)
     fill("red")
     textSize(30)
     stroke("black")
     strokeWeight(3)
     text("CONGRATULATIONS!! YOU WON", 540, 290)
  }
  
  fill("black")
  textSize(20);
  stroke("brown");
  text("SCORE: "+ score, 1400, 50);

}

function spawnBuilding(){
  if(frameCount%50===0){
     blSprite= createSprite(1000,400);
     var rand= Math.round(random(1,5));
     switch(rand){
       case 1: blSprite.addImage(bl1img);
       break;

       case 2: blSprite.addImage(bl2img);
       break;

       case 3: blSprite.addImage(bl3img);
       break;

       case 4: blSprite.addImage(bl4img);
       break;
     }
    blSprite.lifeTime= 200;
     blSprite.velocityX= -10;

     hero.depth= blSprite.depth;
     hero.depth=hero.depth+1;
  }
}

function spawnEnemy(){
  if(frameCount%150===0){
    var enemySprite= createSprite(1400,190);
    enemySprite.velocityX= -10
    enemySprite.y=Math.round(random(100,400))
    var result= Math.round(random(1,3))
    switch(result){
      case 1: enemySprite.addImage(enemyImg);
      break;
      case 2: enemySprite.addImage(enemy2Img);
      break;
    }
    enemySprite.lifeTime=200
    enemyGroup.add(enemySprite);
  }

}

function createLaser(){
  laser= createSprite(120,200, 20,30);
  laser.addImage(laserImg)
  laser.scale= 0.3
  laser.x=hero.x
  laser.y=hero.y
  laser.velocityX= 10;
  laserGroup.add(laser);
  laser.lifeTime=200
}

function reset(){
  gameState="play";
  score=0;
}

