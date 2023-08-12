import React from "react";

class MenuButton extends React.Component {
	render() {
		return (
			<svg
				id="arrow-left"
				onMouseDown={this.props.handleMouseDown}
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width={35}
				height={50}
				viewBox="0 0 172 172"
				style={{ fill: "#000000" }}
			>
				<g
					fill="none"
					fillRule="nonzero"
					stroke="none"
					strokeWidth={1}
					strokeLinecap="butt"
					strokeLinejoin="miter"
					strokeMiterlimit={10}
					strokeDasharray="true"
					strokeDashoffset={0}
					fontFamily="none"
					fontWeight="none"
					fontSize="none"
					textAnchor="none"
					style={{ mixBlendMode: "normal" }}
				>
					<g fill="#ffffff">
						<path d="M41.13219,48.11969c-0.88687,0.05375 -1.72,0.44344 -2.32469,1.10188l-35.31375,36.77844l35.31375,36.77844c0.84656,0.90031 2.10969,1.27656 3.30563,0.98094c1.19594,-0.29563 2.15,-1.20938 2.48594,-2.39188c0.34937,-1.19594 0.02687,-2.4725 -0.84656,-3.34594l-27.42594,-28.58156h148.79344c1.23625,0.01344 2.39188,-0.63156 3.02344,-1.70656c0.61813,-1.075 0.61813,-2.39187 0,-3.46687c-0.63156,-1.075 -1.78719,-1.72 -3.02344,-1.70656h-148.79344l27.42594,-28.58156c1.00781,-1.00781 1.29,-2.52625 0.69875,-3.81625c-0.57781,-1.30344 -1.89469,-2.10969 -3.31906,-2.0425z" />
					</g>
				</g>
			</svg>
		);
	}
}

export default MenuButton;
