"use strict";

// there is a bug in v3.60.0 of Phaser that causes ignoreGravity for Matter objects to fail
// this is a fix from https://github.com/photonstorm/phaser/issues/6473
class MatterGravityFixPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);
  }
  boot() {
    const Matter = Phaser.Physics.Matter.Matter;
    this.applyGravityFix(Matter);
  }
  applyGravityFix(Matter) {
    Matter.Engine._bodiesApplyGravity = function(bodies, gravity) {
      var gravityScale = typeof gravity.scale !== 'undefined' ? gravity.scale : 0.001,
        bodiesLength = bodies.length;

      if ((gravity.x === 0 && gravity.y === 0) || gravityScale === 0) {
        return;
      }

      for (var i = 0; i < bodiesLength; i++) {
        var body = bodies[i];
        if (body.ignoreGravity || body.isStatic || body.isSleeping) {
          continue;
        }
        body.force.y += body.mass * gravity.y * gravityScale;
        body.force.x += body.mass * gravity.x * gravityScale;
      }
    };
  }
}

// define phaser game configuration values
let myconfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "matter" // tell phaser to use the matter.js physics simulator
  },
  scene: {
    preload: mypreload,
    create: mycreate
  },
  // bug in Phaser v3.60.0 needs a plugin class (defined above) to fix Matter ignoreGravity
  plugins: {
    scene: [
      {
        key: 'MatterGravityFixPlugin',
        plugin: MatterGravityFixPlugin,
        mapping: 'matterGravityFix',
        start: true,
      },
    ],
  },
};

// global variables
let block;
let ball, ball2;

// create phaser game instance
let mygame = new Phaser.Game(myconfig);

// define three functions, one each for: preload stage, create stage, and update loop for my game
function mypreload() {
  this.load.image('block', 'block.png');
  this.load.image('ball', 'shinyball.png');
}

function mycreate() {
  // make a game obj for the heavy immovable block
  // while we say this.physics to access the arcade physics sim object model
  // we use this.matter to access the matter.js sim object model
  block = this.matter.add.image(400, 50, 'block', null, { ignoreGravity: true, isStatic: true, mass: 5000000 });

  // add a ball game object
  ball = this.matter.add.image(400, 150, 'ball', null, { shape: 'circle', mass: 0.1 });

  // attach it via a joint constraint to the block
  this.matter.add.joint(block, ball, 90, 0.4);

  // add a second ball game object
  ball2 = this.matter.add.image(400, 170, 'ball', null, { shape: 'circle', mass: 0.1 });

  // add another joint constraint between the two ball and ball2
  this.matter.add.joint(ball, ball2, 35, 0.4);

  // matter.js lets us define a direct user-controller interaction with any objects via mouse
  this.matter.add.mouseSpring();
}
