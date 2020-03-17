(function() {
	'use strict';

	$(document).ready(function () {
		
		$(".header-menu").click(function () {
			$("nav").toggleClass('close');
			$(".header-social").toggleClass('close');
			$("header").toggleClass('mobile');
			$(".header-menu").toggleClass('opened');
			$("header").toggleClass('sticky-header');
			if (!$('nav').hasClass('close')) {
				header.classList.remove("sticky-header");
			}
		});

		if ($(window).width() > 1136) {
			$("nav").removeClass("close");
			$(".header-social").removeClass("close");
			$(".video").addClass("container");
		} else {
			$(".video").removeClass("container");

			setTimeout(function () {
				$(".padding-screen-fix").css("padding-left", function (value) {
					return $("h1").offset().left;
				});
			}, 100);

		}

		var header = document.getElementsByTagName("header")[0];
		var sticky = header.offsetTop;

		var is_sticky = $("#sticky").length;
		var sticky_offset = 100;
		var sticky_height, sticky_skips = [], is_sticky_show = null;

		var sticky_between = function (l, h, n) {
			if(n > l && n < h) {
				return true;
			}
			return false;
		};
		var sticky_fill = function () {
			sticky_skips = [];
			$(".img-wrapper img:not(.img-small), iframe").each(function () {
				var ht = parseInt($(this).offset().top - sticky_height - sticky_offset);
				var hb = parseInt($(this).offset().top + $(this).height() + sticky_offset);
				sticky_skips.push([ht, hb]);
			});
		};
		var sticky_check = function () {
			var result = false;
			var offest = $('#sticky').offset().top;

			for(var i = 0, l = sticky_skips.length; i < l; i++) {
				result = sticky_between(sticky_skips[i][0], sticky_skips[i][1], offest);
				if(result) {
					break;
				}
			}

			return result;

		};
		var sticky_show = function () {

			var show = !sticky_check();

			if(show !== is_sticky_show) {

				is_sticky_show = show;
//				console.log(is_sticky_show);

				if(is_sticky_show) {
					$("#sticky").removeClass('opacity');
				}
				else {
					$("#sticky").addClass('opacity'); // .removeClass('fadeOut')
				}

			}

		};

		if(is_sticky) {

			$("#sticky").sticky({
				topSpacing: 140,
				bottomSpacing: 2600
			});

			sticky_height = $('#sticky').height();

			sticky_fill();
			sticky_show();

			setTimeout(function () {
				sticky_fill();
			}, 3000);

		}

		window.onscroll = function () {

			if(is_sticky) {
//				console.log($('#sticky').offset().top, window.pageYOffset, sticky);
				sticky_show();
			}

			if (window.pageYOffset > sticky && !$(".header-menu").hasClass('opened')) {
				header.classList.add("sticky-header");
			} else {
				header.classList.remove("sticky-header");
			}
		};

		if (window.pageYOffset > sticky) {
			header.classList.add("sticky-header");
		}

	});

}());
