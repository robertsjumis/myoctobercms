function BenefitInit() {

	var animation = bodymovin.loadAnimation({
		container: document.getElementById('bm'),
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: '/themes/uxda/assets/animation/product_user_business_success.json',

	});

	animation.addEventListener('complete', function () {

		if(_viewport === 'desktop') {
			return;
		}

		$("#bm").css({
			'transition': '0.3s',
			'transform': 'scale(1.4)'
		});
		
	});

	$("#bm").waypoint(function () {
		animation.play();
	}, { offset: '100%', triggerOnce: true });

}


function roadMapInit() {
	var useEventType = (typeof window.PointerEvent === 'function') ? 'pointer' : 'mouse';
	var listeners = ['click'];
	var all_points = document.getElementsByClassName('roadmap-dot-click');

	var pointerHandler = function(event) {
		event.preventDefault();
		pointClick(event.srcElement.getAttribute("position"))
	}

	for (var i = 0; i < all_points.length; i++) {
		listeners.map((etype) => {
			all_points[i].addEventListener(etype, pointerHandler);
		});
	}

	function pointClick(position) {
		var show_point = document.getElementById('active-point'+position);
		var hide_line = document.getElementById('roadmap-dot-line'+position);
		var hide_outer_circle = document.getElementById('roadmap-outer-dot'+position);
		var hide_inner_circle = document.getElementById('roadmap-inner-dot'+position);
		var hide_text = document.getElementById('point-text'+position);
		var show_desc_line = document.getElementById('roadmap-desc-line'+position);
		var active_point = document.getElementsByClassName('roadmap-active-point');

		var show_desc_header = document.getElementById('point-desc-header'+position);
		var show_desc_text = document.getElementById('point-desc-text'+position);
		var show_desc_points = document.getElementById('point-desc-points'+position);

		// hide active points animation
		for (var i = 0; i < active_point.length; i++) {
			var active_point_position = active_point[i].getAttribute("position"); // position of currently active point
			active_point[i].classList.add("roadmap-active-point-hide"); // hiding state animation
			active_point[i].classList.remove("roadmap-active-point"); // remove active class

			var show_line = document.getElementById('roadmap-dot-line'+active_point_position); // line to show instead of active point
			show_line.classList.remove("roadmap-dot-line-hidden"); // class set to hidden for the ininital state of first point
			show_line.classList.remove("roadmap-dot-line-hide");
			show_line.classList.add("roadmap-dot-line");

			// circles to show instead of active point
			var show_outer_circle = document.getElementById('roadmap-outer-dot'+active_point_position);
			show_outer_circle.classList.remove("roadmap-dot-hidden");
			show_outer_circle.classList.remove("roadmap-dot-hide");
			show_outer_circle.classList.add("roadmap-dot-show");


			var show_inner_circle = document.getElementById('roadmap-inner-dot'+active_point_position);
			show_inner_circle.classList.remove("roadmap-dot-hidden");
			show_inner_circle.classList.remove("roadmap-dot-hide");
			show_inner_circle.classList.add("roadmap-dot-show");

			var show_text = document.getElementById('point-text'+active_point_position);
			show_text.classList.remove("point-text-hidden");
			show_text.classList.remove("point-text-hide");
			show_text.classList.add("point-text-show");

			var hide_desc_line = document.getElementById('roadmap-desc-line'+active_point_position);
			hide_desc_line.classList.remove("roadmap-desc-line");
			hide_desc_line.classList.add("roadmap-desc-line-hide");


			var hide_desc_header = document.getElementById('point-desc-header'+active_point_position);
			hide_desc_header.classList.add("point-desc-header-hide");
			hide_desc_header.classList.remove("point-desc-header-show");

			var hide_desc_text = document.getElementById('point-desc-text'+active_point_position);
			hide_desc_text.classList.add("point-desc-text-hide");
			hide_desc_text.classList.remove("point-desc-text-show");

			var hide_desc_points = document.getElementById('point-desc-points'+active_point_position);
			hide_desc_points.classList.add("point-desc-points-hide");
			hide_desc_points.classList.remove("point-desc-points-show");

		}


		// show new active point animation
		show_point.classList.remove("roadmap-active-point-hidden");
		show_point.classList.remove("roadmap-active-point-hide");
		show_point.classList.add("roadmap-active-point");

		hide_line.classList.remove("roadmap-dot-line");
		hide_line.classList.add("roadmap-dot-line-hide");


		hide_outer_circle.classList.remove("roadmap-dot-show");
		hide_outer_circle.classList.add("roadmap-dot-hide");

		hide_inner_circle.classList.remove("roadmap-dot-show");
		hide_inner_circle.classList.add("roadmap-dot-hide");

		hide_text.classList.remove("point-text-show");
		hide_text.classList.add("point-text-hide");

		show_desc_line.classList.remove("roadmap-desc-line-hidden");
		show_desc_line.classList.remove("roadmap-desc-line-hide");
		show_desc_line.classList.add("roadmap-desc-line");


		show_desc_header.classList.remove("point-desc-header-hidden");
		show_desc_header.classList.remove("point-desc-header-hide");
		show_desc_header.classList.add("point-desc-header-show");

		show_desc_text.classList.remove("point-desc-text-hidden");
		show_desc_text.classList.remove("point-desc-text-hide");
		show_desc_text.classList.add("point-desc-text-show");

		show_desc_points.classList.remove("point-desc-points-hidden");
		show_desc_points.classList.remove("point-desc-points-hide");
		show_desc_points.classList.add("point-desc-points-show");

	}
}

BenefitInit();
roadMapInit();


