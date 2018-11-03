import Game from './core/game';

window.onload = () => {
  console.warn = () => true;
  new Game().start();
};
