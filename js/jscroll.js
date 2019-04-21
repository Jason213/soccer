//=======头部 导航
$(function(){
	/*快捷菜单宽度自适应*/
	function win_ch(){
		if($('.menu_bar').css('position') ==='absolute'){
		var bar_l = $('.header').offset().left;
		$('.menu_bar').css({'left':-bar_l,'width':$(window).width()});
		bar_left  = $('.menu_bar').css('left');}
	}
	
	//快捷菜单滚动后在顶部
	function show_bar(barTop) {
		var scrollTop = $(window).scrollTop();
		if(window.XMLHttpRequest)
		{
			if(scrollTop >= barTop)
			{
				$('.menu_bar').css({position: 'fixed', top: 0,left:0});
			}
			else {
				$('.menu_bar').css({position: 'absolute', top: 0 });
			}
		}
		else {
			if(scrollTop >= barTop)
			{	win_ch();
				$(window).resize(function(){
					win_ch();
				})
				$('.menu_bar').css({top: scrollTop - barTop});
			}
			else {
				$('.menu_bar').css({'top':0, 'left':0, 'width': '100%'});
			}
		}
	}
	
	barTop = $('.menu_bar').offset().top;
	$(window).bind("scroll", function(){
		show_bar(barTop);
		var sTop = $(window).scrollTop();
	});	
});

$(function(){
	$(".menu_b li.mn").hover(function(){
		$(this).addClass('cur');
		$(this).find(".menu_sub").show();
	},function(){
		$(this).removeClass('cur');
		$(this).find(".menu_sub").hide();
	})
})

