
/*!
* Project Scripts
*/

/* off-canvas sidebar toggle */
$(document).on('ready',function(){

	$('[data-toggle=offcanvas]').click(function() {
	  	$(this).toggleClass('text-center');
	    $('.sidebar-container').toggleClass('active');
	});

    $(window).scroll(function() {

        var verticalScroll = $(this).scrollTop();

        if(verticalScroll >= 35) {

            $('.slide').addClass('animate');
        } else {
        	$('.slide').removeClass('animate');
        }

    });

    var hamburger = $('#hamburger-icon');
    hamburger.click(function() {
       hamburger.toggleClass('active');
       return false;
    });

	$(function () {
		$(".youtube").YouTubeModal({autoplay:1, width:640, height:480});
	});
});




