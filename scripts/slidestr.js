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
		console.log("end of show")
		$("body").append("<section><h1>The End</h1></section>");
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
	
	$(document).keypress(function(event){
		
		switch(event.keyCode){
			case 32:
			case 13:
			self.nextSlide();
			break;
			case 32:
		    case 34:
		    case 39:
		    case 40:
			self.previousSlide();
			default:
			console.log(event.keyCode);
			
		};
		
	});
	
}
Slidestr.prototype.slides;
Slidestr.prototype.options;
Slidestr.prototype.currentSlide;



var slides = {
	
	init: function(){
		
		slides = new Slidestr();
		slides.bindNavigation();
	}
	
	
};