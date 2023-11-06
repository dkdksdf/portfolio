const win = $(window);
const gnb = $('.gnb li');
const sections = $('.cb');
const sideNav = $('.sideNav>li');
function scrollToSection(index) {
	let section = sections.eq(index);
	let offset = section.offset().top;
	$('html,body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc');
}

$(document).ready(function() {
	$('a[href="#"]').on('click', function(e) {
	  e.preventDefault();
	});
  });

//네비게이션
gnb.on({
	click: function (e) {
		e.preventDefault();
		let index = $(this).index();
		scrollToSection(index);
	},
});

win.on('scroll', function () {
	let sct = win.scrollTop();
	sections.each(function (i) {
		if (sct >= sections.eq(i).offset().top - 300) {
			gnb.eq(i).addClass('on').siblings().removeClass('on');
			sideNav.eq(i).addClass('on').siblings().removeClass('on');
			sections.eq(i).addClass('on').siblings().removeClass('on');
		}
	});
	sct > 400 ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
});

//프로젝트박스

const sectionss = $('section');
let speed = Math.floor(win.height() * 0.5);
let topArr = [];
let winSCT;
sectionss.each(function (i, o) {
    const sectionTop = $(o).offset().top;
	topArr.push(sectionTop);
});
win.on('scroll', () => {
	winSCT = win.scrollTop();
	/* if (winSCT > topArr[0] - speed) {
		sectionss.eq(0).addClass('is-animated').siblings().removeClass('is-animated');
	} */

	if (winSCT > topArr[1] - speed) {
		sectionss.eq(1).addClass('is-animated').siblings().removeClass('is-animated');
	}

	if (winSCT > topArr[2] - speed) {
		sectionss.eq(2).addClass('is-animated').siblings().removeClass('is-animated');
		pipScroll();
	}
	if (winSCT > topArr[3] - speed) {
		sectionss.eq(3).addClass('is-animated').siblings().removeClass('is-animated');
		pipScroll();
	}
	
});
function pipScroll() {
	const devices = ['.mockup.pc', '.mockup.mobile', '.mockup.tablet'];
	$.each(devices, function (i, deviceEl) {
		const device = $(deviceEl);
		const screen = device.find('.screen');
		const mask = device.find('.mask');
		const hightDifference = screen.innerHeight() - mask.innerHeight();
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

//스킬바
$(() => {
	const len = document.querySelector('svg circle').getTotalLength();
	//628
	const progressWrap = $('.chart');
	const animationOST = $('.charts').offset().top - 600;
	$(window).on('scroll', function () {
		if ($(window).scrollTop() >= animationOST) {
			if (!$('.charts').hasClass('active')) {
				animationChart();
				$('.charts').addClass('active');
			}
		}
	});
	function animationChart() {
		progressWrap.each(function () {
			const item = $(this);
			const title = item.find('h2');
			const targetNum = title.attr('data-num');
			const circle = item.find('circle');
			$({ rate: 0 }).animate(
				{ rate: targetNum },
				{
					duration: 1500,
					progress: function () {
						let now = this.rate;
						let amount = 630 - (630 * now) / 100;
						title.text(Math.floor(now));
						circle.css({ strokeDashoffset: amount });
					},
				}
			);
		});
	}
}); //jQuery

// logodesign
const pics=$(".pic");
const lightbox=$(".lightbox");
const lightImg=$(".lightImage");

pics.on('click',function(){
    const bigLocation=$(this).attr("data-src");
    lightImg.load(bigLocation);
    lightbox.css('display', 'block');
    $('html').addClass('all_scrollFixed');
});
lightbox.on('click', function(){
    lightbox.css('display','none');
    $('html').removeClass('all_scrollFixed');
});
$('.top_btn').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });
