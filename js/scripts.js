document.addEventListener('DOMContentLoaded', function(){

	$('.blue-card .card-features ul:not(.tick-list)').addClass('tick-list column-1');

	setTimeout(function(){
		document.body.classList.add('loaded');
	}, 300);

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204 344"><path d="M63 172L204 32 172 0 0 172l172 172 32-32L63 172z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204 344"><path d="M141 172L0 312l32 32 172-172L32 0 0 32l141 140z"/></svg></button>'
	}

	$('.first-screen-slider').on('init reInit beforeChange', function(e, s, c, n){
		let slide = (n ? n : 0) + 1;

		$('.first-screen-slider-wrapper').removeClass('on-slide-1 on-slide-2 on-slide-3 on-slide-4').addClass('on-slide-'+slide);

		$('.first-screen-slider-nav .nav-dots-wrapper .current').html(slide);
		$('.first-screen-slider-nav .nav-dots-wrapper .total').html(s.slideCount);
	});

	$('.first-screen-slider').on('init reInit', function(e, s, c, n){
		setTimeout(function(){
			$('.first-screen-slider [data-slick-index="0"]').addClass('animated');
		}, 200);
	});

	$('.first-screen-slider').on('beforeChange', function(e, s, current, next){
		$('.first-screen-slider [data-slick-index="'+current+'"]').removeClass('animated');
		$('.first-screen-slider [data-slick-index="'+next+'"]').addClass('animated');
	});

	let controls = {
		arrows: {
			desktop: $('.first-screen-slider-nav.md-hidden .nav-arrows'),
			mobile: $('.first-screen-slider-nav.md-visible .nav-arrows')
		},

		dots: {
			desktop: $('.first-screen-slider-nav.md-hidden .dots'),
			mobile: $('.first-screen-slider-nav.md-visible .dots')
		}
	}

	$('.first-screen-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		...arrowsButtons,
		dots: true,
		appendArrows: $(window).width() >= 992 ? controls.arrows.desktop : controls.arrows.mobile,
		appendDots: $(window).width() >= 992 ? controls.dots.desktop : controls.dots.mobile,
		infinite: true,
		speed: 600,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 5000
		// fade: true
	});

	equalSlideHeight('.first-screen-slider');


	if ($(window).width() < 992) {
		$('.partners-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			infinite: true,
			speed: 600,
			centerMode: true,
			swipeToSlide: true,
			autoplay: true,
			autoplaySpeed: 1500,
			// responsive: [
			// 	{
			// 		breakpoint: 576,
			// 		settings: {
			// 			slidesToShow: 3
			// 		}
			// 	}
			// ]
		});

		equalSlideHeight('.partners-slider');
	}

	if ($(window).width() < 992 && $(window).width() > 679) {
		$('.apps-slider').slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: true,
			...arrowsButtons,
			dots: false,
			infinite: true,
			speed: 600,
			// centerMode: true,
			swipeToSlide: true,
			autoplay: true,
			autoplaySpeed: 1500,
			// responsive: [
			// 	{
			// 		breakpoint: 576,
			// 		settings: {
			// 			slidesToShow: 3
			// 		}
			// 	}
			// ]
		});

		equalSlideHeight('.apps-slider');
	}

	if ($(window).width() < 767) {
		$('.time-list').slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: false,
			// ...arrowsButtons,
			dots: true,
			infinite: true,
			speed: 600,
			// centerMode: true,
			swipeToSlide: true,
			// autoplay: true,
			// autoplaySpeed: 1500,
			// responsive: [
			// 	{
			// 		breakpoint: 576,
			// 		settings: {
			// 			slidesToShow: 3
			// 		}
			// 	}
			// ]
		});
	}

	$('.phone-slider').slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		swipe: false,
		pauseOnFocus: false,
		pauseOnHover: false,
		dots: false
	});

	// Select
	$('.fake-select').each(function(i, el){
		$(el).find('.field').click(function(e){
			e.preventDefault();

			$(el).toggleClass('opened');
		});

		$(el).find('.option').click(function(e){
			e.preventDefault();

			$(el).removeClass('opened').addClass('selected');
			$(el).find('.field').html( $(this).html() );
		});
	});

	// 
	$('.phone-or-messenger').each(function(i, el){
		let blockWidth = $(el).width();

		$(el).find('.fake-select .list').css({
			width: blockWidth + 'px'
		})

		let selectedTypeHtml;
		let selectedCountryHtml;

		function goToStep2(type){
			$(el).addClass('on-step-2').removeClass('on-step-3');

			$(el).find('.step-2 .js-selected-type .field').html(selectedTypeHtml);


			if (type === 'phone') {
				$(el).find('.step-2').removeClass('messenger').addClass('phone');
			} else {
				$(el).find('.step-2').removeClass('phone').addClass('messenger');
			}
		}

		function goToStep3(code){
			$(el).addClass('on-step-3').removeClass('on-step-2');

			$(el).find('.step-3 .js-country-select .field').html(selectedCountryHtml);
			$(el).find('.step-3 .code').text(code);
		}

		// First step
		$(el).find('.step-1 .fake-select, .step-3 .js-selected-type').each(function(i, firstSelect){
			$(firstSelect).find('.option').click(function(e){
				let selectedOption = $(this).data('type').toLowerCase();

				selectedTypeHtml = $(this).html();

				goToStep2(selectedOption);
			});
		});

		// Second step
		$(el).find('.step-2 .fake-select.js-selected-type').each(function(i, firstSelect){
			$(firstSelect).find('.option').click(function(e){
				let selectedOption = $(this).data('type').toLowerCase();

				selectedTypeHtml = $(this).html();

				goToStep2(selectedOption);
			});
		});

		$(el).find('.step-2 .fake-select.country-select').each(function(i, firstSelect){
			$(firstSelect).find('.option').click(function(e){
				let selectedCountryCode = $(this).data('code');

				selectedCountryHtml = $('<div>').append($(this).find('.option-icon').clone()).html();

				goToStep3(selectedCountryCode);
			});
		});

		// Third step

		$(el).find('.step-3 .fake-select.js-country-select').each(function(i, firstSelect){
			$(firstSelect).find('.option').click(function(e){
				let selectedCountryCode = $(this).data('code');

				selectedCountryHtml = $('<div>').append($(this).find('.option-icon').clone()).html();

				goToStep3(selectedCountryCode);
			});
		});
	});


	if ($(window).width() < 575){
		$('.footer-caption').click(function(){
			$(this).toggleClass('opened').siblings('.footer-nav').stop().slideToggle(300);
		});
	}


	function isElementInViewport (el) {

		// Special bonus for those using jQuery
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}

		var rect = el.getBoundingClientRect();

		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
		);
	}

	// Animations
	$('.slider-nav').each(function(i, el){
		$(window).on('scroll', function(){
			if (isElementInViewport(el)) {
				if ( !$(el).hasClass('js-activated') ) {
					
					$(el).find('.btn').each(function(j, button){
						setTimeout(function(){
							$(button).addClass('animated');
						}, (j - 1) * 100);
					});

					$(el).addClass('js-activated');
				}
			}
		})
	});

	function typeWriter(text, elem, n = 0) {
		if (n < (text.length)) {
			$(elem).html(text.substring(0, n+1));
			n++;
			setTimeout(function() {
				typeWriter(text, elem, n)
			}, 50);
		}
	}

	// Typed
	// $('.typed').each(function(i, el){
	// 	let text = $(el).data('text');

	// 	$(window).on('scroll', function(){
	// 		if (isElementInViewport(el)) {
	// 			if ( !$(el).hasClass('js-activated') ) {
	// 				typeWriter(text, $(el), 0);
	// 				$(el).addClass('js-activated');
	// 			}
	// 		}
	// 	})
	// });

	$('.products-slider-wrapper').each(function(i, el){
		$(el).find('.products-slider').on('init reInit beforeChange', function(e, s, c, n){
			let slide = (n ? n : 0) + 1;

			$(el).find('.slider-nav [data-slide='+slide+']').addClass('active').siblings().removeClass('active').blur();
		});

		$(el).find('.slider-nav-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			infinite: false,
			speed: 600,
			asNavFor: $(el).find('.products-slider'),
			centerMode: true,
			centerPadding: '30%',
			focusOnSelect: true
		});

		$(el).find('.products-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			infinite: false,
			speed: 600,
			autoplay: true,
			autoplaySpeed: 6000,
			asNavFor: $(el).find('.slider-nav-slider')
		});

		$(el).find('.slider-nav [data-slide]').click(function(e){
			e.preventDefault();

			$(el).find('.products-slider').slick('slickGoTo', $(this).data('slide') - 1);
		});
	});

	$('.slider-with-nav-component').each(function(i, el){
		let $cmpSlider = $(el).find('.cmp-slider');

		$cmpSlider.on('init reInit beforeChange', function(e, s, c, n){
			let slide = (n ? n : 0) + 1;

			$(el).find('.cmp-nav [data-slide='+slide+']').addClass('active').siblings().removeClass('active').blur();
		});

		$(el).find('.slider-nav-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			infinite: true,
			speed: 600,
			asNavFor: $cmpSlider,
			centerMode: true,
			centerPadding: '30%',
			focusOnSelect: true
		});

		$cmpSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			infinite: true,
			speed: 600,
			asNavFor: $(el).find('.slider-nav-slider')
		});

		$(el).find('.cmp-nav [data-slide]').click(function(e){
			e.preventDefault();

			$cmpSlider.slick('slickGoTo', $(this).data('slide') - 1);
		});
	});

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	$('.wow-random-delay .wow').each(function(i, el){
		let delay = "0." + (getRandomInt(7) + 2) + "s";
		el.setAttribute('data-wow-delay', delay);

		new WOW().init();
	});

	new WOW().init();

	$('[data-delay]').each(function(i, el){
		$(el).css({
			transitionDelay: $(el).data('delay')
		});
	});


	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		let pageNavOffset = 0;

		if( $(this).is('.nav-btn') ){
			pageNavOffset = 80;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 80 - pageNavOffset
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$(this).toggleClass('active');
		$('.mobile-top-nav-wrapper').toggleClass('opened');
		$('.header').toggleClass('nav-opened');
	});

	// Mobile nav
	// $('.mobile-top-nav a').click(function(){
	// 	$('.menu-opener').click();
	// });

	$('.mobile-nav .current-menu-parent').addClass('opened').find('.sub-menu').stop().slideToggle(300);

	$('.mobile-nav .menu-item-has-children > a').click(function(e){
		e.preventDefault();
	});

	$('.mobile-nav .menu-item-has-children li a').click(function(e){
		e.stopPropagation();
	});

	$('.mobile-nav .menu-item-has-children').click(function(){
		$(this).toggleClass('opened').find('.sub-menu').stop().slideToggle(300);
	});

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 0
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}

	window.addEventListener('scroll', function(){
		stickyHeader();
	});

	setTimeout(function(){
		stickyHeader();
	}, 300);

	// Sticky Page Nav
	if ( $('div').is('.timeline-section .tabs-nav-wrapper') ) {
		let pageNavTopOffset = $('.timeline-section .tabs-nav-wrapper').offset().top;
		let headerHeight = 60;

		$('.timeline-section .tabs-nav-wrapper').css({
			minHeight: headerHeight+'px'
		});

		// if ($(window).width() >= 768) {
			$(window).scroll(function(e){
				if ($(window).scrollTop() + headerHeight > pageNavTopOffset) {
					$('.timeline-section .tabs-nav-wrapper').addClass('sticky');
					$('.timeline-section .tabs-nav-wrapper').css({'top': headerHeight+'px'})
				} else{
					$('.timeline-section .tabs-nav-wrapper').removeClass('sticky');
					$('.timeline-section .tabs-nav-wrapper').css({'top': 0})
				}
			});
		// }
	}

	// var lastScrollTop = 0;
	// window.addEventListener("scroll", function(){
	// 	let header = document.querySelector('.header');
	// 	var st = window.pageYOffset || document.documentElement.scrollTop;
	// 	if (st > lastScrollTop){
	// 		header.classList.remove('visible');
	// 	} else {
	// 		header.classList.add('visible');
	// 	}
	// 	lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
	// }, false);

	// Modals
	$('.modal').css('display','block');

	function getScrollWidth(){
		// create element with scroll
		let div = document.createElement('div');

		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';

		document.body.append(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;

		div.remove();

		return scrollWidth;
	}

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		// hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		showModal( $(this).data('modal') );
	});

	$('[data-video-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$('#modal-video-iframe').append('<div class="video-iframe" id="'+videoId+'"></div>');
			createVideo(videoId, videoId);
		} else if(videoType == 'vimeo'){
			$('#modal-video-iframe').html('<iframe class="video-iframe" src="https://player.vimeo.com/video/'+videoId+'?playsinline=0&autoplay=1&transparent=0&app_id=122963">');
		}

		hideModal('.modal');

		showModal( "#video-modal" );
	});


	// Video
	$('.video-block:not([data-video-modal])').on('click', function () {
		$(this).addClass('playing');

		var $videoId = $(this).data('video-id');
		$(this).append('<div class="video-iframe" id="'+$videoId+'"></div>');
		createVideo($videoId, $videoId);
	});

	var player;
	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				'showinfo' : 0,
				'rel': 0,
				'loop': 1
			},
			events: {
				'onReady': function (e) {
					// e.target.mute();
					e.target.playVideo();
				}
			}
		});
	}

	$('.modal-btn').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 800);
	});

	let bodyScrolled = 0;
	function showModal(modal, ){
		$(modal).addClass('visible');
		bodyScrolled = $(window).scrollTop();
		$('body').addClass('modal-visible')
				 .scrollTop(bodyScrolled)
				 .css('padding-right', getScrollWidth());

		$('[data-src]').each( (i, el) => {
			$(el).attr('src', $(el).data('src'));
			el.removeAttribute('data-scr');
		} );
	}

	function hideModal(modal){
		$(modal).removeClass('visible');
		bodyScrolled = $(window).scrollTop();
		$('body').removeClass('modal-visible')
				 .scrollTop(bodyScrolled)
				 .css('padding-right', 0);

		$('#modal-video .video-iframe').hide();
	}

	function goToTab(tabId, handler){
		if (handler == undefined) {
			handler = false;
		}

		let dest = $( tabId );
		dest.stop().fadeIn(300).siblings().hide(0);

		if (handler != false) {
			$(handler).addClass('current').parent().siblings().find("[data-tab]").removeClass('current');
		}
	}

	// Tabs
	$("[data-tab]").click(function(e){
		e.preventDefault();
		let dest = $( $(this).data('tab') );

		goToTab(dest, $(this));

		dest.find('.slick-slider').slick('setPosition');
	});


	// Forms
	$('input, textarea').on('keyup', function(){
		!!$(this).val() 
			? $(this).closest('label').addClass('not-empty') 
			: $(this).closest('label').removeClass('not-empty');
	});

	// Fancybox
	// $(".fancybox").fancybox();

	// Odometer
	window.odometerOptions = {
		auto: false,
		selector: '.odometer',
		format: '( ddd),dd',
		duration: 1500,
		theme: 'minimal',
		animation: 'count'
	};

	$(window).scroll(function(){
		var elem = $('.odometer');

		elem.each(function(i, el){
			if (isElementInViewport(el)) {
				$(el).html($(el).data('val'));
			}
		});
	});
});

// Object Fit Polyfill
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="bfred-it:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();

objectFitImages('.object-fit-cover');
objectFitImages('.object-fit-contain');

// SVG use polyfill
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});


svg4everybody();


// TODO: ↓↓↓ remove this script ↓↓↓
// Current menu item highlithing
$(function () {
	var location = window.location.href;
	var cur_url = location.split('/').pop();

	$('.top-nav li, .mobile-nav li, .footer-nav li').each(function () {
		var link = $(this).find('a').attr('href');

		// console.log(link);

		if (cur_url == '') {
			cur_url = 'index.html';
		}

		if (cur_url == link)
		{
			$(this).addClass('current-menu-item');
			$(this).parents('li').addClass('current-menu-parent');
		}
	});
});