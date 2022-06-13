
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

    this.enemyArr = [];
    this.enemyCount = 4;
    this.enemySpawnX = 150;
    this.enemySpacing = 100;
    // health
    this.health = 100;

    //const enemyArr = [];


};





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
    this.load.image('blue', 'assets/nazibloonsblue.png');
    this.load.image('black', 'assets/nazibloonblack.png');
    this.load.image('us', 'assets/ussoldier.png');
    this.load.image('money', 'assets/money.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('h1', 'assets/h1.png');
    this.load.image('h2', 'assets/h2.png');
    this.load.audio('hit', 'assets/8bit.mp3');
    this.load.audio('lost','assets/lost.mp3');
};



// ======================================= (3) create =======================================
gameScene.create = function() {
    //create background
    this.bg = this.add.sprite(0, 0, 'bgr');
    this.bg.setOrigin(0, 0);


    //adding sound
    this.hit = this.sound.add('hit');
this.lost = this.sound.add('lost');
    //create health base
    this.health = this.add.sprite(135, 550, 'heart')
    this.health.setScale(0.01);
    //create enemies
    //this.createEnemies();

    //create heart for health
    this.numHealth = 100;
    this.heart = this.add.sprite(670, config.height / 12, 'heart');
    this.heart.setScale(0.01);
    this.healthBar = this.add.text(550, config.height / 16, '100', { color: 'red' });
    this.healthBar.setStroke('#fff', 1);
    this.healthBar.setText('Health ' + this.numHealth);
    this.healthBar.setDepth(2);

    //instructions
    this.instructions = this.add.text(500, config.height - 30, 'P to start next round \n Q to restart', {fontSize: '15px', color: 'red'});

    //create money for money
    this.money = 100;
    this.dollar = this.add.sprite(650, config.height / 7, 'money');
    this.dollar.setScale(0.06);
    this.moneyBar = this.add.text(550, config.height / 9, '100', { color: 'blue' });
    this.moneyBar.setStroke('#fff', 1);
    this.moneyBar.setDepth(2);
    // this.moneyBar.setText('Money ' + this.money);

    //round counter
    this.roundNum = 0;
    this.round = this.add.text(50, config.height/14, this.roundNum, {fontSize: '30px', color: 'black'});

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

    //Create rectangles for Path?
    //this.rect = new Phaser.Geom.Rectangle(x, y, width, height);
    this.rect = new Phaser.Geom.Rectangle(0, 230, 150, 90);
    this.rect2 = new Phaser.Geom.Rectangle(105, 160, 70, 130);
    this.rect3 = new Phaser.Geom.Rectangle(150, 160, 100, 85);
    this.rect4 = new Phaser.Geom.Rectangle(210, 170, 80, 310);
    this.rect5 = new Phaser.Geom.Rectangle(240, 420, 200, 70);
    this.rect6 = new Phaser.Geom.Rectangle(380, 80, 80, 400);
    this.rect7 = new Phaser.Geom.Rectangle(115, 80, 330, 70);
    this.rect8 = new Phaser.Geom.Rectangle(105, 15, 70, 100);
    this.rect9 = new Phaser.Geom.Rectangle(105, 15, 440, 48);
    this.rect10 = new Phaser.Geom.Rectangle(480, 15, 70, 130);
    this.rect11 = new Phaser.Geom.Rectangle(480, 80, 160, 65);
    this.rect12 = new Phaser.Geom.Rectangle(580, 80, 60, 140);
    this.rect13 = new Phaser.Geom.Rectangle(480, 170, 140, 60);
    this.rect14 = new Phaser.Geom.Rectangle(480, 170, 60, 200);
    this.rect15 = new Phaser.Geom.Rectangle(110, 325, 440, 60);
    this.rect16 = new Phaser.Geom.Rectangle(110, 325, 60, 200);




    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0x000000, 1);
    this.path.draw(graphics, 64);

    // graphics.strokeRectShape(this.rect);
    // graphics.strokeRectShape(this.rect2);
    // graphics.strokeRectShape(this.rect3);
    // graphics.strokeRectShape(this.rect4);
    // graphics.strokeRectShape(this.rect5);
    // graphics.strokeRectShape(this.rect6);
    // graphics.strokeRectShape(this.rect7);
    // graphics.strokeRectShape(this.rect8);
    // graphics.strokeRectShape(this.rect9);
    // graphics.strokeRectShape(this.rect10);
    // graphics.strokeRectShape(this.rect11);
    // graphics.strokeRectShape(this.rect12);
    // graphics.strokeRectShape(this.rect13);
    // graphics.strokeRectShape(this.rect14);
    // graphics.strokeRectShape(this.rect15);
    // graphics.strokeRectShape(this.rect16);

    this.road = {
        roadArr: []
    };
