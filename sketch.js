var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

  var boy,boyI,boyI2;
  var hole,holeI,holeG;
  var lid,lidG
  var bg1,bg1I,bg2,bg2I;
  var coveredhole;
  var fairy , FI;
  var GO;
  var boyend
  var gameState = "menu"
  
  
function preload()
{
  boyI = loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png");
  boyI2 = loadImage("kid2.png");
  holeI = loadImage("hole.png");
  lidI = loadImage("lid.png");
  bg1I = loadImage("bg1.png");
  bg2I = loadImage("bg2.png");
  FI = loadImage("fairy.png")
  GO = loadImage("GO.png")
  boyend = loadImage("b5.png")
}
function setup()
{
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  
  bg1 = createSprite(400,400);
  bg1.addImage(bg1I);
  bg1.scale = 2

  bg2 = createSprite(1200,400);
  bg2.addImage(bg2I);
  bg2.scale = 2;

  fairy=createSprite(550,200);
  fairy.addImage(FI);
  boy = createSprite(350,650)
  boy.addAnimation("walking",boyI);
  boy.scale = 1.5
  boy.debug = true;
  boy.setCollider("rectangle",-175,0,50,boy.height)

 button = createSprite(400,300,100,100);
  button.visible=false

  holeG = createGroup();
  lidG= createGroup();
}
function draw() 
{
  background("black");

if(gameState === "menu")
{
  button.visible=true
background("skyblue")
text("press space to save the boy",400,200)


if(mousePressedOver(button))
{
  gameState = "play"
}

}
if (gameState==="play")
{ 
  
   bg1.velocityX = -2;
  bg2.velocityX = -2;

if(bg1.x===-400)
{
  bg1.x = 1200;
}
if(bg2.x===-400)
{
  bg2.x = 1200;
} 
if(World.frameCount%100==0)
{
  hole = createSprite(800,770);
  hole.addImage(holeI)
  hole.velocityX = -2;
  hole.setCollider("rectangle",0,0,50,10);
  hole.lifetime = 600;
  holeG.add(hole);
  hole.debug = true
}

if(keyWentDown("space"))
{
  lid = createSprite(400,200);
  lid.addImage(lidI);
  lid.velocityY = 5;
  lidG.add(lid);
  lid.setCollider("rectangle",0,0,50,10);
}
if(boy.isTouching(holeG))
{
  gameState="end"
   
 
}
if(holeG.length>0&&lidG.length>0){
  for(var i = 0;i<holeG.length;i++)
  {
    for(var j = 0;j<lidG.length;j++)
    {
      if(lidG.get(j).collide(holeG.get(i)))
  {
   coveredhole=createSprite(holeG.get(i).x,holeG.get(i).y)
   coveredhole.addImage(lidI);
   lidG.get(j).destroy();
   holeG.get(i).destroy();
   //holeState="closed"
   coveredhole.lifetime=5;
   
   }
  }
}
}
drawSprites();
}
if(gameState==="end"){
  boy.addImage(boyend);
background("black");
  holeG.destroyEach();
  fairy.x=400;
  fairy.y=400;
  fairy.addImage(GO);
}

}

