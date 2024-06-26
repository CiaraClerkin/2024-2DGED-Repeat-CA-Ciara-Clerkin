import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import UI from '../engine/ui.js';
//import Input from '../engine/input.js';

class Button extends GameObject {
    constructor(text, x, y, width, height) {
        super(x, y);
    
        //this.renderer = new Renderer("black", width, height);
        //this.addComponent(this.renderer);

        this.uiComponenet = new UI(text, x, y);
        this.addComponent(this.uiComponenet);

        this.width = width; 
        this.height = height;

        this.text = text;

        //this.clientX = 0;
        //this.clientY = 0;

        //this.isClicked = false;

        document.addEventListener("click", this.onClick.bind(this)); //https://stackoverflow.com/questions/8154369/javascript-mouseevents-and-classes

        //this.tag = "button";
    }

    onClick(event) {        
        console.log("Click!");
        /*this.clientX = event.clientX;
        this.clientY = event.clientY;*/

        //console.log(event.clientX + ", " + event.clientY + " | " + this.x + ", " + this.y);

        if (event.clientX >= this.x && event.clientX <= this.x + this.width && event.clientY >= this.y && event.clientY <= this.y + this.height) {
            /*if (this.text == "Pause") {
                console.log("Pause!");
                this.game.reset();
            }*/
            if (this.text == "Pause") {
                console.log("Pause!");
                this.game.isPaused = !this.game.isPaused;
            }
            else if (this.text == "Reset") {
                console.log("Reset!");
                this.game.reset();
            }
            
            //this.isClicked = true; // will need to change this back to false when we're done using it
        }
    }

    /*update(deltaTime) {
        console.log(this.clientX + ", " + this.x + " | " + this.clientY + ", " + this.y);

        if (this.clientX >= this.x && this.clientX <= this.x + this.width && this.clientX >= this.y && this.clientY <= this.y + this.height) {
            //if (button.text == "Pause") {
                console.log("Pause!");
                Game.reset();
            //}
            
            //this.isClicked = true; // will need to change this back to false when we're done using it
        }
    }*/
}

export default Button;