this.road.roadArr.push(this.rect);
this.road.roadArr.push(this.rect2);
this.road.roadArr.push(this.rect3);
this.road.roadArr.push(this.rect4);
this.road.roadArr.push(this.rect5);
this.road.roadArr.push(this.rect6);
this.road.roadArr.push(this.rect7);
this.road.roadArr.push(this.rect8);
this.road.roadArr.push(this.rect9);
this.road.roadArr.push(this.rect10);
this.road.roadArr.push(this.rect11);
this.road.roadArr.push(this.rect12);
this.road.roadArr.push(this.rect13);
this.road.roadArr.push(this.rect14);
this.road.roadArr.push(this.rect15);
this.road.roadArr.push(this.rect16);

    this.hitbox = {
        hitboxArr: []
    }; 


    this.hero = {
        color: 'player',
        heroArr: [],
        dartArr: [],
        damage: 0.6,
        shootSpeed: 3

    };

    this.input.on('pointerdown', function(pointer) {

        
        if(this.numHealth > 1){
            if(this.money >=50){
                if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[0], pointer.x, pointer.y)){
                    if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[1], pointer.x, pointer.y)){
                        if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[2], pointer.x, pointer.y)){
                            if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[3], pointer.x, pointer.y)){
                                if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[4], pointer.x, pointer.y)){
                                    if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[5], pointer.x, pointer.y)){
                                        if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[6], pointer.x, pointer.y)){
                                            if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[7], pointer.x, pointer.y)){
                                                if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[8], pointer.x, pointer.y)){
                                                    if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[9], pointer.x, pointer.y)){
                                                        if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[10], pointer.x, pointer.y)){
                                                            if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[11], pointer.x, pointer.y)){
                                                                if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[12], pointer.x, pointer.y)){
                                                                    if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[13], pointer.x, pointer.y)){
                                                                        if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[14], pointer.x, pointer.y)){
                                                                            if(!Phaser.Geom.Rectangle.Contains(this.road.roadArr[15], pointer.x, pointer.y)){
                
                this.money -= 50;
                let hero = this.add.sprite(pointer.x, pointer.y, 'us');
                let dart = this.add.sprite(pointer.x, pointer.y, 'bullet');

                this.physics.add.existing(dart);

                // dart.setVisible(false);
                hero.setScale(0.17);
                hero.flipX = true;
                dart.setVisible(false);
                dart.setScale(.01);
                dart.flipX = true;

                this.hero.heroArr.push(hero);
                this.hero.dartArr.push(dart);
                
            }}}}}}}}}}}}}}}}}}
        else{
            this.lost.play();
        }
    }, this);



    //setup stats for a red Enemy
    this.redEnemy = {
        scene: this,
        path: this.path,
        startX: 0,
        startY: 275,
        color: 'red',
        health: 10,
        damage: 100,
        speed: 18000
    };
    //setup stats for a red Enemy
    this.blueEnemy = {
        scene: this,
        path: this.path,
        startX: 0,
        startY: 275,
        color: 'blue',
        health: 20,
        damage: 15,
        speed: 11000
    };
    //setup stats for a red Enemy
    this.blackEnemy = {
        scene: this,
        path: this.path,
        startX: 0,
        startY: 275,
        color: 'black',
        health: 120,
        damage: 25,
        speed: 17000
    };

    // this.createEnemies(this.redEnemy, 3);


    this.keys = this.input.keyboard.addKeys('P, Q,A,B,C,D, X');
    this.count = 0;
    this.answered = false;
    this.correct = false;
    this.q1 = this.add.text(config.width/2-400, config.height/4, ' ', {fontSize:'20px', fill:'#fff'});
    this.q1.setDepth(3);
   
    this.qPic = this.add.sprite(config.width/2,config.height/2,'black');
    //this.qPic.setScale(.4);
    this.qPic.setVisible(false);
    this.qPic.setDepth(3);

};




