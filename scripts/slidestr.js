/*
 Author: Shaun Hare : @sdh100shaun
 License: http://shaun.mit-license.org/
 Version : 1.0
 requires jQuery
*/
/** Slidestr Object **/ 

var Slidestr = function(options) { 
	
	this.init(options);
	
};
	 

	
/* Init function puts the slides into the stack. */
Slidestr.prototype.init = function(options)
	{
		
		this.options = $.extend({},this.defaults,options);
		this.slides = $(this.options.slides);
		this.slides.hide();
		this.currentSlide=0;
		this.showSlide();
		this.setTopNavigation(this.options.navigationState);
		
	};

Slidestr.prototype.setTopNavigation=function(state)
{
	if (state=='hide') {
      setTimeout(function(){
        $('header').fadeTo(300, 0);
      }, 1500);

      $('header').hover(
        function() {
          $('header').fadeTo(300, 1);
        },
        function() {
          $('header').fadeTo(300, 0);
        }
      );
  }
}
Slidestr.prototype.showSlide = function ()
{
	if(this.currentSlide >= this.slides.length)
	{
		this.currentSlide=0;
		this.showSlide();
		return false;
	}
	if(this.options.transition == 'fade')
	{
		$(this.slides[this.currentSlide]).fadeIn('slow', function() {
		        // Animation complete
				$("html").trigger("slideFadeComplete.slidestr",this.currentSlide);
		      });
	}
	else
	{
		$(this.slides[this.currentSlide]).show();
	}
	location.hash = this.currentSlide;
	history.pushState(null, null, location.href);
	
}

Slidestr.prototype.hideSlide =function(slide)
{
	$(this.slides[slide]).hide();
}
Slidestr.prototype.nextSlide=function()
{
	this.hideSlide(this.currentSlide);
	this.currentSlide ++;
	$("html").trigger("slideChange.slidestr",this.currentSlide);
	this.showSlide();
}

Slidestr.prototype.previousSlide = function()
{
	this.hideSlide(this.currentSlide);
	this.currentSlide--;
	$("html").trigger("slideChange.slidestr",this.currentSlide);
	this.showSlide();
}
Slidestr.prototype.defaults = {
	slides:"section",
	transition:'fade',
};

Slidestr.prototype.bindNavigation= function()
{
	var self=this;
	
	$("a[name='next']").bind('click',function(){
		self.nextSlide();
		return false;
	});
	$("a[name='previous']").bind('click',function(){
		if(self.currentSlide>0)
		{
			
			self.previousSlide();
		}
		return false;
	});
	
	document.addEventListener('keydown', function(e)
	        {
	          switch(e.keyCode)
	                {

	                        case 37: // left
	                                self.previousSlide();
	                                break;

	                        case 38: // up
																	case 32:
	                                self.showAction();
	                                break;

	                        case 39: // right
													case 13:
													
	                                self.nextSlide();
	                                break;

	                        case 40: // down
	                                self.hideAction();
	                                break;
	                };
		
	});
	
	window.addEventListener("popstate", function(e) {
	    
			
	});
}
Slidestr.prototype.showAction = function()
{
	if($(this.slides[this.currentSlide]).find(".action").length)
	{
		$(this.slides[this.currentSlide]).find(".action:first").removeClass("action").addClass("action-shown");
		
	}
	else
	{
		this.nextSlide();
	}
	
}
Slidestr.prototype.hideAction = function()
{
	if($(this.slides[this.currentSlide]).find(".action-shown").length)
	{
		$(this.slides[this.currentSlide]).find(".action-shown:last").removeClass("action-shown").addClass("action");
	}
	else
	{
		this.previousSlide();
	}
	
}
Slidestr.prototype.slides;
Slidestr.prototype.options;
Slidestr.prototype.currentSlide;



var slides = {
	
	init: function(){
		
		slides = new Slidestr(options={navigationState:'hide'});
		slides.bindNavigation();
	}
	
	
};