var dog, doghappy, dogImg2;
var foodS = 0;
var milk, milkImg;
var fedTime, lastFed;
var foodObj;
var foodStock;

function preload()
{
  dogImg2 = loadImage("images/dogImg.png");
  doghappy = loadImage("images/dogImg1.png");
  

}

function setup() {

  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,10,10);

  


  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){

    lastFed  = data.val();

  });



  dog.addImage("dog_original", dogImg2);
  dog.addImage("happy",doghappy);
  dog.scale = 0.2;

 
  milk1 = new Food();

  feed = createButton("Feed the dog");
  feed.position(400, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(750, 95);
  addFood.mousePressed(addFoods);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  

  background(46, 200, 87);
  textSize(20);
  text("Food left : " + foodS, 200, 400);

  if (lastFed>=12){
    text("Last feed : ", + lastFed%12 + "PM", 350, 30);
  }
  else if(lastFed === 0){
    text("Last feed : 12 AM", 350, 30);
  }
  else {
    text("Last feed : ", + lastFed + "AM", 350, 30);
  }

  milk1.display();
  drawSprites();

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);
}

 function writeStock(x){

  if (x<=0){
    x=0;
  }
  else{
    x = x - 1;
    database.ref('/').update({
    Food : x
    })
  }
 }
function feedDog(){
  dog.addImage(doghappy);

  foodObj.updateFoodStock(milk.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}