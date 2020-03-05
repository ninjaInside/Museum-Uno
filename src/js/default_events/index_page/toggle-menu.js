class Menu_Init {

	constructor(menuWindow, menuButton, toggleClass) {

		this.menu_w = menuWindow;
		this.class_t = toggleClass;

		this.menu_btn = menuButton; 

	}

	toggleMenu() {}

}

class Menu_Functional extends Menu_Init {

	toggleMenu() {

		$(this.menu_w).toggleClass(this.class_t);

	}

}

class Menu_Builder extends Menu_Functional {

	buildToggleMenu() {

		const mnu = this;

		$(this.menu_btn).click(function(e) {

			mnu.toggleMenu();

		})

	}

}

let menu_app = new Menu_Builder('.main-window__header_mobile-panel', '.main-window__toggle-menu-button', 'main-window_header_mobile-panel-h');

menu_app.buildToggleMenu();