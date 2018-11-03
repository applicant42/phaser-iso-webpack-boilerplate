import statePlay from './play';

class statePreload extends Phaser.State {
  constructor(game) {
    super(game);
  }
  
  create() {
    this.loadingInfo = this.add.text(
      this.game.gameConfig.screen.width / 2 - (12 * 6),
      this.game.gameConfig.screen.height / 2 - 12,
      'Loading: 0%',
      { font: "12px Arial", fill: "#fff" }
    );

    this.game.load.onFileComplete.add(this.fileComplete, this);
    this.game.load.onLoadComplete.add(this.loadComplete, this);

    this.startLoading();
  }

  startLoading() {
    this.game.plugins.add(new Phaser.Plugin.Isometric(this.game));
    this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    this.game.load.image('cube', 'assets/cube.png');
    this.game.load.start();
  }

  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.loadingInfo.setText('Loading: ' + progress + '%');
  }

  loadComplete() {
    this.cleanState();
    this.game.state.add('statePlay', statePlay, true);
  }

  cleanState() {
    delete this.loadingInfo;
    this.game.load.onFileComplete.dispose();
    this.game.load.onLoadComplete.dispose();
  }
}

export default statePreload;
