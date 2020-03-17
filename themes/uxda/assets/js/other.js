$(document).ready(function () {
	'use strict';

	/**
	 * Window Resize
	 */
	(function() {

		var width = $(window).width();
		var $viewport = $('head meta[name="viewport"]');
		window._viewport = 'desktop';

		if(width <= 656) {
			window._viewport = 'mobile';
		}
		else if(width <= 1136) {
			window._viewport = 'tablet';
		}

		if (width <= 1136) {
			$viewport.attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
		}

		$(window).resize(function() {

			if($(window).width() === width) {
				return;
			}

			width = $(window).width();
			/*
			 $(".article-content blockquote").css("margin-left", function (value) {
			 return $(".article-social").offset().left;
			 }).css("margin-right", function (value) {
			 return $(".article-social").offset().left;
			 });
			 */
			if (width <= 1136) {
				$("nav").addClass("close");
				$(".header-social").addClass("close");

//				$("nav").toggleClass('close');
//				$(".header-social").toggleClass('close');
				$("header").addClass('mobile');
				$(".header-menu").removeClass('opened');
//				$("header").toggleClass('sticky-header');


//			$("nav").addClass("close");
//			$("header").addClass('mobile');
//			$(".header-social").addClass("close");
//			$(".video").removeClass("container");

				$(".padding-screen-fix").css("padding-left", function (value) {
					return $("h1").offset().left;
				});

				$viewport.attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
				if(width <= 656) {
					window._viewport = 'mobile';
				}
				else {
					window._viewport = 'tablet';
				}

			} else {
				$("nav").removeClass("close");
				$(".header-social").removeClass("close");

//			$("nav").removeClass("close");
//			$(".header-social").removeClass("close");
//			$(".video").addClass("container");
				$(".padding-screen-fix").css("padding-left", function (value) {
					return 0;
				});

				$viewport.attr('content', 'width=device-width, initial-scale=1.0');
				window._viewport = 'desktop';
			}

			$(document).trigger('viewport');

		});
		/*
		 $(".article-content blockquote").css("margin-left", function (value) {
		 return $(".article-social").offset().left;
		 }).css("margin-right", function (value) {
		 return $(".article-social").offset().left;
		 });
		 */

	}());

	/**
	 * LazyLoad
	 */
	setTimeout(function() {

		window.lazyLoadInstance = new LazyLoad({
			elements_selector: ".lazy",
			threshold: 900,
//			use_native: true
		});

	}());

	setTimeout(function() {

		function pureFadeIn(elem, display){
			var el = document.getElementById(elem);
			el.style.opacity = 0;
			el.style.display = display || "block";

			(function fade() {
				var val = parseFloat(el.style.opacity);
				if (!((val += .02) > 1)) {
					el.style.opacity = val;
					requestAnimationFrame(fade);
				}
			})();
		};

		function pureFadeOut(elem){
			var el = document.getElementById(elem);
			el.style.opacity = 1;

			(function fade() {
				if ((el.style.opacity -= .02) < 0) {
					el.style.display = "none";
				} else {
					requestAnimationFrame(fade);
				}
			})();
		};


		function setCookie(name, value, days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				expires = "; expires=" + date.toUTCString();
			}
			document.cookie = name + "=" + (value || "")  + expires + "; path=/";
		}

		function getCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}

		function eraseCookie(name) {
			document.cookie = name+'=; Max-Age=-99999999;';
		}

		function cookieConsent() {
			if (!getCookie('cookienotice')) {
				console.log('need');
				$("#cookie_notice").removeClass("d-none");

				pureFadeIn("cookie_notice");

				$(".cookie-btn-accept").on("click", function (event) {
					event.preventDefault();
					purecookieDismiss();
				});

			}
		}

		function purecookieDismiss() {
			setCookie('cookienotice', '1', 30);
			pureFadeOut("cookie_notice");
		}

		cookieConsent();

	}());

	/**
	 * Social share buttons
	 */
	setTimeout(function() {

			var buttons = document.querySelectorAll(".social_share");
			for(var i = 0, l = buttons.length; i < l; i++) {
				buttons[i].addEventListener('click', function(event) {
					event.preventDefault();
					return JSShare.go(this);
				}, false);
			}

	}());

	/**
	 * Contacts Form (Ajax)
	 */
	setTimeout(function() {

		$(window).on('ajaxBeforeSend', function() {
			$('#simpleContactForm .input-container').removeClass('input-error');
			$('#simpleContactForm .p-error').text('');
		});

		$(window).on('ajaxUpdateComplete', function() {
		});

		$('#simpleContactForm').on('ajaxSuccess', function(event, context, data, status, result) {

			$('#simpleContactFormModal').modal('toggle');

			document.getElementById('simpleContactForm').reset();

			if(typeof grecaptcha !== "undefined") {
				grecaptcha.reset();
			}

		});

		$('#simpleContactForm').on('ajaxError', function(event, context, data, status, result) {

			var json = result.responseJSON || {}, parent = $('#simpleContactForm');

			json.errors && $.each(json.errors, function (key, value) {
				var input = $('.input-' + key, parent);
				input.addClass('input-error');
				$('.p-error', input).text(value);
			});

		});

	}());

	/**
	 * Cost Switcher
	 */
	setTimeout(function() {

		$(".cost-switcher").change(function (event) {

			event.preventDefault();

			var parent = $(this).closest(".rates-work-costs");

			$(".cost", parent).removeClass("d-none");
			$(".switch-text", parent).removeClass("gray");

			if(this.checked) {
				$(".euro", parent).addClass("d-none");
				$(".switch-euro", parent).addClass("gray");
			}
			else {
				$(".dollar", parent).addClass("d-none");
				$(".switch-dollar", parent).addClass("gray");
			}

		});

		$(".switch-euro, .switch-dollar").on("click", function () {
			$(".cost-switcher").trigger("click");
		});

	}());

	/**
	 * Video Player (Youtube and Vimeo)
	 */
	setTimeout(function() {

		function parseVideo (url) {

			url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (RegExp.$3.indexOf('youtu') > -1) {
				var type = 'youtube';
			} else if (RegExp.$3.indexOf('vimeo') > -1) {
				var type = 'vimeo';
			}

			return {
				type: type,
				id: RegExp.$6
			};
		}

		function createVideo (url, width, height) {
			// Returns an iframe of the video with the specified URL.
			var videoObj = parseVideo(url);
			var origin = location.origin;
			var id = "v" + Math.round(new Date().getTime()/1000);
			var $iframe = $('<iframe type="text/html" allowfullscreen>'); // , { width: width, height: height }
			$iframe.attr('frameborder', 0);
			$iframe.attr('id', id);
			$iframe.attr('style', 'border: 0; background-color: transparent');
//		$iframe.attr('allowfullscreen', 'allowfullscreen');
			$iframe.attr('allow', 'accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture');
			if (videoObj.type == 'youtube') {
				$iframe.attr('src', '//www.youtube.com/embed/' + videoObj.id + '?autoplay=1&rel=0&enablejsapi=1&co_rel=0&wmode=transparent&modestbranding=1&controls=1&fs=1&origin=' + origin);
			} else if (videoObj.type == 'vimeo') {
				$iframe.attr('src', '//player.vimeo.com/video/' + videoObj.id + '?autoplay=1&rel=0&transparent=0');
			}
			return $iframe;
		}

		function getVideoThumbnail (url, cb) {
			// Obtains the video's thumbnail and passed it back to a callback function.
			var videoObj = parseVideo(url);
			if (videoObj.type == 'youtube') {
				cb('//img.youtube.com/vi/' + videoObj.id + '/maxresdefault.jpg');
			} else if (videoObj.type == 'vimeo') {
				// Requires jQuery
				$.get('https://vimeo.com/api/v2/video/' + videoObj.id + '.json', function(data) {
					cb(data[0].thumbnail_large);
				});
			}
		}

		$(document).on("click", ".video-show-in-block", function (event) {

			event.preventDefault();

			try {

				var video = $(this).data('video');

				video = createVideo(video);

				$(this).html(video);

				$("iframe", $(this)).on("load", function() {

					var id = "#" + $(this).attr('id');

					var head = $(id).contents().find("head");
					var css = '<style>.tes { } </style>';
					$(head).append(css);

				});


			} catch (e) { }

		});


		$(document).on("click", ".video-show", function (event) {

			event.preventDefault();

			try {

				var video = $(this).data('video');

				video = createVideo(video);

				$("#videoModal .video-modal").html(video);

				$("#videoModal").modal('show');


			} catch (e) { }

		});

		$(document).on('hidden.bs.modal', '#videoModal', function (e) {
			$("#videoModal .video-modal").empty();
		});

		/*
		 function vimeoLoadingThumb(id) {
		 var url = "https://vimeo.com/api/v2/video/" + id + ".json?callback=showThumb";

		 var id_img = "#vimeo-" + id;
		 var script = document.createElement( 'script' );
		 script.type = 'text/javascript';
		 script.src = url;

		 $(id_img).before(script);
		 }

		 function showThumb(data) {
		 var id_img = "#vimeo-" + data[0].id;
		 $(id_img)
		 .css('background-image', 'url(' + data[0].thumbnail_large + ')');
		 //			.css('background-size', 'cover')
		 //			.css('background-repeat', 'no-repeat')
		 //			.css('background-position', 'center');
		 }
		 */

		/*
		 $(".video").each(function (key, value) {
		 var id = $(value).attr('id');
		 if(id) {
		 id = id.split('-');
		 vimeoLoadingThumb(id[1]);
		 }

		 });
		 */


	}());

	/**
	 * Blog / Read Time Correction and Search
	 */
	setTimeout(function() {

		if(typeof Math.sign == "undefined") {
			Math.sign = function sign(x) {
				return !(x= parseFloat(x)) ? x : x > 0 ? 1 : -1;
			};
		}

		function readTime(seconds) {

			var h = Math.floor(seconds / 3600);
			var m = Math.floor(seconds % 3600 / 60);
			var s = Math.floor(seconds % 3600 % 60);

			var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
			var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
			var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : " 0 seconds";

			return ((h * 60) + m) + ' min read';
		}

		//Detect all reading-time and convert to Human readable
		$(".reading-time").each(function (index, item) {
			var seconds = $(this).data("seconds");
			$(this).text(readTime(seconds));
		});

		//View counter
		$(".view-counter").each(function (index, item) {
			var counter = $(this).data("views");
			var formatted = Math.abs(counter) > 999 ? Math.sign(counter)*((Math.abs(counter)/1000).toFixed(1)) + 'k' : Math.sign(counter)*Math.abs(counter);

			$(this).text(formatted);
		});

		$(".blog-nav-search-cross").on("click", function (event) {
			event.preventDefault();
			if($('[name="search"]').val().length) {
				$('[name="search"]').val('').trigger('keyup');
			}
		});

		if(!$('#showBlogResults').length) {
			$(".blog-nav-search").addClass("search-cross");
		}

		$('[name="search"]').on('keyup', function (event) {

			event.preventDefault();

			var $this = $(this);
			clearTimeout($.data(this, 'timer'));

			if($this.val().length) {
				$(".blog-nav-search").addClass("search-cross");
				$("#showBlogResults").addClass("d-none");
				$("#showSearchResults").empty().css({"min-height": 700}).removeClass("d-none");
			}
			else {

				if(!$('#showBlogResults').length) {
					location.href = '/blog';
					return;
				}

				$(".blog-nav-search").removeClass("search-cross");
				$("#showBlogResults").removeClass("d-none");
				$("#showSearchResults").addClass("d-none").empty();
			}

			var wait = setTimeout(function() {

				var category = $('#showBlogResults').data('category');
				var tag = $('#showBlogResults').data('tag');

				$.request('onShowSearchResults', {
					data: {
						category: category,
						tag: tag,
						search: $this.val()
					}, complete: function () {

						//Detect all reading-time and convert to Human readable
						$(".reading-time").each(function (index, item) {
							var seconds = $(this).data("seconds");
							$(this).text(readTime(seconds));
						});

						if (window.lazyLoadInstance) {
							window.lazyLoadInstance.update();
						}

					}
				});

			}, 300);

			$(this).data('timer', wait);

		});

	}());

	/**
	 * Animation / Numbers CountUp
	 */
	setTimeout(function() {

		$('.count-num').countup({
			'separator': ','
		});

	}());

	/**
	 * Achievments / Carousel
	 */
	setTimeout(function() {

		function carouselAchievments(json) {

			if(json) {

				$("#carouselAchievments .carousel-indicators").empty();
				$("#carouselAchievments .carousel-inner").empty();

				var active = 'active fadeIn animated', l = json.length;
				$.each(json, function (index, value) {

					if(l !== 1) {
						$("#carouselAchievments .carousel-indicators")
							.append('<li data-target="#carouselAchievments" data-slide-to="' + index + '" class="' + active + '"></li>');
					}

					$("#carouselAchievments .carousel-inner")
						.append('<div class="carousel-item ' + active + '"><img src="' + value.image + '" /></div>'); // /storage/app/media/

					active = '';
				});

			}

		}

		$(".achievments-item").click(function (event) {

//			event.preventDefault();

			if($(this).hasClass("active")) {
				return;
			}

			$(".achievments-item.active").removeClass("active");
			$(this).addClass("active");

			var json = $(".achievments-images", $(this)).data('json');
			carouselAchievments(json);

		});

		var json = $(".achievments-item.active .achievments-images").data('json');
		carouselAchievments(json);

	}());

	/**
	 * Success Story / Carousel
	 */
	setTimeout(function() {

		var first = true;
		var count = 0;
		var items = parseInt($(window).width() / 180);
//		var left = $(".success-stories h2").offset().left;
//		var left = $("footer .footer").offset().left;
		var left = (($(window).width() - 1136) / 2);
//		var items_fix = items - parseInt((left ) / 180);

		var animation_class = 'animated fadeInRight';

		var content = $(".success-stories .success-content");

		var $animation = $(".success-stories-animation", content);
		var $h3 = $("h3", content);
		var $quote = $(".quote", content);
		var $images = $(".success-stories-images", content);
		var $href = $(".uxda-btn-href", content);

		function successStory(story) {

			$animation.removeClass('slideInRightSuccessStoriesItemsIn');

			$animation.addClass('slideInRightSuccessStoriesItemsOut')

			$animation.one("animationend", function () {
				$animation.removeClass('slideInRightSuccessStoriesItemsOut');

				$h3.empty().text(story.data("name"));
				$quote.empty().text(story.data("desc"));
				$images.empty();
				if(story.data("image")) {
					$images.html('<img src="' + story.data("image") + '" alt="' + story.data("name") + '" height="715" />');
				}
				$images.removeClass("desktop mobile");
				$images.addClass(story.data("type"));

				$href.addClass("d-none").attr('href', '');
				if(story.data("url")) {
					$href.removeClass("d-none").attr('href', story.data("url"));
				}

				$animation.addClass('slideInRightSuccessStoriesItemsIn');
			});

/*
			var el = $(".success-stories-text", content), newone = el.clone(true);
			el.before(newone).remove();

			var el = $(".success-stories-images", content), newone = el.clone(true);
			el.before(newone).remove();
*/

		}

		var owl = $("#owlSuccess").owlCarousel({
			items: 6,
			lazyLoad: true,
			lazyLoadEager: items,
			dots: false,
			loop: true,
			center: false,
//			autoWidth: true,
			mergeFit: false,
//			animateOut: 'fadeOut',

			responsive : {
				0: {
					items: 3,
					dots: true,
					center: true,
				},
				636: {
					items: 5,
					dots: true,
					center: true,
				},
				1136: {
					items: 6,
					dots: false,
					center: false,
					stagePadding: left
				}
			},
			onChanged: function (event) {
//				console.log(event.item, event.page);
				if(event.item.count) {
					$("#owlSuccess a").removeClass("active");
					$("#owlSuccess a:eq(" + event.item.index + ")").addClass("active");
					successStory($(".success-stories .success-comp-logos a.active"));
				}
			}

		});

		$(document).on("click", "#owlSuccess a", function (event) {
			event.preventDefault();
			var index = $(this).data("index");
			owl.trigger('to.owl.carousel', [index]);
		});

		$(".success-stories-controls a").click(function (event) {

			event.preventDefault();

			var action = 'next', story;

			if ($(this).data('slide')) {
				action = $(this).data('slide');
			}

			if(action === 'next') {
				owl.trigger('next.owl.carousel', [1400]);
			} else {
				owl.trigger('prev.owl.carousel', [1400]);
			}

		});

	}());

	/**
	 *  Our Values / Tabs
	 */
	setTimeout(function() {

		var owl = $("#ourValuesTabContent").owlCarousel({
			items: 1,
			dots: false,
			animateOut: 'slideInRightValuesItemsOut',
			animateIn: 'slideInRightValuesItemsIn',
			responsive : {
				0: {
					dots: true,
					mouseDrag: true
				},
				636: {
					dots: false,
					mouseDrag: false
				},
				1136: {
					dots: false,
					mouseDrag: false
				}
			}
		});

		$("#ourValuesTab a").on("click", function (event) {

			var index = $(this).data("index");

			owl.trigger('to.owl.carousel', [index]);

		});


	}());

	/**
	 * Void Event for Click
	 */
	setTimeout(function() {

		$(document).on("click", ".void", function (event) {
			event.preventDefault();
		});

	}());

	/**
	 * Blog / Popover
	 */
	setTimeout(function() {

		$(function () {

			$(document).on('click', '.popover-team, .team-member-card-popup', function (event) {

				if(window._viewport !== 'mobile') {
					return;
				}

				var $this = $(this);

				var $popover = $("#authorModal");
				var author = $this.data("team");
				
				if(!author.length) {
                    event.preventDefault();
                }

				$('.pop-name', $popover).text(author.name);
				$('.pop-position', $popover).text(author.position);
				$('.pop-description', $popover).text(author.description);
				$('.avatar', $popover).attr('src', $this.data("image"));

				$(".social a", $popover).addClass('d-none');

				if(author.twitter) {
					$('.pop-twitter', $popover).attr('href', author.twitter).removeClass('d-none');
				}
				if(author.pinterest) {
					$('.pop-pinterest', $popover).attr('href', author.pinterest).removeClass('d-none');
				}
				if(author.linkedin) {
					$('.pop-linkedin', $popover).attr('href', author.linkedin).removeClass('d-none');
				}
				if(author.dribbble) {
					$('.pop-dribbble', $popover).attr('href', author.dribbble).removeClass('d-none');
				}
				if(author.behance) {
					$('.pop-behance', $popover).attr('href', author.behance).removeClass('d-none');
				}

				$('#authorModal').modal('toggle');

			});

			$(document).on('mouseenter', '.popover-team', function (event) {

				event.preventDefault();

				if(window._viewport === 'mobile') {
					return;
				}

				var $this = $(this);

				if(!$this.hasClass("popover-init")) {

					var $popover = $("#popover-team").clone();
					var author = $this.data("team");

					$this.addClass("popover-init");
					$('.pop-name', $popover).text(author.name);
					$('.pop-position', $popover).text(author.position);
					$('.pop-description', $popover).text(author.description);
					$('.avatar', $popover).attr('src', $this.data("image"));

					if(author.twitter) {
						$('.pop-twitter', $popover).attr('href', author.twitter).removeClass('d-none');
					}
					if(author.pinterest) {
						$('.pop-pinterest', $popover).attr('href', author.pinterest).removeClass('d-none');
					}
					if(author.linkedin) {
						$('.pop-linkedin', $popover).attr('href', author.linkedin).removeClass('d-none');
					}
					if(author.dribbble) {
						$('.pop-dribbble', $popover).attr('href', author.dribbble).removeClass('d-none');
					}
					if(author.behance) {
						$('.pop-behance', $popover).attr('href', author.behance).removeClass('d-none');
					}

					$this.popover({
						container: 'body',
						placement: 'top',
						animation: true,
						trigger: 'manual',
						sanitize: false,
						html: true,
						title: 'popover',
						template: $popover.html()
					}).on('hidden.bs.popover', function () {
						$this.removeClass("active");
					}).on('focusin.bs.popover', function (event) {
					}).on('focusout.bs.popover', function (event) {
					}).on('shown.bs.popover', function (event) {

						if (window.lazyLoadInstance) {
							window.lazyLoadInstance.update();
						}

						var popover_id = $this.attr('aria-describedby');

						$("#" + popover_id).on('mouseenter', function() {
							$this.addClass('hover');
						});

						$("#" + popover_id).on('mouseleave', function() {
							$this.removeClass('hover');
							$(".popover-team").trigger("mouseleave");
						});


					});


				}

				$this.addClass("active");
				$this.popover('show');

			});

			$(document).on('mouseleave', '.popover-team', function (event) {

				var $this = $(this);

				setTimeout(function () {

					if(!$this.hasClass('hover')) {
						$this.popover('hide');
					}

				}, 100);

			});

		});

	}());

	/**
	 * Achievements / Show All
	 */
	setTimeout(function() {

		$(document).on("click", ".show-all-achievements", function () {

			event.preventDefault();

			$(this).addClass("d-none");
			$(".achievments-item").removeClass("d-none");

		});

	}());

	/**
	 * Map / Flags
	 */
	setTimeout(function() {

		var count = 0;

		var swiper = new Swiper('.swiper-flags', {
			// Default parameters
			slidesPerView: 6,
//			setWrapperSize: true,
//			spaceBetween: 10,
//			slideClass: 'col-flags',
//			centeredSlides: true,
			centeredSlidesBounds: true,
			centerInsufficientSlides: true,
			slidesPerGroup: 1,
			pagination: {
				el: '.swiper-pagination',
			},
			// Responsive breakpoints
			breakpoints: {
				// when window width is >= 320px
				0: {
					slidesPerView: 2,
					slidesPerGroup: 2
				},
				// when window width is >= 640px
				636: {
					slidesPerView: 3,
					slidesPerGroup: 3
				},
				// when window width is >= 640px
				1136: {
					slidesPerView: 6,
					slidesPerGroup: 1,
//					spaceBetween: 40,
					allowTouchMove: false
				}
			}
		})


	}(), 100);


	/**
	 * Blog / Old Articles Fix
	 */
	setTimeout(function() {

		$(".fr-fic.fr-dii").closest("p").css({
			'padding': 0
		});

		$(".img-medium").parent(".img-wrapper").css({"background-color": "#fafafa", "position": "relative"})

		/*
		 $(".imgCaption").css({
		 'width': 'auto',
		 'text-align': 'center'
		 });
		 */

	}());

	setTimeout(function() {

		$(".carousel-indicators").each(function () {
			if($("li", $(this)).length === 1) {
				$(this).addClass("d-none");
			}

		});

	}());

	setTimeout(function() {

		if ($(window).width() > 1136) {
			/*
			$(".scrollbars").ClassyScroll({
				scroll: 'horizontal',
				blockGlobalScroll: false
			});
			*/
			$(".scrollbars1").ClassyScroll();
        }
	}());

	setTimeout(function() {
		
		function preloadImage(elements) {

			$.each(elements, function (index, element) {
				var image = $(element).data("image");
				if(image.length) {
					(new Image()).src = image;
				}
			});

		}

		$(".animation").waypoint(function () {
			$(this.element).addClass($(this.element).data("animation"));
//			$(this.element).on("animationend", function() {
//				$(this).removeClass('animated');
//			});

			this.destroy();

		}, {
			offset: '100%'
		});

		$(".success-comp-logos").waypoint(function () {
			preloadImage($("a", this.element));
			this.destroy();
		}, {
			offset: '100%'
		});

		$(".animation-end").on("animationend", function () {
			var animationend = $(this).data("animationend");
			var animationstart = $(this).data("animationstart");
			$(animationstart).addClass(animationend);
		});

	}());

	setTimeout(function() {
		$(".carousel").on("slide.bs.carousel", function(ev) {
			var lazy = $(ev.relatedTarget).find("img[data-src]");
			lazy.attr("src", lazy.data('src'));
			lazy.removeAttr("data-src");
		});
	});

	setTimeout(function(){

		var swiper = null;

		$(".team-love img").on("load", function () {
			if(swiper) {
				swiper.update();
			}
		});

		swiper = new Swiper('.swiper-container', {
			// freeMode: true,
			// mousewheel: true,
			// slidesPerView: 'auto',
			// spaceBetween: 30,
			// centeredSlides: true,
			scrollbar: {
				el: '.swiper-scrollbar',
				hide: false,
				draggable: true,
				dragSize: 160,
			},
			slidesPerView: 'auto',
			spaceBetween: 30,
			freeMode: true,
			mousewheel: {
				forceToAxis: true,
				invert: true,
			},
			breakpoints: {
				640: {
					spaceBetween: 30
				},
				320: {
					spaceBetween: 0
				}
			}
		});

		$(".team-love img").each(function(idx, img) {
			$(this).attr('src', $(this).attr('src'));
		});


	});

});