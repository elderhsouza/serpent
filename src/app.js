'use strict';

import 'latest-createjs';
import game from './game.js';

const canvas = document.createElement('canvas');
canvas.id = 'stage';
canvas.width = 600;
canvas.height = 400;

document.body.appendChild(canvas);

window.onload = function() {
    setTimeout(() => {
        game.init();
        game.start();
    }, 1000);
}
