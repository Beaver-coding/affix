/**
* affix v0.1
* https://github.com/Lugat/affix
*
* Copyright 2013, Lukas Rydygel
* Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
* http://creativecommons.org/licenses/by-sa/3.0/
*/
;(function($, window, document, undefined) {

  var PLUGIN_NAME = 'affix';
  
  function Plugin(element, settings) {
    
    this.settings = $.extend({
      offset: 'auto',
      helper: 'affix',
      body: 'affix'
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

    if ($(window).scrollTop() > this.offset) {
      
      this.$element.addClass(this.settings.helper);
      $('body').addClass(this.settings.body);
      
    } else {
      
      this.$element.removeClass(this.settings.helper);
      $('body').removeClass(this.settings.body);
      
    }

  };

  $.fn[PLUGIN_NAME] = function(settings) {

    return this.each(function() {
      new Plugin(this, settings);
    });
    
  };

}(jQuery, window, document));