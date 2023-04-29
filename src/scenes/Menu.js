class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload(){
        // load audio
    this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
    this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
    this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
    //loading explosion audios
    this.load.audio('explosion1', './assets/explosion1.wav');
    this.load.audio('explosion2', './assets/explosion2.wav');
    this.load.audio('explosion3', './assets/explosion3.wav');
    this.load.audio('explosion4', './assets/explosion4.wav');

    //load background image for menu
    this.load.image('starrysky', './assets/starrysky.png');


    }

    create(){
      
      //add background image
      this.starrysky= this.add.tileSprite(0, 0, 640, 480, 'starrysky').setOrigin(0,0);


        let menuConfig = {
            fontFamily: 'Georgia', 
            fontSize: '28px', 
            backgroundColor: 'transparent',
            color: 'pink',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };

        //show menu text
        this.add.text(game.config.width/2, game.config.height/7 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.5, 'Use <--> arrows to move and F to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = 'transparent';
        menuConfig.color = 'yellow';
        this.add.text(game.config.width/2, game.config.height/1.25, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        
    }

    update() {

        this.starrysky.tilePositionX -= 2; 
       
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // Novice mode
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
          }
          
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Expert mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
          }
    }
}
        


