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
  // health
  this.health = 100;
  
};

// ============ (2) preload =================
// preload is used to load all of your assets to memory. 
// All your images, sounds, and other files will be ready. 
gameScene.preload = function (){
  this.load.image('player', 'assets/player.png');
  this.load.image('bgr', 'assets/bgr.png');
  this.load.image('enemy', 'assets/dragon.png');
  this.load.image('goal', 'assets/treasure.png');
  this.load.image('heart', 'assets/heart.png');
};
var timer;
// ============ (3) create ==================
// create is called once when preload is complete. 
// Create your sprite objects and display them 
gameScene.create = function () {
  //create background
  this.bg = this.add.sprite(0, 0, 'bgr');
  this.bg.setOrigin(0,0);

  //create players
  //this.player = this.add.sprite(50, config.height/2, 'player');
  //this.player.depth = 1;
  //this.player.setScale(0.3);
  //this.player.setInteractive();
  //this.player.on('clicked', this.clickHandler, this);

  // this.box = this.add.sprite(100, 100, 'heart');
  // this.box.setScale(.01);
  // this.box.setInteractive();
  // this.box.on('clicked', this.clickHandler, this);

  // this.input.on('gameobjectup', function (pointer, gameObject)
  //       {
  //           gameObject.emit('clicked', gameObject);
  //       }, this);

 


  //create health base
  this.health = this.add.sprite(135, 550, 'heart')
  this.health.setScale(0.01);
  //create enemies
  this.createEnemies();

  //create heart for health
  this.numHealth= 100;
  this.heart = this.add.sprite(650, config.height/12, 'heart');
  this.heart.setScale(0.01);
  this.healthBar = this.add.text(550, config.height/16, '100',{color: 'red'});
  this.healthBar.setStroke('#fff', 1);
  this.healthBar.setText('Health ' + this.numHealth);
  
 

  //create path
  this.path = new Phaser.Curves.Path(0, 275);

  this.path.lineTo(140, 275);
  this.path.lineTo(140, 195);
  this.path.lineTo(255, 195);
  this.path.lineTo(255, 460);   
  this.path.lineTo(420, 460);
  this.path.lineTo(420, 115);
  this.path.lineTo(140, 115);
  this.path.lineTo(140, 35);
  this.path.lineTo(515, 35);
  this.path.lineTo(515, 115);
  this.path.lineTo(615, 115);
  this.path.lineTo(615, 205);
  this.path.lineTo(515, 205);
  this.path.lineTo(515, 350);
  this.path.lineTo(135, 350);
  this.path.lineTo(135, 550);
  this.path.lineTo(300, 550);

  var rect = new Phaser.Geom.Rectangle(0, 265, 150 , 25);
  var rect2 = new Phaser.Geom.Rectangle(130, 180, 25 , 100);
  var rect3 = new Phaser.Geom.Rectangle(150, 180, 100 , 25);
  var rect4 = new Phaser.Geom.Rectangle(240, 180, 25 , 290);
  var rect5 = new Phaser.Geom.Rectangle(240, 450, 200 , 25);
  var rect6 = new Phaser.Geom.Rectangle(405, 100, 30 , 380);
  var rect7 = new Phaser.Geom.Rectangle(125, 100, 310 , 25);
  var rect8 = new Phaser.Geom.Rectangle(125, 25, 25 , 100);
  var rect9 = new Phaser.Geom.Rectangle(125, 25, 400 , 25);
  var rect10 = new Phaser.Geom.Rectangle(500, 25, 25 , 100);
  var rect11 = new Phaser.Geom.Rectangle(500, 100, 125 , 25);
  var rect12 = new Phaser.Geom.Rectangle(600, 100, 25 , 110);
  var rect13 = new Phaser.Geom.Rectangle(500, 190, 125 , 25);
  var rect14 = new Phaser.Geom.Rectangle(495, 190, 30 , 180);
  
  var rect15 = new Phaser.Geom.Rectangle(125, 340, 400 , 30);
  
  var rect16 = new Phaser.Geom.Rectangle(120, 340, 30 , 200);






  var graphics = this.add.graphics();
  graphics.lineStyle(1, 0xffffff, 1);
  this.path.draw(graphics, 64);

  graphics.strokeRectShape(rect);
  graphics.strokeRectShape(rect2);
  graphics.strokeRectShape(rect3);
  graphics.strokeRectShape(rect4);
  graphics.strokeRectShape(rect5);
  graphics.strokeRectShape(rect6);
  graphics.strokeRectShape(rect7);
  graphics.strokeRectShape(rect8);
  graphics.strokeRectShape(rect9);
  graphics.strokeRectShape(rect10);
  graphics.strokeRectShape(rect11);
  graphics.strokeRectShape(rect12);
  graphics.strokeRectShape(rect13);
  graphics.strokeRectShape(rect14);
  graphics.strokeRectShape(rect15);
  graphics.strokeRectShape(rect16);


  // this.ball1 = this.add.follower(this.path, 0, 275, 'enemy');
  // this.ball1.setScale(.3);
  // this.ball1.startFollow(10000);
  // this.ball1.rotateToPath= true;
  // this.ball1.setTexture('player');

  // this.ba = this.add.sprite(20,20,'player');
  // this.ba.setInteractive();

  //   this.ba.input.on('pointerdown', function (pointer,gameObject) {

  //       this.ba.setVisable(true);

  //   });

  //   this.ba.input.on('pointerup', function () {

  //     this.ba.setVisable(false);

  //   });

  //   this.ba.input.on('pointermove', function (pointer, gameObject) {   
  //         ba.setVisable(true);
  //   }
  // );

    
    this.input.on('pointerdown', function (pointer) {

        console.log(this.game.loop.frame, 'down B');

        this.add.sprite(pointer.x, pointer.y, 'enemy');

    }, this);



    this.redBloon = {
      color: 'player',
      health: 5,
      startX: 0,
      startY: 275,
      bloonArr: [],
      damage : 5,
    };

    this.blueBloon = {
      color: 'player',
      health: 10,
      startX: 0,
      startY: 275,
      bloonArr: [],
      damage : 10,
    };

    this.blackBloon = {
      color: 'player',
      health: 25,
      startX: 0,
      startY: 275,
      bloonArr: [],
      damage : 25,
    };

    // this.ball2 = this.add.follower(this.path, this.redBloon.startX, this.redBloon.startY, this.redBloon.color);
    // this.ball2.startFollow(15000);
    // 
    
    
   

    this.createEnemies(this.blackBloon, 1);





};

