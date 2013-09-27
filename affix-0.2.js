/**
* affix v0.2
* https://github.com/Lugat/affix
*
* Copyright (c) 2013 Squareflower Websolutions - Lukas Rydygel
* Licensed under the MIT license
*/
;(function($, window, document, undefined) {

  var PLUGIN_NAME = 'affix';
  
  function Plugin(element, settings) {
    
    this.settings = $.extend({
      offset: 'auto',
      helper: 'affix',
      body: 'affix',
      on: function() {},
      off: function() {}
    }, settings);
    this.name = PLUGIN_NAME;
    this.$element = $(element),
    this.offset = (this.settings.offset === 'auto') ? this.$element.offset().top : this.settings.offset;
    this.init();
    
  };

  Plugin.prototype.init = function() {

    var that = this;

    $(window).scroll(function() {
      that.spy();
    }).resize(function() {
      that.spy();
    });

    that.spy();

  };

  Plugin.prototype.spy = function() {

    var $body = $('body'),   
        applied = this.$element.hasClass(this.settings.helper) && $body.hasClass(this.settings.body),
        added;

    if ($(window).scrollTop() > this.offset) {
      
      added = true;
      
      this.$element.addClass(this.settings.helper);
      $body.addClass(this.settings.body);
      
    } else {
      
      added = false;
      
      this.$element.removeClass(this.settings.helper);
      $body.removeClass(this.settings.body);
            
    }
    
    if (applied && !added) {
      this.settings.off.apply(this.$element);
    } else if (!applied && added) {
      this.settings.on.apply(this.$element);
    }

  };

  $.fn[PLUGIN_NAME] = function(settings) {

    return this.each(function() {
      new Plugin(this, settings);
    });
    
  };

}(jQuery, window, document));