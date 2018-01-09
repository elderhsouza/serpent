'use strict';

import { TILE_SIZE } from './settings.js';

const food = new createjs.Shape();

food.graphics
  .f('green')
  .drawCircle(TILE_SIZE >> 1, TILE_SIZE >> 1, TILE_SIZE, TILE_SIZE);


export default food