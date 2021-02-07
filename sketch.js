p5.disableFriendlyErrors=true
var monkey , monkey_running,monkey_stopImage,monkeyStop
var banana ,bananaImage, obstacle, obstacleImage
var bananaG, obstacleG
var score=0 
var bg,bgImage,invisibleG
var restart,restart_image
var gameover,gameoverImage
var state="play"
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  //bgImage=loadImage("forest.png")
  monkey_stopImage = loadAnimation("sprite_0.png")
  restartImage=loadImage("restartMonkey.png")
  gameoverImage=loadImage("gameoverMonkey.png")
}



function setup() {
  createCanvas(windowWidth,windowHeight)
   //bg=createSprite(windowWidth,windowHeight,100,100)
  //bg.addImage("bg",bgImage)
  //bg.x=bg.width/2
  
  monkey=createSprite(width/3,height-40,20,50)
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale=0.1
  
  invisibleG=createSprite(width/10,height-40,width,10)
  invisibleG.visible=false
  
  restart=createSprite(width/2,height/2,10,10)
  restart.addImage(restartImage)
  //gameover=createSprite(width/2,height/2,10,10)
  //gameover.addImage(gameoverImage)
  //gameover.visible=false
  
  bananaGroup=new Group()
  obstacleGroup=new Group()
  monkey.setCollider("circle",0,0,50)
  monkey.debug=false
}


function draw() {
  background("green")
   // bg.velocityX=-10
 // if(bg.x<0){
   // bg.x=bg.width/2
  //}
  fill("yellow")
  textSize=70
  text("score"+score,450,150)
  
 
  if(state==="play"){
   if(keyDown("space") && monkey.y>=height-100){
    monkey.velocityY = -10;
   }
   if(monkey.isTouching(bananaGroup)){
     score=score+1
     bananaGroup.destroyEach()
   }
    if(monkey.isTouching(obstacleGroup)){
      state="end"
      textSize=550
      text("gameover",width/2,height/3)
      
      score=0
    }
  monkey.velocityY=monkey.velocityY+0.5
  restart.visible=false
  }
  
  if(state==="end"){
    obstacleGroup.destroyEach()
    bananaGroup.destroyEach()
    
    monkey.velocityY=0
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    
    bananaGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    
    restart.visible=true
    bananaGroup.visible=false
    obstacleGroup.visible=false
    
    monkey.changeAnimation("monkey",monkey_stopImage)
    
    
    if(mousePressedOver(restart)){
      state="play"
    }
  }
  
  drawbanana()
  drawObstacles()
  monkey.collide(invisibleG)
  drawSprites()  
}

function drawbanana(){
  if(frameCount%100===0){
    banana=createSprite(width,height-180,20,20)
    banana.addImage("banana",bananaImage)
    banana.scale=0.1
    banana.velocityX=-10
    banana.lifetime=100
    bananaGroup.add(banana)
  }
}

 function drawObstacles(){
  if(frameCount%130===0){
    obstacle=createSprite(width,height-70,10,10)
    obstacle.velocityX=-(10+5*score/500)
    obstacle.scale=0.2
    obstacle.lifetime=120
    obstacle.addImage(obstacleImage)
    obstacleGroup.add(obstacle)
  } 
 }






