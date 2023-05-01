/*
Arya Miryala
Rocket Patrol II: Refactored
Time it took complete: worked on it over the week in small intervals, majority was worked on Saturday April 29; Apprx hours: 12-15 
Mods I choose: 
- Create a new title screen (e.g., new artwork, typography, layout) (10)
- Implement parallax scrolling for the background (10) 
   - used https://www.youtube.com/watch?v=GwGzFczdpkg&t=1388s as reference
- Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
   - got music from: https://www.chosic.com/free-music/energetic/
- Allow the player to control the Rocket after it's fired (5)
- Implement mouse control for player movement and mouse click to fire (15)
- Implement the 'FIRE' UI text from the original game (5)
   - used https://phaser.discourse.group/t/how-to-remove-text/742/2 as reference 
- Create 4 new explosion sound effects and randomize which one plays on impact (10)
   - used https://www.html5gamedevs.com/topic/41399-change-sound-on-click-dynamically/ as reference
- Randomize each spaceship's movement direction at the start of each play (5)
- Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
   - used https://www.piskelapp.com/p/create/sprite to create new sprite. Also modyfied the Spaceship constructor to make ship faster
- Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)
   - used https://rexrainbow.github.io/phaser3-rex-notes/docs/site/particles/ and https://garystanton.co.uk/code/demos/particleExplosions/ as reference
Display the time remaining (in seconds) on the screen (10)
   - used https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/ as reference

105 points

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