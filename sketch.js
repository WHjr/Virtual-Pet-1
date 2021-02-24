//Create variables here
var dog
var foodS

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(800, 700);

  database = firebase.database()
  foodref = database.ref('Milk');
  foodref.on("value",readStock)
  
  dog = createSprite(400,350,10,10)
  dog.addImage("normal",dogImg)
  dog.addImage("happy",dogImg1)
  dog.scale = 0.5
  
}


function draw() {  

  background("white");

  

  drawSprites();
  text("Milk bottles left : " + foodS, 200,30)
  //add styles here

  if(foodS === 0){
    text("Ran out of milk!",200,50)
    text("Click R to restock ",200,70)
  }

}

function writeStock(x){
  database.ref('/').set({
    Milk : x
  })
}

function readStock(data){
  foodS = data.val()
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    if(foodS>0){
    dog.changeImage("happy")
    foodS = foodS-1
    writeStock(foodS)
    }
    else{
      foodS = 0
    }
  }
  if(keyCode === 82 && foodS === 0){
    foodS = 20
  }
}
function keyReleased(){
  if(keyCode === UP_ARROW){
    dog.changeImage("normal")
  }
}


