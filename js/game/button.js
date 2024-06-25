import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import UI from '../engine/ui.js';

class Button extends GameObject {
    constructor(text, x, y, width, height) {
        super(x, y);
    
        //this.renderer = new Renderer("black", width, height);
        //this.addComponent(this.renderer);

        this.uiComponenet = new UI(text, x, y);
        this.addComponent(this.uiComponenet);

        this.isClicked = false;

        document.addEventListener("click", this.onClick);

        //this.tag = "button";
    }

    onClick(event) {
        console.log("Click!");
        if (event.clientX >= this.x && event.clientX <= this.x + this.width && event.clientX >= this.y && event.clientY <= this.y + this.height) {
            this.isClicked = true; // will need to change this back to false when we're done using it
        }
    }
}

export default Button;