"use strict";

// define phaser game configuration values
const myconfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "matter" // tell phaser to use the matter.js physics simulator
  },
  scene: {
    preload: mypreload,
    create: mycreate
  }
};

// global variables
let block;
let ball, ball2;
let elasticity = 0.8;

// create phaser game instance
let mygame = new Phaser.Game(myconfig)

// define three functions, one each for: preload stage, create stage, and update loop for my game
function mypreload() {
  this.load.image('block', 'block.png');
  this.load.image('ball', 'shinyball.png');
}

function mycreate() {
  // make a game obj for the heavy immovable block
  // while we say this.physics to access the arcade physics sim obj model,
  // while we say this.matter to access the matter.js sim object model
  block = this.matter.add.image(
    400,    // x-coord
    50,     // y-coord
    'block',// asset key 
    null,   // not used for this
    {
      ignoreGravity: true,
      isStatic: true
    }      // matter.js properties we want to assign this object
  );

  // add a ball game object
  ball = this.matter.add.image(
    400,
    150,
    'ball',
    null,
    {
      shape: 'circle',
      mass: 0.1
    }
  );

  // attach ball via a joint constraint to the block
  this.matter.add.joint(block, ball, 90, elasticity);

  // add a second ball game object
  ball2 = this.matter.add.image(
    400,
    170,
    'ball',
    null,
    {
      shape: 'circle',
      mass: 0.1
    }
  );

  // add another joint constraint between the two ball and ball2
  this.matter.add.joint(ball, ball2, 35, elasticity);

  // use matter.js default user interaction via the mouse
  this.matter.add.mouseSpring();
}