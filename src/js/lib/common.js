/* Common JS */
$(document).ready(function () {

	//for IE9
	svg4everybody();
	//phone Mask
	initMask();
	//init validation
	initValidation();
	//init Modals
	initModals();
	//init AjaxForm
	initAjaxForm();

	//image Popup
	$('.js-image').magnificPopup({
		type: 'image',
		fixedContentPos: true,
		removalDelay: 300,
		mainClass: 'mp',
		image: {
			titleSrc: '', // Attribute of the target element that contains caption for the slide.
			verticalFit: false, // Fits image in area vertically
			tError: '<a href="%url%">Картинку</a> не удалось загрузить' // Error message
		}
	});


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
			number = $('.js-circle-number'),
			select = $('.js-circle-select'),
			option = select.children(),
			numberText = 0,
			currentNumber = 0;

		select.on('change', function () {
			var selectIndex = $(this).prop('selectedIndex') + 1;

			currentNumber = parseInt(value.text());
			numberText = number.filter(function () {
				return $(this).data('index') == selectIndex;
			}).attr('data-value');

			animateValue(currentNumber, numberText);
			changeNumber(selectIndex);
			switchSelectCircle(selectIndex)
		});

		number.on('click', function () {
			var numberIndex = $(this).data('index');

			currentNumber = parseInt(value.text());
			numberText = number.filter(function () {
				return $(this).data('index') == numberIndex;
			}).attr('data-value');
			value.text(numberText);

			option.eq(numberIndex - 1).prop('selected', true);

			animateValue(currentNumber, numberText);
			changeNumber(numberIndex);
			switchSelectCircle(numberIndex);
		});

		function animateValue(start, stop) {
			value.each(function () {
				var _this = $(this);
				$({Counter: start}).animate({Counter: stop}, {
					duration: 500,
					easing: 'swing',
					step: function () {
						if (start <= stop) {
							_this.text(Math.ceil(this.Counter));
						} else {
							_this.text(Math.floor(this.Counter));
						}
					}
				});
			});
		}

		function changeNumber(index) {
			number.each(function () {
				if ($(this).data('index') > index) {
					$(this).removeClass('is-active');
				} else {
					$(this).addClass('is-active');
				}
			});
		}

		function switchSelectCircle(value) {
			switch (value) {
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
		}
	})();

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

	// Ajax Form
	function initAjaxForm() {
		var form = $('.js-modal').find('form');

		form.submit(function (e) {
			e.preventDefault();
			var _this = $(this);
			var post_data = _this.serialize();

			// Ajax post data to server
			$.post('mail.php', post_data, function(response){
				if (response.type == 'error'){
					// your code here
				} else {
					// your code here
				}
			}, 'json');
		});
	}

	function initModals() {
		var modalBtn = $('.js-init-modal');
		modalBtn.on('click', function (e) {
			var _thisBtn = $(this);
			e.preventDefault();
			var ref = _thisBtn.data('href');
			$('body').addClass('is-locked');
			$.get('modals/' + ref + '.html', function (data) {
				$('body').append('<div class="modal js-modal">' + data + '</div>');
				if (_thisBtn.attr('data-topic')) {
					$('.modal').find('form').append('<input type="text" class="is-hidden" name="user_topic">');
				}
				$('.modal').fadeIn();
				initMask();
				initValidation();
				initModalClose();
				initAjaxForm();
			});
		});
	}

	function initModalClose() {
		var modal = $('.js-modal'),
			closeBtn = $('.js-modal-close');

		closeBtn.on('click', function (e) {
			e.preventDefault();
			$(this).closest(modal).fadeOut(function () {
				$('body').removeClass('is-locked');
				$(this).remove();
			});
		});

		modal.on('click', function (e) {
			if (!$(this).is(e.target)) {
				//code here
			} else {
				$(this).fadeOut(function () {
					$('body').removeClass('is-locked');
					$(this).remove();
				});
			}
		});
	}

	function initMask() {
		var phoneInput = $(".js-phone-mask");

		phoneInput.mask("+9(999)999-99-99");

		//SET CURSOR POSITION
		$.fn.setCursorPosition = function (pos) {
			this.each(function (index, elem) {
				if (elem.setSelectionRange) {
					elem.setSelectionRange(pos, pos);
				} else if (elem.createTextRange) {
					var range = elem.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			});
			return this;
		};

		phoneInput.on('focus', function () {
			var _this = $(this);

			setTimeout(function () {
				_this.setCursorPosition(1);
			}, 100);
		});
	}

	function initValidation() {
		$.validate({
			validateOnBlur: true,
			showHelpOnFocus: false,
			addSuggestions: false,
			scrollToTopOnError: false,
			borderColorOnError: '#FF0000'
		});
	}

});