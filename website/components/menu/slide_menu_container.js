import MenuButton from "./slide_menu_button";
import Menu from "./slide_menu";
import React from "react";

// Following tutorial for slide menu: https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm
class MenuContainer extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			visible: false,
		};

		this.toggleMenu = this.toggleMenu.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
	}

	handleMouseDown(e) {
		this.toggleMenu();
		e.stopPropagation();
	}

	toggleMenu() {
		this.setState({
			visible: !this.state.visible,
		});
	}

	render() {
		return (
			<>
				<MenuButton handleMouseDown={this.handleMouseDown} />
				<Menu
					handleMouseDown={this.handleMouseDown}
					menuVisibility={this.state.visible}
				/>
			</>
		);
	}
}

export default MenuContainer;
