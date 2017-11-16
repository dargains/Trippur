"use strict";

var TRIPPUR = TRIPPUR || {};

TRIPPUR.MODULEA = function () {
  return {
    init: function init(element, data) {
      this.events();
      this.el = $(element);
    },
    variables: function variables() {},
    events: function events() {}
  };
};