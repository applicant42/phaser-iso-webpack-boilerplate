class statePlay extends Phaser.State {
  constructor(game) {
    super(game);
  }

  create() {
    this.isoGroup = this.game.add.group();
    this.game.physics.isoArcade.gravity.setTo(0, 0, -500);

    let cube;
    for (let x = 0; x <= 300; x += 100) {
      for (let y = 0; y <= 300; y += 100) {
        cube = this.game.add.isoSprite(x, y, 0, 'cube', 0, this.isoGroup);
        cube.tint = 0xbf1721;
        cube.anchor.set(0.5);
        this.game.physics.isoArcade.enable(cube);
        cube.body.collideWorldBounds = true;
        cube.body.bounce.set(1, 1, 0.2);
      }
    }

    this.player = this.game.add.isoSprite(50, 50, 0, 'cube', 0, this.isoGroup);
    this.player.tint = 0x86bfda;
    this.player.anchor.set(0.5);
    this.game.physics.isoArcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACEBAR
    ]);

    this.game.camera.follow(this.player);
  }

  update() {
    const speed = 10;

    if (this.cursors.up.isDown) {
      this.player.body.velocity.y -= speed;
    }
    else if (this.cursors.down.isDown) {
      this.player.body.velocity.y += speed;
    }
    else {
      this.player.body.velocity.y = 0;
    }

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x -= speed;
    }
    else if (this.cursors.right.isDown) {
      this.player.body.velocity.x += speed;
    }
    else {
      this.player.body.velocity.x = 0;
    }

    this.game.physics.isoArcade.collide(this.isoGroup);
    this.game.iso.topologicalSort(this.isoGroup);
  }

  render() {

    this.game.debug.cameraInfo(this.camera, 15, 15);
  }
}

export default statePlay;
