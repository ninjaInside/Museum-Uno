class Slider_Init {

	constructor(sliderWindow, sliderButtons) {

		this.slider_w = sliderWindow;

		this.slider_btn = sliderButtons;

		this.slider_w_transformVal = 0;
		this.slider_slideCounter = Math.round($(this.slider_w).children('img').length / 2);;

	}

	moveSlider() {

	}

	checkBorder() {


	}

}


class Slider_Functional extends Slider_Init {

	moveSlider(typeMode) {

		switch (typeMode) {

			case 'left':
				(() => {

					if (this.checkBorder('p', this.slider_w_transformVal)) {

						return;

					}

					this.slider_w_transformVal += this.calcTransform('once', 'p');

					$(this.slider_w).css('transform', `translateX(${this.slider_w_transformVal}px)`);					

				})();
			break;

			case 'right':
				(() => {

					if (this.checkBorder('n', this.slider_w_transformVal)) {

						return;

					}

					this.slider_w_transformVal += this.calcTransform('once', 'n');

					$(this.slider_w).css('transform', `translateX(${this.slider_w_transformVal}px)`);				

				})();
			break

		}

	}

	calcTransform(typeMode, valueMode) {

		let arrayHand = [];

		let currentSlide;

		if (typeMode == 'once') {

			currentSlide = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
		
		} else if (typeMode = 'all') {

			currentSlide = $(this.slider_w).children('img')

		}


		$(currentSlide).each((index, elem) => {

			arrayHand.push(+(parseInt($(currentSlide).css('width'))));
			arrayHand.push(+(parseInt($(currentSlide).css('margin-left'))));
			arrayHand.push(+(parseInt($(currentSlide).css('margin-left'))));
			arrayHand.push(+(parseInt($(currentSlide).css('padding-left'))));
			arrayHand.push(+(parseInt($(currentSlide).css('padding-right'))));
			
		})

		if (valueMode == 'n') {
				
			return arrayHand.reduce((sum, current) => sum - current, 0);
			
		} else if (valueMode == 'p') {

			return arrayHand.reduce((sum, current) => sum + current, 0)
			
		}

	}

	checkBorder(typeMode, transform) {

		switch (typeMode) {

			case 'p': 
				if (transform >= this.calcTransform('all', 'p') / this.slider_slideCounter) {
					return true;
				}
			break;

			case 'n':
				if (transform <= this.calcTransform('all', 'n') / this.slider_slideCounter) {
					return true;
				}
			break;

		}

	}

}

class Slider_Builder extends Slider_Functional {

	buildSlider() {

		const sld = this;

		$(this.slider_btn).click(function(e) {

			if ($(e.target).attr('data-direct') == 'left_d') {

				sld.moveSlider('left');

			} else if ($(e.target).attr('data-direct') == 'right_d') {

				sld.moveSlider('right');

			}

		});

	}

}

let slider_app = new Slider_Builder('.main-window__slider-window', '.main-window__arrow-button')

slider_app.buildSlider();
