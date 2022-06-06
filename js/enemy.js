//based off https://phasergames.com/extend-a-sprite-in-phaser-3/?mc_cid=3f4ee26e5d&mc_eid=a4d9ee0291

class Enemy extends Phaser.GameObjects.PathFollower {

    constructor(enemyType, newSpeed) {

        super(enemyType.scene, enemyType.path, enemyType.startX, enemyType.startY, enemyType.color);

        this.color = enemyType.color;
        this.startX = enemyType.x;
        this.startY = enemyType.y;
        this.health = enemyType.health;
        this.damage = enemyType.damage;
        this.speed = newSpeed;

        // setScale(0.8);
        // flipX = true;
        // var followTime = this.speed;
        // startFollow(followTime);
        //rotateToPath = true;

        this.setInteractive();
        this.on('pointerdown', this.clickMe, this);
    }

    loseHealth(health) {
        this.health -= health;
        return this.health;
    }

    //Enemy gets lighter when clicked
    clickMe() {
        this.alpha -= .1;
    }

}