const win = $(window);
const gnb = $('.gnb li');
const sections = $('.cb');
const sideNav = $('.sideNav>li');
function scrollToSection(index) {
    let section = sections.eq(index);
    let offset = section.offset().top;
    $('html,body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc')
}

//네비게이션
gnb.on({
    click: function (e) {
        e.preventDefault();
        let index = $(this).index();
        scrollToSection(index)
    },
});
sideNav.on({
    click: function (e) {
        e.preventDefault();
        let index = $(this).index();
        scrollToSection(index)
    },
});
win.on('scroll', function () {
    let sct = win.scrollTop();
    sections.each(function (i) {
        console.log(sections.eq(i).offset().top);
        if (sct >= sections.eq(i).offset().top - 300) {
            gnb.eq(i).addClass('on').siblings().removeClass('on');
            sideNav.eq(i).addClass('on').siblings().removeClass('on');
            sections.eq(i).addClass('on').siblings().removeClass('on');
        }
    });
    (sct > 400) ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
});

//슬로건박스


//프로젝트박스

const sectionss = $('section');
let speed = Math.floor(win.height() * 0.5);
let topArr = [];
let winSCT;
console.log(speed);
//sections.offsetTop
sectionss.each(function (i, o) {
	const sectionTop = $(o).offset().top;
	topArr.push(sectionTop);
});
win.on('scroll', () => {
	winSCT = win.scrollTop();
	if (winSCT > topArr[0] && winSCT < topArr[1]) {
		sectionss.eq(0).addClass('is-animated').siblings().removeClass('is-animated');
	}
	
	if (winSCT > topArr[1] - speed && winSCT < topArr[2]) {
		sections.eq(1).addClass('is-animated').siblings().removeClass('is-animated');
	}
	
    if (winSCT > topArr[2] - speed) {
		sectionss.eq(2).addClass('is-animated').siblings().removeClass('is-animated');
        pipScroll();
	}
});

function pipScroll(params) {
	const devices = ['.mockup.pc', '.mockup.mobile', '.mockup.tablet'];
	$.each(devices, function (i, deviceEl) {
		const device = $(deviceEl);
		const screen = device.find('.screen');
		const mask = device.find('.mask');
		const hightDifference = screen.innerHeight() - mask.innerHeight();
		console.log(hightDifference);
		device.on({
			mouseenter: function () {
                screen.stop().animate({ top: -hightDifference }, 1000);
			},
			mouseleave: function () {
                screen.stop().animate({ top: 0 }, 1000);
			},
		});
	});
}
win.on('resize', function () {
	pipScroll();
});

//스크롤바
$(function(){

  // Remove svg.radial-progress .complete inline styling
  $('svg.radial-progress').each(function( index, value ) { 
      $(this).find($('circle.complete')).removeAttr( 'style' );
  });

  // Activate progress animation on scroll
  $(window).scroll(function(){
      $('svg.radial-progress').each(function( index, value ) { 
          // If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
          if ( 
              $(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
              $(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
          ) {
              // Get percentage of progress
              percent = $(value).data('percentage');
              // Get radius of the svg's circle.complete
              radius = $(this).find($('circle.complete')).attr('r');
              // Get circumference (2πr)
              circumference = 2 * Math.PI * radius;
              // Get stroke-dashoffset value based on the percentage of the circumference
              strokeDashOffset = circumference - ((percent * circumference) / 100);
              // Transition progress for 1.25 seconds
              $(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
          }
      });
  }).trigger('scroll');

});