// ============ (4) update =============================================================
// After setup is complete, update is called on a loop 
// for each frame during game play.
gameScene.update = function() {
    // check if player overlaps the goal
    this.updateEnemies();
    this.updateHealth2();
    this.attack(this.redEnemy);
    this.attack(this.blackEnemy);
    this.attack(this.blueEnemy);
    this.gamePlay();
    this.moneyBar.setText('Money ' + this.money);
    this.xRay();


    this.printOuts();

    //this.info.setText('\nTime: ' + Math.floor(10000 - timer.getElapsed()));
};

gameScene.printOuts = function() {
    console.log('totalEnemies: ' + this.enemyArr.length);
    //console.log('Enemy0 health: ' + this.enemyArr[0].health);
    //console.log('Enemy0 loc: ' + this.enemyArr[0].x + ',' + this.enemyArr[0].y);
    //console.log('Enemy0 color: ' + this.enemyArr[0].color);

}


//==========================Functions========================================

//checks if two sprites intersect
function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
};

function checkRect(rectA, rectB) {
    return Phaser.Geom.Intersects.RectangleToRectangle(rectA, rectB);
};

gameScene.increase = function(){
    this.count++;
}

// gameScene.noPath = function(){
//     for(let i = 0; i < this.road.roadArr.length; i++){
//         for(let j = 0; j < this.hitbox.hitboxArr.length; j++){
//             if(checkOverlap(this.hitbox.hitboxArr[j], this.road.roadArr[i])){
//                 this.scene.restart();
//             }
//         }
//     }

// }

//create rounds of enemies
gameScene.createEnemies = function(enemyType, numEnemies) {

    newSpeed = enemyType.speed;

    for (let i = 0; i < numEnemies; i++) {
        console.log('creating enemy: ' + enemyType.color + ' ' + i);

        newSpeed += i * 2000;

        let en = new Enemy(enemyType, newSpeed);
        this.add.existing(en);
        this.enemyArr.push(en); //adds an enemy to the end of the enemyArr array

        en.setScale(0.8);
        en.flipX = true;
        let followTime = en.speed;
        en.startFollow(followTime);
        en.rotateToPath = true;

    }
}


gameScene.attack = function(enemyType) {

    //loop thru all the enemies
    //console.log("Num Enemies: " + this.enemyArr.length);
    for (let i = 0; i < this.enemyArr.length; i++) {
        let en = this.enemyArr[i];

        //loop thru all the heroes (& darts)
        for (let j = 0; j < this.hero.heroArr.length; j++) {

            //set a range to shoot when within 150 pixels
            let range = 100;

            //OLD
            // if (Math.abs(this.hero.heroArr[j].x - en.x) < range && Math.abs(this.hero.heroArr[j].y - en.y) < range) {

            //     //move all the darts to "heatseek"
            //     this.physics.moveToObject(this.hero.dartArr[j], en, 200);
            // }

            // if enemy is in range 
            if (Math.abs(this.hero.heroArr[j].x - en.x) < range && Math.abs(this.hero.heroArr[j].y - en.y) < range) {
                this.hero.dartArr[j].setVisible(true);
                this.physics.moveTo(this.hero.dartArr[j], en.x, en.y, 230);
            }
        //   else {
        //         this.hero.dartArr[j].setX(this.hero.heroArr[j].x);
        //         this.hero.dartArr[j].setY(this.hero.heroArr[j].y);
        //     }  
            // else if(this.enemyArr.length < 1){
            //     this.hero.dartArr[j].setX(this.hero.heroArr[j].x);
            //     this.hero.dartArr[j].setY(this.hero.heroArr[j].y);
            //     console.log("I SHOULD BE WORKING");
            // }


            // otherwise if the enemy is out of range of the hero, return the dart
            // if (Math.abs(this.hero.heroArr[j].x - en.x) > range && Math.abs(this.hero.heroArr[j].y - en.y) > range) {
            //     this.hero.dartArr[j].setVisible(false);
            //     this.hero.dartArr[j].setX(this.hero.heroArr[j].x);
            //     this.hero.dartArr[j].setY(this.hero.heroArr[j].y);
            // }

            // //if the dart is out of range of the hero, return the dart
            else if (Math.abs(this.hero.heroArr[j].x - this.hero.dartArr[j].x) > range || Math.abs(this.hero.heroArr[j].y - this.hero.dartArr[j].y) > range) {
                this.hero.dartArr[j].setX(this.hero.heroArr[j].x);
                this.hero.dartArr[j].setY(this.hero.heroArr[j].y);
            }

            //console.log(j + ' ' + i);
        }
    }
}


