//rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);
        //track rocket's firing status 
        this.isFiring = false; 
        //pixels per frame
        this.moveSpeed = 2; 

        scene.input.on('pointerdown', this.fire.bind(this));
        


        this.sfxRocket = scene.sound.add('sfx_rocket'); //add rocket sound
    }
    
    update(){
        



        //left/right movement
        if(!this.isFiring){
            


            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed; 
            }
            else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed; 
            }
        }
        //fire button 
        
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
            //this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, 'FIRE', fireConfig).setOrigin(0.5);

            

           
        } 
        //if fired move up 
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed; 
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed; 
            }
            else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed; 
            }            

        }
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding){
            this.isFiring = false; 
            this.y = game.config.height - borderUISize - borderPadding; 
        }
        
    }
    //reset rocket to ground
    reset() {
        this.isFiring = false; 
        this.y = game.config.height - borderUISize - borderPadding; 

    }
    fire() {
        if(!this.isFiring || Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
            
        }

    }
}