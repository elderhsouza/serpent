'use strict';

import _ from 'lodash';
import { STAGE_WIDTH, STAGE_HEIGHT } from './settings.js';

import stage from './stage.js';
import food from './food.js';
import snake from './snake.js';

let score = 0;

function onTickUpdate(event) {
  stage.update();
}

export default {

  init() {

    console.log(stage, snake);

    stage.addChild(food);
    stage.addChild(snake);

    createjs.Ticker.framerate = 12;

    function onStageTick(event) {
      // let x = snake.x + (snake.xspeed * TILE_SIZE);
      // let y = snake.y + (snake.yspeed * TILE_SIZE);

      // if (x <= 0 || x >= STAGE_WIDTH || y <= 0 || y >= STAGE_HEIGHT) {
      //   createjs.Ticker.removeEventListener('tick', onStageTick);
      //   return;
      // }

      // for (let i = 0; i < snake.tail.length; i++) {
      //   if (x === snake.tail[i].x && y === snake.tail[i].y) {
      //     createjs.Ticker.removeEventListener('tick', onStageTick);
      //     return;
      //   }
      // }

      // if (Math.hypot(x - food.x, y - food.y) < 10) {
      //   foodEaten();
      // }

      // for (let i = 0; i < snake.tail.length - 1; i++) {
      //   snake.tail[i] = snake.tail[i + 1];
      // }
      // if (snake.length >= 1) {
      //   snake.tail[snake.length - 1] = {x: snake.x, y: snake.y};
      // }

      // for (let i = 0; i < snake.tail.length; i++) {
      //   snake.parts[i].x = snake.tail[i].x;
      //   snake.parts[i].y = snake.tail[i].y;
      //   stage.addChild(snake.parts[i]);
      // }

      // snake.x += snake.xspeed * TILE_SIZE;
      // snake.y += snake.yspeed * TILE_SIZE;

      // snake.x = _.clamp(snake.x, 0, STAGE_WIDTH - TILE_SIZE);
      // snake.y = _.clamp(snake.y, 0, STAGE_HEIGHT - TILE_SIZE);

      // stage.update();
    }
    // createjs.Ticker.framerate = 12;
    // createjs.Ticker.addEventListener('tick', onStageTick);

    function onKeyDown(event) {

    }

    function onClick(event) {
      // event.preventDefault();
      // snake.x += TILE_SIZE;
      // foodEaten();
      // console.log(snake.x, food.x, Math.hypot(snake.x - food.x, snake.y - food.y));
    }

    function foodEaten() {
      snake.length++;

      score += 10;

      const snakePart = new createjs.Shape();
      snakePart.graphics
        .f('red')
        .dr(0, 0, TILE_SIZE, TILE_SIZE);

      snake.parts.push(snakePart);

      let foodLocation = pickFoodLocation();
      food.x = foodLocation.x;
      food.y = foodLocation.y;
    }

    function pickFoodLocation() {
      const filledLocations = [{x: snake.x, y: snake.y}, ...snake.tail];

      let x, y;
      do {
        x = TILE_SIZE * _.random(0, STAGE_WIDTH / TILE_SIZE - 1);
        y = TILE_SIZE * _.random(0, STAGE_HEIGHT / TILE_SIZE - 1);
      } while (filledLocations.findIndex(point => point.x === x && point.y === y) !== -1);

      return new createjs.Point(x, y);
    }
  },

  start() {
    createjs.Ticker.framerate = 12;
    createjs.Ticker.addEventListener('tick', onTickUpdate);

    snake.start();
  },

  end() {
    createjs.removeEventListener('tick', onTickUpdate);
  },

  onTickUpdate(event) {
    stage.update();
  }
}