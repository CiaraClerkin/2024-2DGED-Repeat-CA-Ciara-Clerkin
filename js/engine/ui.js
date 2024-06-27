//All jsGameEngine.zip moodle

// Import the Component parent class.
import Component from './component.js';

// Define the UI class which extends the Component parent class.
class UI extends Component {
  // The constructor of the UI class.
  constructor(text, x, y, button = false, font = '20px Arial', color = 'white', textAlign = 'left', textBaseline = 'top') {
    super(); // Call the constructor of the parent class.

    // Assign the given parameters to instance variables.
    this.text = text; // The text that this UI component will draw.
    this.x = x; // The x-coordinate at which to start drawing the text.
    this.y = y; // The y-coordinate at which to start drawing the text.
    this.button = button; // Boolean that decides if we also draw a rectangle behind the text
    this.font = font; // The font in which to draw the text.
    this.color = color; // The color in which to draw the text.
    this.textAlign = textAlign; // The alignment of the text.
    this.textBaseline = textBaseline; // The baseline of the text.
  }

  // The draw method of the UI class.
  draw(ctx) {
    // Get the camera from the game associated with the current object.
    const camera = this.gameObject.game.camera;

    if (this.button) { 
      //console.log(console.log(ctx.measureText(this.text).width, " " + ctx.measureText(this.text).height));
      //if (this.text == "Pause" && !this.gameObject.game.isPaused || this.gameObject.game.isPaused) {
        ctx.fillStyle = "purple";
        ctx.fillRect(this.x + camera.x, this.y + camera.y, ctx.measureText(this.text).width, 20);

        // Set the font, fill style, text align, and text baseline of the context.
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;

        // Fill in the text at the given position plus the camera position.
        ctx.fillText(this.text, this.x + camera.x, this.y + camera.y);
      //}
    }
    else {
      // Set the font, fill style, text align, and text baseline of the context.
      ctx.font = this.font;
      ctx.fillStyle = this.color;
      ctx.textAlign = this.textAlign;
      ctx.textBaseline = this.textBaseline;

      // Fill in the text at the given position plus the camera position.
      ctx.fillText(this.text, this.x + camera.x, this.y + camera.y);
    }
  }

  // A method to set the text of the UI component.
  setText(newText) {
    // Set the text instance variable to the given new text.
    this.text = newText;
  }
}

// Export the UI class so it can be used in other files.
export default UI;
