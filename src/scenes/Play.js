class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('fastship', './assets/fastship.png');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        
        //load background music
        this.load.audio('sfx_background', './assets/background.wav');
    }

    create(){
        //Game Over flag
        this.gameOver = false; 

        //set clock start value
        this.clock = game.settings.gameTimer/1000; 
        



        //this.highScore = 0; 

        //add music, set volume, play it
        this.backgroundSong = this.sound.add('sfx_background', {volume: 0.5});   
        this.backgroundSong.play();

        //place tile sprite 
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        // green UI background
        //x,y,width,height,color
        //setOrgin adjusts the rectangle's origin 
        //—the point on the rectangle used to position it in coordinate space—from the default at its center to its upper left
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //add rocket(p1)(p2)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);
       // this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);
       



        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, game.settings.spaceshipSpeed).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, game.settings.spaceshipSpeed).setOrigin(0,0);
        //faster ship
        this.ship04 = new Spaceship(this, game.config.width, borderUISize*4 + borderPadding*2, 'fastship', 0, 40, game.settings.spaceshipSpeed*2).setOrigin(0,0);

        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      
       
    
        
        
        //animation config
        /*
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}), 
            frameRate:30

        });*/

         //initialize score
         this.p1Score = 0; 
        // this.p2Score = 0;

         //display the score
         let scoreConfig = {
             fontFamily: 'Courier', 
             fontSize: '28px', 
             backgroundColor: '#F3B141',
             color: '#843605',
             align: 'left',
             padding: {
                 top: 5, 
                 bottom: 5,
             },
             fixedWidth: 100
         };
         this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
         

         this.timer = this.time.addEvent({delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });
         this.timeLeft = this.add.text(borderUISize + borderPadding*43, borderUISize + borderPadding*2, this.clock, scoreConfig);

       
        //60 second play clock
        scoreConfig.fixedWidth = 0;
        // this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //     this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        //     this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
        //     this.gameOver = true;
        // }, null, this);

      

       let fireConfig = {
        fontFamily: 'Courier', 
        fontSize: '28px', 
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'left',
        padding: {
            top: 5, 
            bottom: 5,
        },
        fixedWidth: 0
       };
        this.fireText = this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, 'FIRE', fireConfig).setVisible(false);
      
      

        


    }
    update(){
        
        //check key input for restart button 
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart(); 
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4; 
       
        //this.text.addText(`Event.progress: ${this.timer.getProgress().toString().substr(0, 4)}`);


       
        
        if(!this.gameOver) {
            //update text
            this.timeLeft.text = this.clock; 
            this.p1Rocket.update(); 
            this.p1Rocket.x = game.input.mousePointer.x;
            this.ship01.update(); 
            this.ship02.update(); 
            this.ship03.update(); 
            this.ship04.update(); 
          
            
            if(this.p1Rocket.isFiring == true){
                this.fireText.setVisible(true);
                
            }
            else{
                this.fireText.setVisible(false);
            }

           
        }


        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset(); 
            this.shipExplode(this.ship04);
         }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
           this.p1Rocket.reset(); 
           this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset(); 
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset(); 
            this.shipExplode(this.ship01);
        }

    }

    checkCollision(rocket, ship) {
        //simple AABB checking 
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true;
        }
        else{
            return false; 
        }
    }

    shipExplode(ship){
        const emitter = this.add.particles(400, 250, 'explosion', {
            lifespan: 4000,
            speed: { min: 150, max: 250 },
            scale: { start: 0.8, end: 0 },
            gravityX: ship.x,
            gravityY: ship.y,
            blendMode: 'ADD',
            emitting: false
        });
        //temporarily hide ship 
        ship.alpha = 0; 
        //create explosion
        emitter.explode(16);
        
        ship.reset(); //reset position of ship
        ship.alpha = 1;  //make ship visible
     
        

        //score add and repaint
        this.p1Score += ship.points; 
        this.scoreLeft.text = this.p1Score; 

        //picking random sound for each explosion
        const explosionSound = [this.sound.add('explosion1'), this.sound.add('explosion2'), this.sound.add('explosion3'), this.sound.add('explosion4')];

       const random = explosionSound[Math.floor(Math.random()*explosionSound.length)];
       random.play(); 

        
    }
    updateTimer() {
       
        let scoreConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px', 
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 100
        };
        scoreConfig.fixedWidth = 0;
       
        
        this.clock--;
        
        //check if clock reaches 0
        if(this.clock == 0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;


        }

    }

   
}