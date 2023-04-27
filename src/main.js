/*
Arya Miryala
Rocket Patrol II: Refactored
Time it took complete:
Mods I choose: 
- Create a new title screen (e.g., new artwork, typography, layout) (10)
- Implement parallax scrolling for the background (10) 
   - used https://www.youtube.com/watch?v=GwGzFczdpkg&t=1388s as reference

*/
let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT; 

//set UI sizes
let borderUISize = game.config.height / 15; 
let borderPadding = borderUISize / 3; 