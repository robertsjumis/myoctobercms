(function ($) {
	'use strict';
	$.fn.countup = function (options) {
		// make sure dependency is present
		if (typeof CountUp !== 'function') {
			console.error('countUp.js is a required dependency of countUp-jquery.js.');
			return;
		}

		var defaults = $.extend({
			endVal: 0,
			startVal: 0,
			decimals: 0,
			duration: 2,
		}, options);

		this.each(function (i, elem) {

			var $this = $(this);
			var endVal = $this.text();

			var num = endVal.replace(/,/g, '');
			var isInt = /^[0-9]+$/.test(num);
			var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
			defaults.decimals = isFloat ? (num.split('.')[1] || []).length : 0;

			var countUp = new CountUp(elem, defaults.startVal, num, defaults.decimals, defaults.duration, defaults);

			$this.waypoint(function () {
				countUp.start();
			}, { offset: '100%', triggerOnce: true });

		});

		return this;
	};

}(jQuery));