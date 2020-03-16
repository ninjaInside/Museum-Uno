class PopUp_Init {

	constructor(images) {

		this.img = images;

		this.src = [];

		this.popUp_templates = null;
		this.targetSrc = null;

		for (let element of document.querySelectorAll(this.img)) {

			this.src.push($(element).attr('src'));

		};

	}

}

class PopUp_Functional extends PopUp_Init {

	_createPopUp(src) {

		this.popUp_templates = `

			<div class="popUp-window">
				<div class="popUp-window__content">
					<button class="popUp-window__btn" data-direct="left">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 240.811 240.811" xml:space="preserve" style="fill: #000" width="24px" data-direct="left">
							<g>
							<path data-direct="left" id="Expand_More" d="M220.088,57.667l-99.671,99.695L20.746,57.655c-4.752-4.752-12.439-4.752-17.191,0
		c-4.74,4.752-4.74,12.451,0,17.203l108.261,108.297l0,0l0,0c4.74,4.752,12.439,4.752,17.179,0L237.256,74.859
		c4.74-4.752,4.74-12.463,0-17.215C232.528,52.915,224.828,52.915,220.088,57.667z"/>
							</g>
						</svg>
					</button>
					<img src="${src}" alt="" class="popUp-window__image">
					<button class="popUp-window__btn" data-direct="right">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 240.811 240.811" xml:space="preserve" style="fill: #000" width="24px" data-direct="right">
							<g>
							<path data-direct="right" id="Expand_More" d="M220.088,57.667l-99.671,99.695L20.746,57.655c-4.752-4.752-12.439-4.752-17.191,0
		c-4.74,4.752-4.74,12.451,0,17.203l108.261,108.297l0,0l0,0c4.74,4.752,12.439,4.752,17.179,0L237.256,74.859
		c4.74-4.752,4.74-12.463,0-17.215C232.528,52.915,224.828,52.915,220.088,57.667z"/>
							</g>
						</svg>						
					</button>
				</div>
			</div>

		`;

		this.targetSrc = src; 

		document.body.insertAdjacentHTML('beforeend', this.popUp_templates);

		this.bindSlideButton();

	}

	_slidePopUp(type) {

		const _ = this;

		switch (type) {

			case 'left':
				void function() {

					let currentIndex = _.src.indexOf(_.targetSrc)
						currentIndex = --currentIndex;

					if (currentIndex < 0) {

						currentIndex = _.src.length - 1 

					} 

					$('.popUp-window__image').attr('src', `${_.src[currentIndex]}`);

					_.targetSrc = _.src[currentIndex];

				}()
			break;

			case 'right':
				void function() {

					let currentIndex = _.src.indexOf(_.targetSrc)
						currentIndex = ++currentIndex

					if (currentIndex > _.src.length - 1) {

						currentIndex = 0;

					} 

					$('.popUp-window__image').attr('src', `${_.src[currentIndex]}`);

					_.targetSrc = _.src[currentIndex];

				}()
			break;

		}

	}

}

class PopUp_Build extends PopUp_Functional {

	build() {

		const _ = this;

		$(this.img).click(function(e) {

			_._createPopUp($(e.target).attr('src'));

		})

	}

	bindSlideButton() {

		const _ = this;

		$('.popUp-window__btn').click(function(e) {

			if ($(e.target).attr('data-direct') == 'left') {

				return _._slidePopUp('left');

			} 

			_._slidePopUp('right')

		});

		$('.popUp-window').click(function(e) {

			if (e.target.nodeName != 'DIV') return;

			if (e.which != 1) return;

			$('.popUp-window').remove();

		})


	}

}

void function() {

	if (window.innerWidth > 1000) {

		let popup = new PopUp_Build('.main-window__gallary > div > img');

		popup.build();

	}; 

}();