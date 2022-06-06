// create a new scene
let gameScene = new Phaser.Scene('Game');

// ============= (1) init ===================
// init is the first function that is called. 
// Initiate certain variables or objects for your scene here. 
gameScene.init = function() {
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

    const enemyArr = [];

};


class Enemy extends Phaser.GameObjects.PathFollower {
    //official constructor
    constructor(color, health, startX, startY, damage, speed) {
        super(this, startX, startY, color);
        //scene, path, x, y, texture
        //this.add.follower(this.path, startX, startY, color);

        // bloon.setScale(0.8);
        // bloon.flipX = true;
        // var followTime = bloonType.speed;
        // bloon.startFollow(followTime);
        // bloon.rotateToPath = true;


        //this.color = color;
        // this.startX = startX;
        // this.startY = startY;
        this.health = health;
        this.damage = damage;
        this.speed = speed;

        //this.add.follower(this.path, startX, startY, key, frame);
    }

    //simpler "constructor" (but you can't really have 2 in js)
    static createRedEnemy(health) {
            return new Enemy('red', 60, 0, 275, 5, 18000);
        }
        //class mutator method
    loseHealth(h) {
        this.health -= h;
    }
}


// ============================== (2) preload ==========================================
// preload is used to load all of your assets to memory. 
// All your images, sounds, and other files will be ready. 
gameScene.preload = function() {
    this.load.image('player', 'assets/player.png');
    this.load.image('bgr', 'assets/bgr.png');
    this.load.image('enemy', 'assets/dragon.png');
    this.load.image('goal', 'assets/treasure.png');
    this.load.image('heart', 'assets/heart.png');
    this.load.image('darts', 'assets/pacman.png');
    this.load.image('red', 'assets/nazibloonred.png');
    //this.load.image('redbloon', 'assets/nazibloonred.png');
    //this.load.image('bluebloon', 'assets/nazibloonsblue.png');
    //this.load.image('blackbloon', 'assets/nazibloonblack.png');
    this.load.image('us', 'assets/ussoldier.png');
    this.load.image('money', 'assets/money.png');
    this.load.image('bullet', 'assets/bullet.png');


    this.load.audio('hit', '8bit.mp3');


};





// ======================================= (3) create =======================================
gameScene.create = function() {
    //create background
    this.bg = this.add.sprite(0, 0, 'bgr');
    this.bg.setOrigin(0, 0);

    //adding sound
    var hit = this.sound.add('hit');

    //create health base
    this.health = this.add.sprite(135, 550, 'heart')
    this.health.setScale(0.01);
    //create enemies
    //this.createEnemies();

    //create heart for health
    this.numHealth = 100;
    this.heart = this.add.sprite(650, config.height / 12, 'heart');
    this.heart.setScale(0.01);
    this.healthBar = this.add.text(550, config.height / 16, '100', { color: 'red' });
    this.healthBar.setStroke('#fff', 1);
    this.healthBar.setText('Health ' + this.numHealth);

    //create money for money
    this.money = 100;
    this.dollar = this.add.sprite(650, config.height / 7, 'money');
    this.dollar.setScale(0.06);
    this.moneyBar = this.add.text(550, config.height / 9, '100', { color: 'blue' });
    this.moneyBar.setStroke('#fff', 1);
    this.moneyBar.setText('Money ' + this.numHealth);

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

    var rect = new Phaser.Geom.Rectangle(0, 265, 150, 25);
    var rect2 = new Phaser.Geom.Rectangle(130, 180, 25, 100);
    var rect3 = new Phaser.Geom.Rectangle(150, 180, 100, 25);
    var rect4 = new Phaser.Geom.Rectangle(240, 180, 25, 290);
    var rect5 = new Phaser.Geom.Rectangle(240, 450, 200, 25);
    var rect6 = new Phaser.Geom.Rectangle(405, 100, 30, 380);
    var rect7 = new Phaser.Geom.Rectangle(125, 100, 310, 25);
    var rect8 = new Phaser.Geom.Rectangle(125, 25, 25, 100);
    var rect9 = new Phaser.Geom.Rectangle(125, 25, 400, 25);
    var rect10 = new Phaser.Geom.Rectangle(500, 25, 25, 100);
    var rect11 = new Phaser.Geom.Rectangle(500, 100, 125, 25);
    var rect12 = new Phaser.Geom.Rectangle(600, 100, 25, 110);
    var rect13 = new Phaser.Geom.Rectangle(500, 190, 125, 25);
    var rect14 = new Phaser.Geom.Rectangle(495, 190, 30, 180);
    var rect15 = new Phaser.Geom.Rectangle(125, 340, 400, 30);
    var rect16 = new Phaser.Geom.Rectangle(120, 340, 30, 200);

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

    this.hero = {
        color: 'player',
        heroArr: [],
        dartArr: [],
        damage: 5,
        shootSpeed: 4

    };
    // this.monkey1 = this.add.sprite(300, 300, 'us');
    // this.dart1 = this.add.sprite(50, 50, 'darts');
    // this.dart1.setScale(.1);
    // this.hero.heroArr.push(this.monkey1);
    // this.hero.dartArr.push(this.dart1);
    // this.physics.add.existing(this.dart1);
    // this.physics.moveToObject(this.dart1, this.monkey1, 100);



    this.input.on('pointerdown', function(pointer) {
        let monkey = this.add.sprite(pointer.x, pointer.y, 'us');
        let dart = this.add.sprite(pointer.x, pointer.y, 'bullet');
        this.physics.add.existing(dart);

        // dart.setVisible(false);
        monkey.setScale(0.4);
        monkey.flipX = true;
        dart.setScale(.009);
        this.hero.heroArr.push(monkey);
        this.hero.dartArr.push(dart);
    }, this);



    // this.redBloon = {
    //   color: 'redbloon',
    //   health: 60,
    //   startX: 0,
    //   startY: 275,
    //   bloonArr: [],
    //   healthArr: [],
    //   damage : 5,
    //   speed : 18000,
    // };



    // this.blueBloon = {
    //   color: 'bluebloon',
    //   health: 10,
    //   startX: 0,
    //   startY: 275,
    //   bloonArr: [],
    //   healthArr: [],
    //   damage : 10,
    //   speed : 6000,
    // };

    // this.blackBloon = {
    //   color: 'blackbloon',
    //   health: 25,
    //   startX: 0,
    //   startY: 275,
    //   bloonArr: [],
    //   healthArr: [],
    //   damage : 25,
    //   speed : 17000,
    // };


    //this.createEnemies(this.blackBloon, 5);
    //this.createEnemies(this.blueBloon, 3);

    //this.createEnemies(this.redBloon, 3);
    this.createEnemies('red', 3);
    // this.createEnemies(this.blackBloon, 3);
};




