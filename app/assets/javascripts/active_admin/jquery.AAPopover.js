;( function($, window, document, undefined) {
  
  
  var pluginName = 'AAPopover';
  
  var defaults = {
    fadeInDuration: 20,
    fadeOutDuration: 100,
    autoOpen: true
  }
  
  function AAPopover( element, options ) {
    this.element = element;
    this.$element = $(element);
    
    this.$popoverContent = null;
    
    
    this.options = $.extend( {}, defaults, options);
    
    if ($(this.$element.attr("href")).length > 0) {
      this.$popoverContent = $(this.$element.attr("href"));
    }
    
    // Create nipple
    this.$popoverContent.prepend("<div class=\"popover_nipple\"></div>");
    
    
    this._name = pluginName;
    
    this.isOpen = false;
    
    this.init();
  }
  
  AAPopover.prototype.init = function() {
    var _this = this;
        
    this.$popoverContent.hide();
    
    this.$popoverContent.addClass("popover");
    
    if (this.options.autoOpen == true) {
      this.$element.bind('click', function(){
        _this.open();
        return false;
      });
    };
    
    $(document).bind('click', function() {
      if (_this.isOpen == true) {
        _this.close();
      };
    });
    
    this.$popoverContent.click(function(e){
      e.stopPropagation();
      e.preventDefault();
    });
  }
  
  AAPopover.prototype.open = function() {
    this.isOpen = true;
    this.$popoverContent.fadeIn(this.options.fadeInDuration);
    
    
    // Center the popover under the opening element
    
    var centerOfButtonFromLeft = this.$element.offset().left + this.$element.outerWidth() / 2;
    var centerOfPopoverFromLeft = this.$popoverContent.outerWidth() / 2;
    var popoverLeftPos = centerOfButtonFromLeft - centerOfPopoverFromLeft;
    this.$popoverContent.css('left', popoverLeftPos);
    
    // Center the nipple in the middle of the popover
    
    var bottomOfButtonFromTop = this.$element.offset().top + this.$element.outerHeight() + 10;
    this.$popoverContent.css('top',  bottomOfButtonFromTop);
    var $nipple = this.$popoverContent.find(".popover_nipple");
    var centerOfnippleFromLeft = $nipple.outerWidth() / 2;
    
    console.log($nipple.outerWidth());
    console.log($nipple.width());
    
    var nippleLeftPos = centerOfPopoverFromLeft - centerOfnippleFromLeft;
    
    $nipple.css('left', nippleLeftPos)
    
  }
  
  AAPopover.prototype.close = function() {
    this.isOpen = false;
    this.$popoverContent.fadeOut(this.options.fadeOutDuration);
  }
  
  AAPopover.prototype.destroy = function() {
    this.$element.removeData(pluginName);
    this.$element.unbind();
    this.$element = null;
  }
  
  // Register as a jQuery plugin
  
  $.fn[pluginName] = function(method_or_options) {
    var popOver = null;
    
    if ( AAPopover.prototype[method_or_options] ) {
      popover[method_or_options]();
    } else if ( typeof method_or_options === 'object' || ! method_or_options ) {
      return this.each(function(){
        if (!$.data(this, pluginName)) {
          $.data(this, pluginName, 
            popover = new AAPopover(this, method_or_options));
        }
      });
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  }
  
})( jQuery, window, document );