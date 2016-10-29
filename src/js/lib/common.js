/* Common JS */
$(document).ready(function () {

	//for IE9
	svg4everybody();

	// Clear placeholder
	(function () {
		var el = $('input, textarea');
		el.focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'));
			$(this).attr('placeholder', '');
		});
		el.blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	}());

	(function () {
		var tabs = $('.js-tabs');
		if (tabs.length) {
			var tabsItem = $('.js-tabs-content').children(),
				tabsButton = $('.js-tabs-nav').children(),
				currentHeight = 0;

			currentHeight = tabsItem.outerHeight();
			tabsItem.next().hide();
			tabs.css({height: currentHeight});

			tabsButton.on('click', function () {
				var index = $(this).index(),
					tabsHeight = 0;
				tabsButton.removeClass('is-active');
				$(this).addClass('is-active');
				tabsItem.fadeOut().promise().done(function () {
					tabsHeight = tabsItem.eq(index).outerHeight();
					tabs.css({height: tabsHeight});
					tabsItem.eq(index).fadeIn();
				});
			});
		}
	})();

	(function () {
		var slider = $('.js-slider');

		slider.each(function () {
			if ($(this).index() > 0) {
				$(this).on('init', function () {
					$(this).hide();
				});
			}
		});

		slider.slick({
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			prevArrow: '<button type="button" class="slick-prev"><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-left"></use></svg></button>',
			nextArrow: '<button type="button" class="slick-next"><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-right"></use></svg></button>'
		});
	})();

	(function () {
		var tabsItem = $('.js-slider-tab'),
			tabsButton = $('.js-slider-nav').children();

		tabsButton.on('click', function () {
			var index = $(this).index();

			tabsButton.removeClass('is-active');
			$(this).addClass('is-active');

			tabsItem.fadeOut().promise().done(function () {
				tabsItem.eq(index).fadeIn();
				tabsItem.eq(index).slick('setPosition');
			});
		});
	})();

	(function () {
		var circle = $('.js-circle'),
			value = $('.js-circle-value'),
			number = $('.js-circle-number');

		number.on('click', function () {
			var numberIndex = $(this).data('index');

			number.each(function () {
				if ($(this).data('index') > numberIndex) {
					$(this).removeClass('is-active');
				} else {
					$(this).addClass('is-active');
				}
			});

			switch (numberIndex) {
				case 1:
					circle.animate({'stroke-dashoffset': '550'}, 500);
					break;
				case 2:
					circle.animate({'stroke-dashoffset': '405'}, 500);
					break;
				case 3:
					circle.animate({'stroke-dashoffset': '310'}, 500);
					break;
				case 4:
					circle.animate({'stroke-dashoffset': '220'}, 500);
					break;
				case 5:
					circle.animate({'stroke-dashoffset': '80'}, 500);
					break;
				default:
					circle.animate({'stroke-dashoffset': '550'}, 500);
			}
		});

	})();

});