// ============ (4) update =============================================================
// After setup is complete, update is called on a loop 
// for each frame during game play.
gameScene.update = function() {
    // check if player overlaps the goal
    this.updateEnemies();
    this.updateHealth2();
    //this.info.setText('\nTime: ' + Math.floor(10000 - timer.getElapsed()));
    //this.attack(this.redBloon);
};


//==========================Functions========================================

//checks if two sprites intersect
function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
};



/*
gameScene.attack = function(bloonType){

  //loop thru all the heros/monkeys
  for(let j = 0; j < this.hero.heroArr.length; j++){
    
    //loop thru all bloons of a specific bloontype (red)?
    //for(let i = 0; i < bloonType.bloonArr.length; i++){
    //find closest bloon??
    
    //attack the first bloon only
    let i = 0;
      
    //set a range to shoot when within 250 pixels
    let range  = 250;
    if(Math.abs(this.hero.heroArr[j].x - this.redBloon.bloonArr[i].x) < range && Math.abs(this.hero.heroArr[j].y - bloonType.bloonArr[i].y) < range){
      
      //move all the darts to "heatseek"
      this.physics.moveToObject(this.hero.dartArr[j], this.redBloon.bloonArr[i], 200);
    }
    
    console.log('Num of total hero darts: ' + this.hero.dartArr.length);

    //check every dart to see if it has hit a bloon
    for(let k = 0; k<this.hero.dartArr.length; k++){
          
      //check if dart overlaps with a bloon
      if(checkOverlap(this.redBloon.bloonArr[i], this.hero.dartArr[k])){  
        
        //subtract health from the bloon
        this.redBloon.bloonArr[i].health -= 10;
        console.log("hit an enemy!");
        console.log(this.redBloon.bloonArr[i].health);

        //send the dart back to it's hero
        this.hero.dartArr[j].setX(this.hero.heroArr[j].x);
        this.hero.dartArr[j].setY(this.hero.heroArr[j].y);
      }

    }

    //send the dart back if it is within range of a specific bloon
    // if(Math.abs(this.hero.heroArr[j].x - bloonType.bloonArr[i].x) > range && Math.abs(this.hero.heroArr[j].y - bloonType.bloonArr[i].y) > range){

    //   this.hero.dartArr[j].setX(this.hero.heroArr[j].x);
    //   this.hero.dartArr[j].setY(this.hero.heroArr[j].y);
    // }

  }
}

  // this.monkey1 = this.add.sprite(300, 300, 'us');
  // this.dart1 = this.add.sprite(50, 50, 'darts');
  // this.dart1.setScale(.1);
  // this.hero.heroArr.push(this.monkey1);
  // this.hero.dartArr.push(this.dart1);
  // this.physics.add.existing(this.dart1);
  // this.physics.moveToObject(this.dart1, this.monkey1, 100);
*/



