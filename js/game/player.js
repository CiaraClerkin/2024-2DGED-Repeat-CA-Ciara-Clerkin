//All jsGameEngine.zip moodle, except attraction

// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';
import { AudioFiles } from '../engine/resources.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';

// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer('blue', 50, 50, Images.player); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input
    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 400;
    this.jumpTime = 0.3;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.attracting = false;
    this.currentFace = "top";
    this.attractSound = new Audio(AudioFiles.attract);
    this.repelSound = new Audio(AudioFiles.repel);
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component

    this.handleGamepadInput(input);
    
    // Attraction (basic)
    //https://www.toptal.com/developers/keycode/e
    //if (input.isKeyPress('KeyE')) {   //change this to a key press
    if (input.isKeyDown('KeyE')) {
      console.log(this.attracting);
      if (!this.attracting) {
        //console.log(false);
        this.attracting = true;
        this.repelSound.pause();
        this.attractSound.play();  
      } 
      else {
        this.attracting = false;
        this.attractSound.pause();
        this.repelSound.play();
      }
    }

    // avoid looping?
    /*if (input.isKeyDown('KeyE')) {
      if (!this.attracting) {
        this.repelSound.pause();
        this.attractSound.play();
      } 
      else {
        this.attractSound.pause;
        this.repelSound.play();
      } 
    }*/

    /*if (this.attracting == false) {
      this.currentFace = "top";
    }*/

    // Handle player movement

    /*console.log(this.direction);
    console.log(this.currentFace);
    console.log(this.attracting);*/

    if (!this.isGamepadMovement && input.isKeyDown('ArrowRight')) {
      //if (!this.attracting) physics.velocity.x = 100;
      physics.velocity.x = 100;
      //else {
      //}
      //physics.velocity.y = 0;
      this.direction = -1;
    } else if (!this.isGamepadMovement && input.isKeyDown('ArrowLeft')) {
        //if (!this.attracting) physics.velocity.x = -100;
        physics.velocity.x = -100;
        //else {
          /*if (this.currentFace == "top") {
            physics.velocity.x = -100;
            physics.velocity.y = 0;
          }
          else if (this.currentFace == "left") {
            physics.velocity.x = 0;
            physics.velocity.y = 100;
          }
          else if (this.currentFace == "bottom") {
            physics.velocity.x = 100;
            physics.velocity.y = 0;
          }
          else if (this.currentFace == "right") {
            physics.velocity.x = 0;
            physics.velocity.y = 100;
          }*/
        //}
        //physics.velocity.y = 0;
        this.direction = 1;
    } else if (!this.isGamepadMovement) {
      physics.velocity.x = 0;
      //physics.velocity.y = 0;
    }

    // Handle player jumping
    /*if (!this.isGamepadJump && input.isKeyDown('ArrowUp') && this.isOnPlatform) {
      this.startJump();
    } decided not to have jumping in the game, encourages player to be creative with main game mechanic*/

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
      }
    }
  
    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
      }
    }
  
    /*if (this.attracting) {
      physics.gravity = 0;
      physics.acceleration = 0;
    }*/

    //console.log(this.currentFace);

    // Handle collisions with platforms
    this.isOnPlatform = false;  // Reset this before checking collisions with platforms
    const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
    for (const platform of platforms) {
      //console.log(physics.isColliding(platform.getComponent(Physics)));

      //console.log(platform.color);

      // attracting to blue platform
      if (this.attracting) { 
        if (platform.renderer.color == "blue") {
          /*playerCenterX = (this.x + this.renderer.width) / 2;
          playerCenterY = (this.y + this.renderer.height) / 2;
          platformCenterX = (this.x + platform.renderer.width) / 2;
          platformCenterY = (this.y + platform.renderer.height) / 2;*/
          
          // m = the slope of the line from the player to the platform
          //m = valueOf((playerCenterY - platformCenterY) / (playerCenterX - platformCenterX));

          if (this.x + this.renderer.width >= platform.x - 200) {
            // speed = distance/time
            physics.velocity.x = 200;      
          }
          else if (this.x <= platform.x + platform.renderer.width + 200) {
            physics.velocity.x = 200;
          }

          if (this.y <= platform.y + 200) {
            physics.velocity.y = 200;
          }
          else if (this.y + this.renderer.height >= platform.y - 200) {
            physics.velocity.y = 200;    
          }
        }
      }

      if (physics.isColliding(platform.getComponent(Physics))) {
        //console.log("touching platform");
        if (platform.renderer.color == "blue") this.attracting = false;
        
        if (!this.isJumping) {  // reminder to remove ability to jump
          //if (!this.attracting) {
            physics.velocity.y = 0;
            physics.acceleration.y = 0;
            this.y = platform.y - this.renderer.height;  // do this for all of the faces
          //}
          this.isOnPlatform = true;
        }

        /*if (this.attracting) {
          this.currentFace = physics.getFace(this.direction, this.currentFace, platform.getComponent(Physics));
          if (this.direction == 1) {
            if (this.currentFace == "top") {
              physics.velocity.x = -100;
              physics.velocity.y = 0;
              physics.acceleration.y = 0;
              this.y = platform.y - this.renderer.height;
            }
            else if (this.currentFace == "left") {
              physics.velocity.x = 0;
              physics.velocity.y = 100;
              //physics.acceleration.x = 0;
              //physics.gravity = 0;
              this.x = platform.x - this.renderer.height;
            }
            else if (this.currentFace == "bottom") {
              physics.velocity.x = 100;
              physics.velocity.y = 0;
              physics.acceleration.y = 0;
              //physics.gravity.y = 0;
              this.y = platform.y + 100; //platform.renderer.width
            }
            else if (this.currentFace == "right") {
              physics.velocity.x = 0;
              physics.velocity.y = 100;
              this.x = platform.x;
              physics.acceleration.x = 0;
            }  
          }*/

          
            //this.currentFace = physics.getFace(this.direction, this.currentFace, platform.getComponent(Physics));
            
            //physics.gravity.y = 0;

            /*if (this.currentFace == "top") {
              if (this.x + this.renderer.width - 1 <= platform.x && this.direction == 1) {
                this.currentFace = "left";  
              }
              else if (this.x >= platform.x + platform.width && this.direction == -1) {
                this.currentFace = "right";
              }
            }
            else if (this.currentFace == "left") {
              if (this.y >= platform.y + platform.height && this.direction == 1) {
                this.currentFace = "bottom";
              }
              else if (this.y <= platform.y && this.direction == -1) {
                this.currentFace = "top";
              }
            }            
            else if (this.currentFace == "bottom") {
              if (this.x + this.renderer.width <= platform.x && this.direction == 1) {
                this.currentFace = "right";  
              }
              else if (this.x >= platform.x + platform.width && this.direction == -1) {
                this.currentFace = "left";
              }
            }
            else if (this.currentFace == "right") {
              if (this.y <= platform.y && this.direction == 1) {
                this.currentFace = "top";  
              }
              else if (this.y + this.renderer.height >= platform.y + platform.height && this.direction == -1) {
                this.currentFace = "bottom";
              }
            }*/

            /*if (this.direction == 1) {
              if (this.currentFace == "left") {
                if (this.y >= platform.y + platform.height) {
                  this.currentFace = "bottom";
                }
                physics.velocity.x = 0;
                physics.velocity.y = 100;
              }
              else if (this.currentFace == "bottom") {
                if (this.x + this.renderer.width <= platform.x) {
                  this.currentFace = "right";  
                }
                physics.velocity.x = 100;
                physics.velocity.y = 0;
              }
              else if (this.currentFace == "right") {
                if (this.y <= platform.y) {
                  this.currentFace = "top";  
                }
                physics.velocity.x = 0;
                physics.velocity.y = -100;
              }
              else {
                if (this.x + this.renderer.width - 1 <= platform.x) {
                  this.currentFace = "left";  
                }
                physics.velocity.x = -100;
                physics.velocity.y = 0;
              }
            }
            else if (this.direction == -1) {
              if (this.currentFace == "right") { 
                if (this.y + this.renderer.height >= platform.y + platform.height) {
                  this.currentFace = "bottom";
                }
                physics.velocity.x = 0;
                physics.velocity.y = 100;
              }
              else if (this.currentFace == "bottom") {
                if (this.x >= platform.x + platform.width) {
                  this.currentFace = "left";
                }
                physics.velocity.x = 100;
                physics.velocity.y = 0;
              }
              else if (this.currentFace == "left") {
                if (this.y <= platform.y) {
                  this.currentFace = "top";
                }
                physics.velocity.x = 0;
                physics.velocity.y = -100;
              }
              else {
                if (this.x >= platform.x + platform.width) {
                  this.currentFace = "right";
                }
                physics.velocity.x = 100;
                physics.velocity.y = 0;
              }
            }*/
          //}
        //}
      }
    }
  
    // Check if player has fallen off the bottom of the screen
    if (this.y > this.game.canvas.height * 3) {
      this.resetPlayerState();
    }

    // Check if player has no lives left
    if (this.lives <= 0) {
      location.reload();
    }

    // Check if player has collected all collectibles
    if (this.score >= 3) {
      console.log('You win!');
      location.reload();
    }

    super.update(deltaTime);
  }

  handleGamepadInput(input){
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];
      // Move right
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = 100;
        this.direction = -1;
      } 
      // Move left
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = -100;
        this.direction = 1;
      } 
      // Stop
      else {
        physics.velocity.x = 0;
      }
      
      // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
      if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
        this.isGamepadJump = true;
        this.startJump();
      }
    }
  }

  startJump() {
    // Initiate a jump if the player is on a platform
    if (this.isOnPlatform) { 
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
    }
  }
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    this.score += collectible.value;
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible);
  }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }



  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
    this.currentFace = "top";
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }

  reset() {
    this.resetPlayerState();
    this.resetGame();
  }
}

export default Player;
