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
		var path = $('svg').find('path');
		var pathLength = path[0].getTotalLength();
		var speed = 1.5;
		var percent = 0.60;

		path.css({
			'stroke-dasharray': pathLength + ' ' + pathLength,
			'stroke-dashoffset': pathLength
		});

		if (!isIE()) {
			$('.path').velocity({
				'stroke-dashoffset': pathLength * (1 - percent)
			}, {
				duration: speed * 1000,
				progress: function () {
					var percentText = 100 - Math.round(parseFloat($(this).css('stroke-dashoffset')) / pathLength * 100);
					$('.figure p').html(percentText + '%');
				}
			});
		} else {
			var currentPathLength = pathLength;
			var requestAnimationFrameID = requestAnimationFrame(doAnim);

			function doAnim() {
				if (currentPathLength <= pathLength * (1 - percent)) {
					cancelAnimationFrame(requestAnimationFrameID);
					return;
				}

				var percentText = 100 - Math.round(parseFloat(currentPathLength) / pathLength * 100);
				$('.figure p').html(percentText + '%');

				$('.path').css({
					'stroke-dashoffset': currentPathLength
				});
				currentPathLength -= 2;
				requestAnimationFrameID = requestAnimationFrame(doAnim);
			}
		}

		function isIE(userAgent) {
			userAgent = userAgent || navigator.userAgent;
			return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
		}
	})();

});