//Update health 1 and 2 checks if dart and enemy overlap and takes away health from enemy
// once dart overlaps enemy it goes back to hero
// if enemy health is less than 1 it teleports enemy out of the map and set it invisible
gameScene.updateHealth = function(dart, heroIndex) {

    //console.log('Num of total hero darts: ' + this.hero.dartArr.length);
    for (let i = 0; i < this.enemyArr.length; i++) {
        let en = this.enemyArr[i];

        //check if the dart has hit an enemy
        if (checkOverlap(dart, en)) {
            this.hit.play();
            //subtract health from the enemy
            let dam = this.hero.damage;
            en.loseHealth(dam);
            console.log("Hit enemy[" + i + "] with " + dam + " damage! Down to health: " + en.health);

            //send the dart back to it's hero
            this.hero.dartArr[heroIndex].setX(this.hero.heroArr[heroIndex].x);
            this.hero.dartArr[heroIndex].setY(this.hero.heroArr[heroIndex].y);
        }

        //hide enemy if health below 1
        // if (isNaN(en.health)) 
        if(en.health < 1){
            en.setActive(false);
            en.setVisible(false);
            en.setX(800);
            en.setY(200);
            this.enemyArr.splice(i, 1); //???
            this.money += 5;
        }
        // console.log(this.enemyArr.length);
    }
}

gameScene.updateHealth2 = function() {
    for (let i = 0; i < this.hero.dartArr.length; i++) {
        this.updateHealth(this.hero.dartArr[i], i);

    }
}

