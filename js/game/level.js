//All jsGameEngine.zip moodle

// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import Button from './button.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's width and the gap between platforms
    //const platformWidth = 200;
    //const gap = 100;

    // Create platforms and add them to the game
    const platforms = [
      new Platform(0, this.canvas.height - 20, this.canvas.width, 100, "gray"),
      //new Platform(200, this.canvas.height - 200, 30, 0, "blue")
      new Platform(200, this.canvas.height - 200, 60, 60, "blue") 
      //new Platform(2 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      //new Platform(3 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      //new Platform(4 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    const pauseButtons = [ 
      new Button("Pause", 0, 50, 100, 50),
      new Button("Resume", this.canvas.width/2 - 30, 200, 100, 50),
      new Button("Reset", this.canvas.width/2 - 30, 250, 100, 50),
      new Button("Exit", this.canvas.width/2 - 30, 300, 100, 50),
      new Button("Start", this.canvas.width/2 - 30, 250, 100, 50)
    ];

    for (const button of pauseButtons) {
      this.addGameObject(button);
    }
    
    /*for (const button of pauseButtons) {
      if (this.gameState == "pauseMenu") {
        this.addGameObject(button);
      }
      else {
        this.removeGameObject(button);
      }
    }

    if (this.gameState == "game") {
      this.addGameObject(pause);
    }
    else {

    }*/

    

    // Create enemies and add them to the game
    /*this.addGameObject(new Enemy(50, this.canvas.height - 90));
    this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
    this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(250, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(450, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));*/
  }
  
}

// Export the Level class as the default export of this module
export default Level;