// ============ (4) update ==================
// After setup is complete, update is called on a loop 
// for each frame during game play.
gameScene.update = function () {  





  
  // check if player overlaps the goal
  this.updateEnemies();
  //this.info.setText('\nTime: ' + Math.floor(10000 - timer.getElapsed()));
};

//checks if two sprites intersect
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
};


//create rounds of enemies
gameScene.createEnemies = function(bloonType, numBloon){
  let followTime = 10000;
  for(let i = 0; i < numBloon; i++){
    let bloon = this.add.follower(this.path, bloonType.startX, bloonType.startY, bloonType.color);
    bloonType.bloonArr.push(bloon);
    bloon.setScale(0.3);
    bloon.startFollow(followTime);
    bloon.rotateToPath = true;
    followTime += 1000;
  }
}

 gameScene.updateEnemies = function(){
  for(let i = 0; i < this.redBloon.bloonArr.length; i++){
    let enemy = this.redBloon.bloonArr[i];

    if(checkOverlap(this.health, enemy)) {
      //console.log('goal reached');
      this.numHealth -= this.redBloon.damage;
      enemy.setActive(false);
      enemy.setX(800);
      enemy.setY(50);
      enemy.setVisible(false);
      this.healthBar.setText(' ' + this.numHealth );
      
    }
    if(this.numHealth < 1){
      this.scene.restart();
    }
  } 
    for(let i = 0; i < this.blueBloon.bloonArr.length; i++){
    let enemy = this.blueBloon.bloonArr[i];

    if(checkOverlap(this.health, enemy)) {
      //console.log('goal reached');
      this.numHealth -= this.blueBloon.damage;
      enemy.setActive(false);
      enemy.setX(800);
      enemy.setY(50);
      enemy.setVisible(false);
      this.healthBar.setText(' ' + this.numHealth );
      
    }
    if(this.numHealth < 1){
      this.scene.restart();
    }
  }


for(let i = 0; i < this.blackBloon.bloonArr.length; i++){
  let enemy = this.blackBloon.bloonArr[i];

  if(checkOverlap(this.health, enemy)) {
    //console.log('goal reached');
    this.numHealth -= this.blackBloon.damage;
    enemy.setActive(false);
    enemy.setX(800);
    enemy.setY(50);
    enemy.setVisible(false);
    this.healthBar.setText(' ' + this.numHealth );
    
  }
  if(this.numHealth < 1){
    this.scene.restart();
  }
} }


function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max-min+1))+ min;
}










// gameScene.clickHandler = function(box)
//     {
//         box.off('clicked', this.clickHandler);
//         box.input.enabled = false;
//         box.setVisible(false);
//         //box.x = pointer.x;
//     }

// set the configuration of the game
let config = {
  type: Phaser.AUTO, 
  width: 697,
  height: 502,
  scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);
