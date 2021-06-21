var fox,foxAnimation
var knife,knifeImage,knifeGroup
var back,backImage,invisiGround
var score=0
var gameState=1
var gameOver, gameOverImg

function preload(){
  foxAnimation=loadImage("Animation Practice.gif")
  knifeImage = loadImage("knife.png")
  backImage = loadImage("ClipartKey_82896.png")
  gameOverImg = loadImage("Game Over Light.jpeg")
  
  knifeGroup= new Group()
}

function setup() {
 createCanvas(displayWidth,displayHeight)
 
 back = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
 back.addImage(backImage)
 back.scale=3
 
 fox = createSprite(displayWidth-100,500,10,10)
 fox.addImage(foxAnimation) 
 fox.scale=0.4
  
 gameOver=createSprite(displayWidth/2,displayHeight/2,10,10)
 gameOver.addImage(gameOverImg)
 gameOver.scale=0.4
 
  
 invisiGround=createSprite(displayWidth/2,displayHeight,displayWidth,10)
}

function draw() {
 
 background('white')
 
 
 invisiGround.visible=false
 camera.position.x=displayWidth/2
 camera.position.y= fox.y
 
 
  //console.log(score)
 if (gameState===1){ 
   gameOver.visible=false
   score= Math.round(frameCount/10)
   back.velocityX=2
   fox.collide(invisiGround)
 
   if (back.x>=displayWidth){
   back.x=displayWidth/2
 }
   fox.velocityY=fox.velocityY+0.8
  //console.log(fox.y)
  
   if(keyDown(UP_ARROW)&&fox.y>=330){
    fox.velocityY=-13
  } 
  
   if(keyDown(DOWN_ARROW)){
    fox.velocityY=13
  } 
  
   if(knifeGroup.isTouching(fox)){
    gameState=0
  }
   knifeSpawn()
 } else if(gameState===0){
   gameOver.visible=true
   
   fox.velocityX=0
   fox.velocityY=0
   
   knife.velocityX=0
   //knife.velocityY=0
   
   knifeGroup.velocityX=0
   
   back.velocityX=0
   
   if (mousePressedOver(gameOver)){
     knifeGroup.destroyEach()
     score=0
     frameCount=0
     gameState=1
   }
 } 
  
 drawSprites()
 textSize(20)
 fill('red')
 text("Score:"+score,10,20)

}

function knifeSpawn(){
  
  if (frameCount%200===0 ||frameCount%275===0){
   knife= createSprite(0,500,10,10) 
   knife.y= random(350,displayHeight)
   knife.addImage(knifeImage)
   knife.scale=0.7 
    
   knife.velocityX=(3+score/20)
   //knife.velocityY=2
   
   
   
   knifeGroup.add(knife)
    
  }
}



