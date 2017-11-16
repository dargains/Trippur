var TRIPPUR = TRIPPUR || {};

TRIPPUR.MAIN = (function() {
  return {
    init: function() {
      $('[data-control]').each(function(index, elem) {
        var data = $(elem).data(),
          control = data.control;
        if (!TRIPPUR[control]) return;
        if (typeof TRIPPUR[control] === 'function') {
          var obj = new TRIPPUR[control];
          obj.init(elem, data);
        } else if (typeof TRIPPUR[control] === 'object') TRIPPUR[control].init(elem, data);
      });
    }
  }
})();

$(document).ready(function() {
  TRIPPUR.MAIN.init();
});
