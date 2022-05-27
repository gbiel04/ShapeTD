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

// ============ (3) create ==================
// create is called once when preload is complete. 
// Create your sprite objects and display them 
gameScene.create = function () {
  //create background
  this.bg = this.add.sprite(0, 0, 'bgr');
  this.bg.setOrigin(0,0);

  //create players
  this.player = this.add.sprite(50, config.height/2, 'player');
  //this.player.depth = 1;
  this.player.setScale(0.3);
  //this.player.setInteractive();
  //this.player.on('clicked', this.clickHandler, this);

  let emitter = new Phaser.Events.EventEmitter();
  emitter.on('addImage', this.handler, this);
        emitter.emit('addImage', 200, 300);
        emitter.emit('addImage', 400, 300);
        emitter.emit('addImage', 600, 300);

  this.box = this.add.sprite(100, 100, 'heart');
  this.box.setScale(.01);
  this.box.setInteractive();
  this.box.on('clicked', this.clickHandler, this);

  this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);

  //this.info = this.add.text(10, 10, '', { font: '48px Arial', fill: '#000000' });
  //this.timer = this.time.addEvent({ delay: 10000, callback: this.gameOver, callbackScope: this });


  //create health base
  this.health = this.add.sprite(135, 550, 'heart')
  this.health.setScale(0.01);
  //create enemies
  this.createEnemies();

  //create heart for health
  this.heart = this.add.sprite(650, config.height/12, 'heart');
  this.heart.setScale(0.01);
  this.healthBar = this.add.text(550, config.height/16, 'health',{color: 'red'});
  this.healthBar.setStroke('#fff', 1);
 

  //create path
  var path = new Phaser.Curves.Path(0, 275);

  path.lineTo(140, 275);
  path.lineTo(140, 195);
  path.lineTo(255, 195);
  path.lineTo(255, 460);   
  path.lineTo(420, 460);
  path.lineTo(420, 115);
  path.lineTo(140, 115);
  path.lineTo(140, 35);
  path.lineTo(515, 35);
  path.lineTo(515, 115);
  path.lineTo(615, 115);
  path.lineTo(615, 205);
  path.lineTo(515, 205);
  path.lineTo(515, 350);
  path.lineTo(135, 350);
  path.lineTo(135, 550);

  var rect = new Phaser.Geom.Rectangle(50, 50, 50 , 50);
  var rect2 = new Phaser.Geom.Rectangle(50, 50, 50 , 50);
  var rect3 = new Phaser.Geom.Rectangle(50, 50, 50 , 50);
  var rect4 = new Phaser.Geom.Rectangle(50, 50, 50 , 50);
  var rect5 = new Phaser.Geom.Rectangle(50, 50, 50 , 50);




  var graphics = this.add.graphics();
  graphics.lineStyle(1, 0xffffff, 1);
  path.draw(graphics, 64);

  graphics.strokeRectShape(rect);
  graphics.strokeRectShape(rect2);
  graphics.strokeRectShape(rect3);
  graphics.strokeRectShape(rect4);
  graphics.strokeRectShape(rect5);

  this.ball1 = this.add.follower(path, 0, 275, 'enemy');
  this.ball1.setScale(.3);
  this.ball1.startFollow(10000);
  this.ball1.rotateToPath= true;

};

// ============ (4) update ==================
// After setup is complete, update is called on a loop 
// for each frame during game play.
gameScene.update = function () {  
  //check for active pointer (left mouse click or touch press)
  // if(this.input.activePointer.isDown) {
  //   this.player.x +=this.playerSpeed;
  // }

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

gameScene.createEnemies = function(){
//for(let i = 0; i < this.enemyCount; i++){
  //let enemy = this.add.sprite(0,0,'enemy');
  //this.enemies.push(enemy);
  //console.log(this.enemies);

  //enemy.x = this.enemySpawnX + (this.enemySpacing*i);
  //enemy.y = getRandomInt(this.enemyMinY, this.enemyMaxY);
  
  //enemy.y = config.height/2;
  //enemy.flipX =true;
  //enemy.setScale(0.6);
  //enemy.speed = this.enemySpeed;
  //}
}

 gameScene.updateEnemies = function(){
  /*for(let i = 0; i < this.enemies.length; i++){
    let enemy = this.enemies[i];
    enemy.y += enemy.speed;
    let hitBottom = enemy.y >= this.enemyMaxY;
    let hitTop = enemy.y <= this.enemyMinY;

    if (hitBottom || hitTop) {
      enemy.speed *= -1;
    }}*/ 

    if(checkOverlap(this.health, this.ball1)) {
        //console.log('goal reached');
        this.scene.restart();
      }
   
 
}

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max-min+1))+ min;
}

// function attack(range, enemyArr){
//   for(i = 0; i<enemyArr.length; i++){

//   }
  



// }

gameScene.handler = function(x, y) 
    {
        this.add.sprite(x, y, 'player');
    }

gameScene.clickHandler = function(box)
    {
        box.off('clicked', this.clickHandler);
        box.input.enabled = false;
        box.setVisible(false);
    }

// set the configuration of the game
let config = {
  type: Phaser.AUTO, 
  width: 697,
  height: 502,
  scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);
