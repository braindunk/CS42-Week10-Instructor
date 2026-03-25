// phaser game config
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1b1464',
  physics: {
    default: 'matter'
  },
  scene: {
    preload: myPreload,
    create: myCreate,
    update: myUpdate
  }
};

// global variables
let block;
let ball;

// create the phaser game object
let game = new Phaser.Game(config);

function myPreload() {
  // load assets
  this.load.image('block', 'block.png');
  this.load.image('ball', 'shinyball.png');
}
function myCreate() {
  // create code for using Matter is going to look different than Arcade physics.

  // make a game object that has matter physics applied
  // this.matter.add.image() same as this.physics.add.sprite()
  // args: x, y, asset key, frame name, matter.js options + some extra phaser-only properties
  block = this.matter.add.image( 400, 50, 'block', null, { ignoreGravity: true }  );
  block.setMass(5000);

  // matter includes pointer or mouse constraints, phaser translates this mouseSpring()
  this.matter.add.mouseSpring();

  // create some constraints - joints between additional game objects
  // to simulate a chain of objects, each subsequent game object is going to have a joint with the prev
  // constraints take 2 game objects: object a and object b

  // make our first object b
  ball = this.matter.add.image( 400, 150, 'ball', null, { shape: 'circle', mass: 0.1 } );

  // connect the block and the ball as a and b in a constraint using joint()
  // args: bodyA, bodyB, length/distance, stiffness, options
  this.matter.add.joint( block, ball, 90, 0.4 );

  // 
  let ball2 = this.matter.add.image( 400, 170, 'ball', null, { shape: 'circle', mass: 0.1 } );
  this.matter.add.joint( ball, ball2, 35, 0.4 );

}
function myUpdate() {

}