//create rounds of enemies
gameScene.createEnemies = function(color, numEnemies) {

    for (let i = 0; i < numEnemies; i++) {

        if (color == 'red') {
            let en = Enemy.createRedEnemy(10);
            //let en = this.add.follower(this.path, bloonType.startX, bloonType.startY, bloonType.color);
            this.enemyArr.push(en); //adds an enemy to the end of the enemyArr array
        }


        // bloonType.healthArr.push(hp);
        // bloon.setScale(0.8);
        // bloon.flipX = true;
        // var followTime = bloonType.speed;
        // bloon.startFollow(followTime);
        // bloon.rotateToPath = true;
        // bloonType.speed += 1000;    //creates a gap between a set of enemies

    }
}

//OLD createEnemies() function
// gameScene.createEnemies = function(bloonType, numBloon){
//   // var followTime = bloonType.speed;
//   for(let i = 0; i < numBloon; i++){
//     let bloon = this.add.follower(this.path, bloonType.startX, bloonType.startY, bloonType.color);
//     let hp = bloonType.health;
//     bloonType.bloonArr.push(bloon);
//     bloonType.healthArr.push(hp);
//     bloon.setScale(0.8);
//     bloon.flipX = true;
//     var followTime = bloonType.speed;
//     bloon.startFollow(followTime);
//     bloon.rotateToPath = true;
//     bloonType.speed += 1000;    //creates a gap between a set of enemies
//   }
// }


gameScene.updateEnemies = function() {
        for (let i = 0; i < this.enemyArr.length; i++) {
            let enemy = this.enemyArr[i];

            if (checkOverlap(this.health, enemy)) {
                //console.log('goal reached');
                //this.hit.play();
                this.numHealth -= this.enemy.damage;
                enemy.setActive(false);
                enemy.setX(800);
                enemy.setY(50);
                enemy.setVisible(false);
                this.healthBar.setText(' ' + this.numHealth);

            }
            if (this.numHealth < 1) {
                this.scene.restart();
            }
        }
    }
    /*
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
      */



//  gameScene.updateEnemies = function(){
//   for(let i = 0; i < this.redBloon.bloonArr.length; i++){
//     let enemy = this.redBloon.bloonArr[i];

//     if(checkOverlap(this.health, enemy)) {
//       //console.log('goal reached');
//       //this.hit.play();
//       this.numHealth -= this.redBloon.damage;
//       enemy.setActive(false);
//       enemy.setX(800);
//       enemy.setY(50);
//       enemy.setVisible(false);
//       this.healthBar.setText(' ' + this.numHealth );

//     }
//     if(this.numHealth < 1){
//       this.scene.restart();
//     }
//   } 
//     for(let i = 0; i < this.blueBloon.bloonArr.length; i++){
//     let enemy = this.blueBloon.bloonArr[i];

//     if(checkOverlap(this.health, enemy)) {
//       //console.log('goal reached');
//       this.numHealth -= this.blueBloon.damage;
//       enemy.setActive(false);
//       enemy.setX(800);
//       enemy.setY(50);
//       enemy.setVisible(false);
//       this.healthBar.setText(' ' + this.numHealth );

//     }
//     if(this.numHealth < 1){
//       this.scene.restart();
//     }
//   }


// for(let i = 0; i < this.blackBloon.bloonArr.length; i++){
//   let enemy = this.blackBloon.bloonArr[i];

//   if(checkOverlap(this.health, enemy)) {
//     //console.log('goal reached');
//     this.numHealth -= this.blackBloon.damage;
//     enemy.setActive(false);
//     enemy.setX(800);
//     enemy.setY(50);
//     enemy.setVisible(false);
//     this.healthBar.setText(' ' + this.numHealth );
//   }

//   if(this.numHealth < 1){
//     this.scene.restart();
//   }
//   } 
// }

gameScene.updateHealth = function(dart, heroI) {
    for (let i = 0; i < this.enemyArr.length; i++) {
        for (let j = 0; j < this.hero.heroArr.length; j++) {

            var en = this.enemyArr[i];


            //check for collissions between darts and enemies
            if (checkOverlap(dart, en)) {
                en.health -= this.hero.heroArr[j].damage;

                //return to hero????
                this.hero.dartArr[j].setX(this.hero.heroArr[j].x);
                this.hero.dartArr[j].setY(this.hero.heroArr[j].y);
            }

            //hide enemy if health below 1
            if (en.health < 1) {
                en.setActive(false);
                en.setVisible(false);
                en.setX(800);
                en.setY(200);

            }

        }
    }
}
gameScene.updateHealth2 = function() {
    for (let i = 0; i < this.hero.dartArr.length; i++) {
        this.updateHealth(this.hero.dartArr[i], i);

    }
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// set the configuration of the game
let config = {
    type: Phaser.AUTO,
    width: 697,
    height: 502,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: gameScene,

};

// create a new game, pass the configuration
let game = new Phaser.Game(config);