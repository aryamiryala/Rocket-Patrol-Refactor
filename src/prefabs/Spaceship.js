//spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        //store pointValue
        this.points = pointValue;
        //pixels per frame
        this.moveSpeed = speed; 
    }

    update() {
        //move spaceship left
        this.x -= this.moveSpeed; 
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            // this.x = game.config.width; 
            //randomize spawn/direction 
            this.x = Math.floor(Math.random()* game.config.width);
        }
    }

    //position reset
    reset() {
        //this.x = Math.floor(Math.random()); 
        this.x = game.config.width; 

    }
}