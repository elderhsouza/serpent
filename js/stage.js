'use strict';

import { CANVAS_SELECTOR, STAGE_WIDTH, STAGE_HEIGHT } from './settings.js';

const stage = new createjs.Stage(CANVAS_SELECTOR);
stage.setBounds(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

export default stage