import gameConfig from './config';
import statePreload from '../states/preload';

class Game extends Phaser.Game {
  constructor() {
    const rootGame = super(gameConfig.screen.width, gameConfig.screen.height, Phaser.AUTO, 'root', null, false, false);
    this.game = Object.assign(rootGame, {gameConfig});
  }
  
  start() {
    this.game.state.add('statePreload', statePreload, true);
  }
}

export default Game;
