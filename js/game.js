// create a new scene
let gameScene = new Phaser.Scene('Game');

// ============= (1) init ===================
// init is the first function that is called. 
// Initiate certain variables or objects for your scene here. 
gameScene.init = function (){
  //Player speed
  this.playerSpeed = 2;
  //Enemy speed
  this.enemySpeed = 2;
  //Enemy boundaries
  this.enemyMinY = 0;
  this.enemyMaxY = config.height;

this.enemies = [];
  this.enemyCount = 4;
  this.enemySpawnX = 150;
  this.enemySpacing = 100;

};

// ============ (2) preload =================
// preload is used to load all of your assets to memory. 
// All your images, sounds, and other files will be ready. 
gameScene.preload = function (){
  this.load.image('player', 'assets/player.png');
  this.load.image('background', 'assets/background.png');
  this.load.image('enemy', 'assets/dragon.png');
  this.load.image('goal', 'assets/treasure.png');
};

// ============ (3) create ==================
// create is called once when preload is complete. 
// Create your sprite objects and display them 
gameScene.create = function () {
  // create background sprite
  this.bg = this.add.sprite(0, 0, 'background');
  // change the sprite origin to the top-left corner
  this.bg.setOrigin(0,0);

  // create the player sprite
  this.player = this.add.sprite(50, config.height/2, 'player');
  this.player.depth = 1;
  this.player.setScale(0.3);

  //console.log(this.player);

  //create the enemy sprites
this.createEnemies();

  //create the goal sprite
  this.goal = this.add.sprite(550, config.height/2, 'goal');
  this.goal.setScale(0.6);
};

// ============ (4) update ==================
// After setup is complete, update is called on a loop 
// for each frame during game play.
gameScene.update = function () {  
  //check for active pointer (left mouse click or touch press)
  
  
  if(this.input.activePointer.isDown) {
    this.player.x += this.playerSpeed;
  }

  // check if player overlaps the goal


    this.updateEnemies();
};

//checks if two sprites intersect
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
};

gameScene.createEnemies = function(){
for(let i = 0; i < this.enemyCount; i++){
  let enemy = this.add.sprite(0,0,'enemy');
  this.enemies.push(enemy);
  //console.log(this.enemies);

  enemy.x = this.enemySpawnX + (this.enemySpacing*i);
  enemy.y = getRandomInt(this.enemyMinY, this.enemyMaxY);
  
  //enemy.y = config.height/2;
  enemy.flipX =true;
  enemy.setScale(0.6);
  enemy.speed = this.enemySpeed;
  }
}

 gameScene.updateEnemies = function(){


   for(let i = 0; i < this.enemies.length; i++){
     let enemy = this.enemies[i];

     enemy.y += enemy.speed;
     
     let hitBottom = enemy.y >= this.enemyMaxY;
     let hitTop = enemy.y <= this.enemyMinY;
     if (hitBottom || hitTop) {
    enemy.speed *= -1;
  }

         if(checkOverlap(this.player, enemy)) {
    //console.log('goal reached');
    this.scene.restart();
  }
     
   }
  // Move enemy
  /*this.enemy1.y += this.enemySpeed;
  
  // condition if the enemy hit the boundary
  let hitBottom = this.enemy1.y >= this.enemyMaxY;
  let hitTop = this.enemy1.y <= this.enemyMinY;
  
  // if the enemy is at the boundary, reverse
  if (hitBottom || hitTop) {
    this.enemySpeed *= -1;
  }*/
}

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max-min+1))+ min;
}


// set the configuration of the game
let config = {
  type: Phaser.AUTO, 
  width: 640,
  height: 360,
  scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);
