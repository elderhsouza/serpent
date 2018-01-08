'use strict';

import { TILE_SIZE } from './settings.js';

const snake = new createjs.Shape();
snake.graphics
  .f('black')
  .dr(0, 0, TILE_SIZE, TILE_SIZE);

snake.xspeed = 0;
snake.yspeed = 0;
// snake.dir = 'RIGHT';

snake.start = function() {
  console.log('snake start');
}


export default snake;