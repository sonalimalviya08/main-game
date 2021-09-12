var boy,boyImg,doctor,virus
var boyJimg , bg , bg1
var virus1 , virus2 , virus3, virus4
var InvSpellTop , InvSpellBottom
var san ,doctor , docImg, sanImg;
var restart, restartImg
var virusGroup
var virusS
var appleImg,apple,orangeImg,orange
var fruitS
var fruitGroup
var score =0
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var life =1
var restart;
var jumpSound
function preload(){
 bg = loadImage("images/lab.jpg")
 boyJimg = loadAnimation("images/boyj1.png.png","images/boyj2.png.png","images/boyj3.png.png","images/boyj4.png.png","images/boyj5.png.png","images/boyj6.png.png")
 
 boyImg = loadAnimation("images/boy1.png","images/boy2.png","images/boy3.png.png","images/boy4.png.png","images/boy5.png.png","images/boy6.png.png")
 virus1 = loadImage("images/virus1.png")
 virus2 = loadImage("images/virus2.png")
 virus3 = loadImage("images/virus3.png")
 virus4 = loadImage("images/virus4.png")
 
 sanImg = loadImage("images/san.png")
 appleImg = loadImage("images/apple.png")
 orangeImg = loadImage("images/orange.png")
 restartImg = loadImage("images/restart.png")
 
}
function setup() {
  createCanvas(displayWidth-100,displayHeight-100);
  bg1 = createSprite(550,150,width,height)

  bg1.addImage(bg)
  bg1.scale =3
  //bg1.velocityX = -2
  
 boy = createSprite(width/2,height-150)
  boy.addAnimation("running",boyImg)
  boy.scale =2

  InvSpellBottom = createSprite(550,height-10,width,10)

 // InvSpellTop= createSprite(550,height-200,width,10)

  
  san  =createSprite(width/2-550,height-160)
  san.addImage(sanImg)
  san.scale = 0.2
  san.visible = false;

  virusGroup = new Group()
  fruitGroup = new Group()

 // boy.debug = true;
 boy.setCollider("rectangle",0,0,50,130)

 restart =createSprite(width/2,height/2)
 restart.addImage(restartImg)
 restart.visible=false
 restart.scale=.5
 
}

function draw() {
  background(bg);  
  if(gameState===PLAY){
    restart.visible = false;
    bg1.velocityX = -2
    if(bg1.x<420){
      bg1.x = width/2
    }
   
    if(keyWentDown("space")&& boy.y>400){
      boy.addAnimation("jumping",boyJimg)
      boy.changeAnimation("jumping")
      boy.velocityY = -15
  
    }
    if(keyWentUp("space")){
      
      boy.changeAnimation("running")
     // boy.velocityY = -10
  
    }
    if(fruitGroup.isTouching(boy)){
      boy.scale +=0.05 
      score +=1
    }
    boy.velocityY = boy.velocityY+0.5


  //if(virusGroup.isTouching(boy)){
   
 // }
  for (var i = 0;i<virusGroup.length;i++){
    if(virusGroup.get(i).isTouching(boy)){
      virusGroup.get(i).remove()
       boy.scale -=0.25  
  life=life-1
    }
  }
  
  boy.collide(InvSpellBottom)
 
  fruit();
  virus();
  if(boy.scale<=0.7||life<=0){
    gameState=END
  }
  }
else if(gameState===END){
  restart.visible = true;
  bg1.velocityX = 0
  boy.velocityX=0
  virusGroup.setVelocityXEach(0);
  fruitGroup.setVelocityXEach(0);

  if(mousePressedOver(restart)) {
    reset();
    console.log("end")
  }
  
}
  

drawSprites()
  textSize(20)
  text("Life "+life,800,50)
  text("Score "+score,700,50)
  
  console.log(boy.y)
}
function reset(){
  gameState = PLAY;
  
  restart.visible=false;
  
  fruitGroup.destroyEach();
  virusGroup.destroyEach();
  score = 0;
}
function virus(){
  if (frameCount % 200 === 0){
    var virusS = createSprite(600,height/2-100);
    virusS.velocityX = -2
    virusS.y = Math.round(random(350,600))
    
     
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: virusS.addImage(virus1);
               break;
       case 2: virusS.addImage(virus2);
               break;
       case 3: virusS.addImage(virus3);
               break;
       case 4: virusS.addImage(virus4);
               break;
       
       default: break;
     }
    
      
     virusS.scale = 0.1
     virusS.lifetime = 400
    boy.depth = virusS.depth+1
    virusGroup.add(virusS)
   //virusS.debug = true;
    //virus.add(virus);
  }
}

  function fruit(){
    if (frameCount % 300 === 0){
      var fruitS = createSprite(600,height/2-100);
      fruitS.velocityX = -2 
      fruitS.scale = 0.4
     // fruitS.debug= true;
      fruitS.y = Math.round(random(350,600))
      
       
       var rand = Math.round(random(1,2));
       switch(rand) {
         case 1: fruitS.addImage(appleImg);
                 break;
         case 2: fruitS.addImage(orangeImg);
                 break;
         
         
         default: break;
       }
       fruitS.lifetime = 400
       boy.depth = fruitS.depth+1
      fruitGroup.add(fruitS)
      }   
  
    }
    
    
          












































































