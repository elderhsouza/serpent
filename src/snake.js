'use strict';

import _ from 'lodash';
import { STAGE_WIDTH, STAGE_HEIGHT, TILE_SIZE } from './settings.js';

const snake = new createjs.Shape();
snake.graphics
  .f('black')
  .dr(0, 0, TILE_SIZE, TILE_SIZE);

export default Object.assign(snake, {
  xspeed: 0,
  yspeed: 0,
  dir: null,

  start() {
    createjs.Ticker.addEventListener('tick', this.onTickUpdate.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  },

  onTickUpdate(event) {
    this.x += this.xspeed * TILE_SIZE;
    this.y += this.yspeed * TILE_SIZE;

    this.x = _.clamp(this.x, 0, STAGE_WIDTH - TILE_SIZE);
    this.y = _.clamp(this.y, 0, STAGE_HEIGHT - TILE_SIZE);
  },

  onKeyDown(event) {
    switch (event.code) {
    case 'ArrowDown':
      if (this.dir !== 'UP') {
        this.dir = 'DOWN';
        this.yspeed = 1;
        this.xspeed = 0;
      }
      break;
    case 'ArrowUp':
      if (this.dir !== 'DOWN') {
        this.dir = 'UP';
        this.yspeed = -1;
        this.xspeed = 0;
      }
      break;
    case 'ArrowRight':
      if (this.dir !== 'LEFT') {
        this.dir = 'RIGHT';
        this.xspeed = 1;
        this.yspeed = 0;
      }
      break;
    case 'ArrowLeft':
      if (this.dir !== 'RIGHT') {
        this.dir = 'LEFT';
        this.xspeed = -1;
        this.yspeed = 0;
      }
      break;
    }
  }
})