gameScene.updateEnemies = function() {

    //check if the enemies reached the end of the path
    for (let i = 0; i < this.enemyArr.length; i++) {
        let enemy = this.enemyArr[i];

        if (checkOverlap(this.health, enemy)) {
            console.log('goal reached');
            //this.hit.play();
            this.numHealth -= enemy.damage;
            enemy.setActive(false);
            enemy.setX(800);
            enemy.setY(50);
            enemy.setVisible(false);
            this.enemyArr.splice(i, 1);
            this.healthBar.setText(' ' + this.numHealth);

        }
        // if (this.numHealth < 1) {
        //     this.scene.restart();
        // }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

gameScene.xRay = function(){
    if(this.keys.X.isDown){
          this.road.roadArr[0].isStroked = true;
    }else{
        this.road.roadArr[0].isStroked = false;    }

}

//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//create rounds of gameplay
gameScene.gamePlay = function(){
    if(this.numHealth>1){
        if(this.enemyArr.length < 1){
//round 1
if(this.keys.P.isDown && this.count == 0){
    this.round1();
}       //question break
else if(this.enemyArr.length < 1 && this.count == 1){
    this.questionWithPic(' ', 'h1',0.4,'C');
    if(this.answered && this.count == 1){
        this.q1.setText(' ');
        this.qPic.setVisible(false);
        this.increase();
    }
}

//round 2
else if(this.keys.P.isDown && this.count == 2){
this.round2();
}    //question break 
else if(this.enemyArr.length < 1 && this.count == 3){
    this.questionWithPic(' ', 'h2',0.4,'A');
    if(this.answered && this.count == 3){
        this.q1.setText(' ');
        this.qPic.setVisible(false);
        this.increase();
    }
}


//round 3
if(this.keys.P.isDown && this.count == 4){
this.round3();
}       //question break
else if(this.enemyArr.length < 1 && this.count == 5){
this.increase(); 
}

//round 4
if(this.keys.P.isDown && this.count == 6){
this.round4();
}       //question break
else if(this.enemyArr.length < 1 && this.count == 7){
this.increase(); }

//round 5
if(this.keys.P.isDown && this.count == 8){
this.round5();
}
//question break
else if(this.enemyArr.length < 1 && this.count == 9){
this.increase();
}

//round 6
if(this.keys.P.isDown && this.count == 10){
this.round6();
}
//question break
else if(this.enemyArr.length < 1 && this.count == 11){
this.increase();
}

//round 7
if(this.keys.P.isDown && this.count == 12){
this.round7();
}
//question break
else if(this.enemyArr.length < 1 && this.count == 13){
this.increase();
}

//round 8
if(this.keys.P.isDown && this.count == 14){
this.round8();
}
//question break
else if(this.enemyArr.length < 1 && this.count == 15){
this.increase();
}

//round 9
if(this.keys.P.isDown && this.count == 16){
this.round9();
}
//question break
else if(this.enemyArr.length < 1 && this.count == 17){
this.increase();
}

//round 10
if(this.keys.P.isDown && this.count == 18){
this.round10();
}
//question break
else if(this.enemyArr.length < 1 && this.count == 19){
this.increase();
}

//round 11
if(this.keys.P.isDown && this.count == 20){
this.round11();
}
//question break
else if(this.enemyArr.length < 1 && this.count == 121){
this.increase();
}


    }}
    
    if(this.numHealth<1){
        let gameOverText = this.add.text(config.width/2-200, config.height/3, 'GAME OVER', {fontSize:'80px', fill:'#ff0000'});
        if(this.keys.Q.isDown){
            this.scene.restart();
        }

    }

}






gameScene.round1 = function(){
    this.createEnemies(this.redEnemy, 5);
    this.increase();
    this.roundNum = 1;
    this.round.setText(' ' + this.roundNum);
}
gameScene.round2 = function(){
    this.createEnemies(this.redEnemy, 10);
    this.increase();
    this.roundNum = 2;
    this.round.setText(' ' + this.roundNum);
}
gameScene.round3 = function(){
    this.createEnemies(this.redEnemy, 6);
    this.createEnemies(this.redEnemy, 4);
    this.createEnemies(this.blueEnemy, 5);
    this.increase();
    this.roundNum = 3;
    this.round.setText(' ' + this.roundNum);
}
gameScene.round4 = function(){
    this.createEnemies(this.redEnemy, 8);
    this.createEnemies(this.redEnemy, 8);
    this.createEnemies(this.redEnemy, 8);
    this.increase();
    this.roundNum = 4;
    this.round.setText(' ' + this.roundNum);
}
gameScene.round5 = function(){
    this.createEnemies(this.blueEnemy, 12);
    for(let i =0; i<this.enemyArr.length;i++){
        if(this.enemyArr[this.enemyArr.length - 1].x > 100)
        this.createEnemies(this.blueEnemy, 12);
    }

    this.increase();
    this.roundNum = 5;
    this.round.setText(' ' + this.roundNum);
}
gameScene.round6 = function(){
    this.createEnemies(this.blackEnemy, 5);
    this.createEnemies(this.redEnemy, 10);
    this.increase();
    this.roundNum = 6;
    this.round.setText(' ' + this.roundNum);
}
gameScene.round7 = function(){
    this.createEnemies(this.blackEnemy, 5);
    this.createEnemies(this.blueEnemy, 5);
    this.createEnemies(this.redEnemy, 5);
    this.increase();
    this.roundNum = 7;
    this.round.setText(' ' + this.roundNum);
}
gameScene.round8 = function(){
    this.createEnemies(this.blueEnemy, 15);
    this.createEnemies(this.redEnemy, 15);
    this.increase();
    this.roundNum = 7;
    this.round.setText(' ' + this.roundNum);
}
gameScene.round9 = function(){

}
gameScene.round10 = function(){

}
gameScene.round11 = function(){

}


gameScene.question1 = function(){
    this.answered = false;
    this.correct = false;
    this.q1.setText('(a)Workers get to take a well-earned vacation \n(b)Workers are deprived of their income and suffer hardships.\n(c)Employers can manage their businesses from home');
    this.input.keyboard.on('keydown_A', function (event) {
        this.answered = true;
    }, this);

    if (this.keys.A.isDown){
        this.money+= 5;
        this.answered = true;
        this.correct = true;
    }
    else if (this.keys.B.isDown){
        this.answered = true;
    }
    else if (this.keys.C.isDown){
        this.answered = true;
    }
    else if (this.keys.D.isDown){ 
        this.answered = true;
    }
}
gameScene.question2 = function(qu,ans){
    this.answered = false;
    this.correct = false;
    this.q1.setText(qu);
    this.input.keyboard.on('keydown_A', function (event) {
        this.answered = true;

    }, this);
    
    if( strcmp(ans, 'A') == 0){
        if (this.keys.A.isDown){
            this.money+= 5;
            this.answered = true;
            this.correct = true;
        }
        else if(this.keys.B.isDown || this.keys.C.isDown || this.keys.D.isDown ){
            this.answered = true;
        }
    }

    if( strcmp(ans, 'B') == 0){
        if (this.keys.B.isDown){
            this.money+= 5;
            this.answered = true;
            this.correct = true;
        }
        else if(this.keys.A.isDown || this.keys.C.isDown || this.keys.D.isDown ){
            this.answered = true;
        }
    }

    if( strcmp(ans, 'C') == 0){
        if (this.keys.C.isDown){
            this.money+= 5;
            this.answered = true;
            this.correct = true;
        }
        else if(this.keys.B.isDown || this.keys.A.isDown || this.keys.D.isDown ){
            this.answered = true;
        }
    }
    if( strcmp(ans, 'D') == 0){
        if (this.keys.D.isDown){
            this.money+= 5;
            this.answered = true;
            this.correct = true;
        }
        else if(this.keys.B.isDown || this.keys.C.isDown || this.keys.A.isDown ){
            this.answered = true;
        }
    }
}

gameScene.questionWithPic = function(qu,pic,scale,ans){
    this.answered = false;
    this.correct = false;
    this.qPic.setVisible(true);
    this.qPic.setScale(scale);
    this.qPic.setTexture(pic);
    this.q1.setText(qu);
    this.input.keyboard.on('keydown_A', function (event) {
        this.answered = true;

    }, this);
    
    if( strcmp(ans, 'A') == 0){
        if (this.keys.A.isDown){
            this.money+= 5;
            this.answered = true;
            this.correct = true;
        }
        else if(this.keys.B.isDown || this.keys.C.isDown || this.keys.D.isDown ){
            this.answered = true;
        }
    }

    if( strcmp(ans, 'B') == 0){
        if (this.keys.B.isDown){
            this.money+= 5;
            this.answered = true;
            this.correct = true;
        }
        else if(this.keys.A.isDown || this.keys.C.isDown || this.keys.D.isDown ){
            this.answered = true;
        }
    }

    if( strcmp(ans, 'C') == 0){
        if (this.keys.C.isDown){
            this.money+= 5;
            this.answered = true;
            this.correct = true;
        }
        else if(this.keys.B.isDown || this.keys.A.isDown || this.keys.D.isDown ){
            this.answered = true;
        }
    }
    if( strcmp(ans, 'D') == 0){
        if (this.keys.D.isDown){
            this.money+= 5;
            this.answered = true;
            this.correct = true;
        }
        else if(this.keys.B.isDown || this.keys.C.isDown || this.keys.A.isDown ){
            this.answered = true;
        }
    }
}




function strcmp(a, b) {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
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