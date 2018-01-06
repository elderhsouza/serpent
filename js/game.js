
'use strict';

import _ from 'lodash';

const tileSize = 20;
const stageWidth = 600;
const stageHeight = 400;
let score = 0;

export default {
  init(canvas) {
    const stage = new createjs.Stage(canvas);
    stage.setBounds(0, 0, stageWidth, stageHeight);

    // food
    const food = new createjs.Shape();
    food.graphics
      .f('green')
      .drawCircle(10, 10, tileSize >> 1);

    const foodLocation = pickFoodLocation();
    food.x = foodLocation.x;
    food.y = foodLocation.y;

    stage.addChild(food);


    // snake
    const snake = new createjs.Shape();
    snake.x = 20;
    snake.y = 20;
    snake.xspeed = 0;
    snake.yspeed = 0;
    snake.dir = 'RIGHT';

    snake.tail = [];
    snake.parts = [];
    snake.length = 0;

    snake.graphics
      .f('black')
      .dr(0, 0, tileSize, tileSize);
    snake.cache(0, 0, tileSize, tileSize);

    stage.addChild(snake);


    function onStageTick(event) {
      let x = snake.x + (snake.xspeed * tileSize);
      let y = snake.y + (snake.yspeed * tileSize);

      if (x <= 0 || x >= stageWidth || y <= 0 || y >= stageHeight) {
        console.log('wall');
        // createjs.Ticker.reset();
        createjs.Ticker.removeEventListener('tick', onStageTick);
        return;
      }

      for (let i = 0; i < snake.tail.length; i++) {
        // console.log(`part #${i}`);
        // console.log(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y);
        if (x === snake.tail[i].x && y === snake.tail[i].y) {
          // createjs.Ticker.reset();
          createjs.Ticker.removeEventListener('tick', onStageTick);
          return;
        }
      }

      if (Math.hypot(x - food.x, y - food.y) < 10) {
        foodEaten();
      }

      for (let i = 0; i < snake.tail.length - 1; i++) {
        snake.tail[i] = snake.tail[i + 1];
      }
      if (snake.length >= 1) {
        snake.tail[snake.length - 1] = {x: snake.x, y: snake.y};
      }

      for (let i = 0; i < snake.tail.length; i++) {
        snake.parts[i].x = snake.tail[i].x;
        snake.parts[i].y = snake.tail[i].y;
        stage.addChild(snake.parts[i]);
      }

      snake.x += snake.xspeed * tileSize;
      snake.y += snake.yspeed * tileSize;

      snake.x = _.clamp(snake.x, 0, stageWidth - tileSize);
      snake.y = _.clamp(snake.y, 0, stageHeight - tileSize);

      // let hasIntersected = snake.parts
      //   .reduce(part => (snake.x === part.x && snake.y === part.y), false);
      // if (hasIntersected) {
      //   console.log('intersected');
      // }


      stage.update();
    }
    createjs.Ticker.framerate = 12;
    createjs.Ticker.addEventListener('tick', onStageTick);

    function onKeyDown(event) {
      switch (event.code) {
        case 'ArrowDown':
          if (snake.dir !== 'UP') {
            snake.dir = 'DOWN';
            snake.yspeed = 1;
            snake.xspeed = 0;
          }
          break;
        case 'ArrowUp':
          if (snake.dir !== 'DOWN') {
            snake.dir = 'UP';
            snake.yspeed = -1;
            snake.xspeed = 0;
          }
          break;
        case 'ArrowRight':
          if (snake.dir !== 'LEFT') {
            snake.dir = 'RIGHT';
            snake.xspeed = 1;
            snake.yspeed = 0;
          }
          break;
        case 'ArrowLeft':
          if (snake.dir !== 'RIGHT') {
            snake.dir = 'LEFT';
            snake.xspeed = -1;
            snake.yspeed = 0;
          }
          break;
      }
    }

    function onClick(event) {
      // event.preventDefault();
      // snake.x += tileSize;
      // foodEaten();
      // console.log(snake.x, food.x, Math.hypot(snake.x - food.x, snake.y - food.y));
    }

    function foodEaten() {
      snake.length++;
      score += 10;

      const snakePart = new createjs.Shape();
      snakePart.graphics
        .f('red')
        .dr(0, 0, tileSize, tileSize);

      snake.parts.push(snakePart);

      let foodLocation = pickFoodLocation();
      food.x = foodLocation.x;
      food.y = foodLocation.y;

      console.log(score);
    }

    function pickFoodLocation() {
      return {
        x: tileSize * _.random(0, stageWidth / tileSize - 1),
        y: tileSize * _.random(0, stageHeight / tileSize - 1),
      }
    }

    document.addEventListener('click', onClick.bind(this));
    document.addEventListener('keydown', onKeyDown.bind(this));
  }
}