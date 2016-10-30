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

	var wow = new WOW(
		{
			mobile: false       // trigger animations on mobile devices (true is default)
		}
	);
	wow.init();

	if ($(window).width() < 1024) {
		$(document).find('.wow').removeClass('wow');
	}

	//scroll to section
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		var el = $(this).attr('href');
		$('html, body').animate({scrollTop: $(el).offset().top}, 2000);
		return false;
	});

	// change active faq by click link
	if ($('.js-scroll-base').length) {
		$('.js-scroll-base').on('click', function () {
			$('.faq__list-nav').removeClass('is-active').eq(1).addClass('is-active');
			$('.faq__content-item').filter('.is-active').fadeOut().promise().done(function () {
				$('.faq__content-item').eq(1).fadeIn().addClass('is-active');
			});
			setTimeout(function () {
				$('.faq__content-item').eq(1).find('a').addClass('animated').addClass('shake');
			}, 2200);
		});
	}

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
			nextArrow: '<button type="button" class="slick-next"><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-right"></use></svg></button>',
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}
			]
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
			percentInp = $('.js-form-percent'),
			numberText = 0,
			currentNumber = 0;

		select.on('change', function () {
			var selectIndex = $(this).prop('selectedIndex') + 1;

			currentNumber = parseInt(value.text());
			numberText = number.filter(function () {
				return $(this).data('index') == selectIndex;
			}).attr('data-value');
			percentInp.val(numberText);

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
			percentInp.val(numberText);

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
		var form = $('body').find('form');
		form.unbind();
		initValidation();

		form.submit(function (e) {
			e.preventDefault();
			var _this = $(this);
			var post_data = _this.serialize();
			var url = 0;

			if (_this.find('button[type=submit]').data('mail') == 'call') {
				url = _this.find('button[type=submit]').data('mail') + '.php';
				// Ajax post data to server
				$.post(url, post_data, function (response) {
					if (response.type == 'error') {
						// your code here
					} else {
						$('.js-modal').fadeOut(function () {
							$(this).remove();
						});
						$('body').removeClass('is-locked');
					}
				}, 'json');
			} else if (_this.find('button[type=submit]').data('mail') == 'certificate') {
				url = _this.find('button[type=submit]').data('mail') + '.php';
				// Ajax post data to server
				$.post(url, post_data, function (response) {
					if (response.type == 'error') {
						// your code here
					} else {
						$('.js-modal').children().fadeOut(function () {
							$(this).remove();
							$.get('modals/modal_notify.html', function (data) {
								$('.js-modal').append(data);
								$('.js-modal').children().hide().fadeIn();
								initModalClose();
							});
						});
					}
				}, 'json');
			} else if (_this.find('button[type=submit]').data('mail') == 'calculate') {
				url = _this.find('button[type=submit]').data('mail') + '.php';
				// Ajax post data to server
				$.post(url, post_data, function (response) {
					if (response.type == 'error') {
						// your code here
					} else {
						$('.js-modal').children().fadeOut(function () {
							$(this).remove();
							$.get('modals/modal_ty.html', function (data) {
								$('.js-modal').append(data);
								$('.js-modal').children().hide().fadeIn();
								initModalClose();
							});
						});
					}
				}, 'json');
			} else if (_this.find('button[type=submit]').data('mail') == 'code') {
				url = _this.find('button[type=submit]').data('mail') + '.php';
				// Ajax post data to server
				$.post(url, post_data, function (response) {
					if (response.type == 'error') {
						// your code here
					} else {
						$.get('modals/modal_ty.html', function (data) {
							$('body').append('<div class="modal js-modal">' + data + '</div>');
							$('.js-modal').fadeIn();
							setTimeout(function () {
								_this.trigger('reset');
							}, 3000);
							initModalClose();
						});
					}
				}, 'json');
			} else if (_this.find('button[type=submit]').data('mail') == 'question') {
				url = _this.find('button[type=submit]').data('mail') + '.php';
				// Ajax post data to server
				$.post(url, post_data, function (response) {
					if (response.type == 'error') {
						// your code here
					} else {
						$.get('modals/modal_notify.html', function (data) {
							$('body').append('<div class="modal js-modal">' + data + '</div>');
							$('.js-modal').fadeIn();
							setTimeout(function () {
								_this.trigger('reset');
							}, 3000);
							initModalClose();
						});
					}
				}, 'json');
			} else if (_this.find('button[type=submit]').data('mail') == 'manager_1') {
				url = _this.find('button[type=submit]').data('mail') + '.php';
				// Ajax post data to server
				$.post(url, post_data, function (response) {
					if (response.type == 'error') {
						// your code here
					} else {
						$('.js-modal').fadeOut(function () {
							$(this).remove();
						});
						$('body').removeClass('is-locked');
					}
				}, 'json');
			} else if (_this.find('button[type=submit]').data('mail') == 'manager_2') {
				url = _this.find('button[type=submit]').data('mail') + '.php';
				// Ajax post data to server
				$.post(url, post_data, function (response) {
					if (response.type == 'error') {
						// your code here
					} else {
						$('.js-modal').fadeOut(function () {
							$(this).remove();
						});
						$('body').removeClass('is-locked');
					}
				}, 'json');
			} else if (_this.find('button[type=submit]').data('mail') == 'percent') {
				url = _this.find('button[type=submit]').data('mail') + '.php';
				// Ajax post data to server
				$.post(url, post_data, function (response) {
					if (response.type == 'error') {
						// your code here
					} else {
						$.get('modals/modal_notify.html', function (data) {
							$('body').append('<div class="modal js-modal">' + data + '</div>');
							$('.js-modal').fadeIn();
							setTimeout(function () {
								_this.trigger('reset');
							}, 3000);
							initModalClose();
						});
					}
				}, 'json');
			}
		});
	}

	function initModalClose() {
		var modal = $('.js-modal'),
			closeBtn = $('.js-modal-close');

		closeBtn.on('click', function () {
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
					var userTopic = _thisBtn.data('topic');
					$('.modal').find('form').append('<input type="text" class="is-hidden" name="user_topic" value="' + userTopic + '">');
				}
				if (_thisBtn.attr('data-price')) {
					var userPrice = _thisBtn.parent().find('.js-price').text();
					$('.modal').find('form').append('<input type="text" class="is-hidden" name="user_price" value="' + userPrice + '">');
				}
				$('.modal').fadeIn();
				initMask();
				initValidation();
				initModalClose();
				initAjaxForm();
			});
		});
	}

});