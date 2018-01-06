"use strict";

export default function snake() {
  let xspeed = 0;
  let yspeed = 0;
  let displayObject;

  function create() {
    displayObject = new createjs.Shape();
    displayObject.graphics
      .f('black')
      .dr(0, 0, 20, 20);
  }

  function attach() {

  }

  return {
    create: create
  }
}