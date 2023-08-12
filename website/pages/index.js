import dynamic from "next/dynamic";
import Link from "next/link";
import { ITEMS } from "components/jsons/nav_footer_items.json";
import { TABLE } from "components/jsons/homepage_table.json";
import React from "react";

const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

const SocialMediaLayout = dynamic(() =>
	import("components/menu/social_media_only")
);

const MenuContainer = dynamic(() =>
	import("components/menu/slide_menu_container")
);

const Layout = dynamic(() => import("components/layout"));

/**
 * Create a JSX element if the "id" property in "svgs" matches parameter "id".
 *
 * @param svgs  Array of objects containing "id" and "svg" properties.
 * @param id    String that's being tested against.
 * @return      Embedded SVG in JSX element.
 */
function showSvg(svgs, id) {
	for (let i = 0; i < svgs.length; i++) {
		if (svgs[i]["id"] == id) {
			return (
				<>
					{React.createElement(
						svgs[i]["svg"].type,
						svgs[i]["svg"].props
					)}
				</>
			);
		}
	}
}

/**
 * Display homepage.
 *
 * @return JSX element.
 */
export default function Home() {
	// Take out home and login names for use later down the file
	const items = ITEMS.filter((item) => item.item !== "Home");

	// Store embedded SVGs into variables
	const software_dev_svg = (
		<svg
			id="software-dev-svg"
			className="card-img-top padtop20"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width={100}
			height={100}
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
				<path d="M0,172v-172h172v172z" fill="none" />
				<g fill="#000000">
					<path d="M10.32,10.32c-5.65719,0 -10.32,4.66281 -10.32,10.32v141.04h172v-141.04c0,-5.65719 -4.66281,-10.32 -10.32,-10.32zM10.32,17.2h151.36c1.94844,0 3.44,1.49156 3.44,3.44v10.32h-158.24v-10.32c0,-1.94844 1.49156,-3.44 3.44,-3.44zM6.88,37.84h158.24v116.96h-158.24zM99.4375,51.4925c-0.14781,0.02688 -0.29562,0.06719 -0.43,0.1075c-1.12875,0.25531 -2.06937,1.06156 -2.4725,2.15l-30.96,75.68c-0.71219,1.78719 0.14781,3.80281 1.935,4.515c1.78719,0.71219 3.80281,-0.14781 4.515,-1.935l30.96,-75.68c0.51063,-1.12875 0.37625,-2.45906 -0.36281,-3.45344c-0.72562,-1.00781 -1.94844,-1.53188 -3.18469,-1.38406zM54.825,72.1325c-0.1075,0.02688 -0.215,0.06719 -0.3225,0.1075c-0.41656,0.06719 -0.81969,0.215 -1.1825,0.43l-24.08,13.76c-1.08844,0.60469 -1.77375,1.76031 -1.77375,3.01c0,1.24969 0.68531,2.40531 1.77375,3.01l24.08,13.76c1.66625,0.95406 3.77594,0.37625 4.73,-1.29c0.95406,-1.66625 0.37625,-3.77594 -1.29,-4.73l-18.8125,-10.75l18.8125,-10.75c1.6125,-0.68531 2.45906,-2.45906 1.96188,-4.13875c-0.49719,-1.67969 -2.17688,-2.72781 -3.89688,-2.41875zM116.315,72.24c-1.46469,0.22844 -2.63375,1.37063 -2.87562,2.83531c-0.24188,1.46469 0.48375,2.92937 1.80062,3.61469l18.8125,10.75l-18.8125,10.75c-1.66625,0.95406 -2.24406,3.06375 -1.29,4.73c0.95406,1.66625 3.06375,2.24406 4.73,1.29l24.08,-13.76c1.08844,-0.60469 1.77375,-1.76031 1.77375,-3.01c0,-1.24969 -0.68531,-2.40531 -1.77375,-3.01l-24.08,-13.76c-0.71219,-0.41656 -1.54531,-0.57781 -2.365,-0.43z" />
				</g>
			</g>
		</svg>
	);
	const writing_svg = (
		<svg
			id="writing-svg"
			className="card-img-top padtop20"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width={100}
			height={100}
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
				<path d="M0,172v-172h172v172z" fill="none" />
				<g fill="#000000">
					<path d="M134.97297,17.20672c-29.64891,0.37638 -43.37571,9.04371 -48.68406,13.72641c-5.79984,-4.94672 -21.42233,-14.47842 -55.40953,-13.63906c-1.86448,0.04472 -3.35937,1.57208 -3.35937,3.44v17.47547h-4.89797c-4.88824,0 -8.86542,3.87279 -8.72094,8.62687v85.58344c-0.14448,4.75408 4.00067,8.45219 8.88891,8.45219h96.58875l-6.85985,-6.57094h-89.70203c-1.09048,0 -2.17349,-0.92493 -2.31797,-1.88125v-85.58344c0.14448,-0.95632 1.03264,-2.1164 2.12312,-2.1164h4.89797v69.85485c0,0.9288 0.37077,1.8089 1.03469,2.45906c0.66048,0.64672 1.50898,0.9603 2.48594,0.98094c40.47848,-0.94944 52.8062,8.42015 53.08484,8.64031c0.63296,0.52976 1.41911,0.80625 2.21719,0.80625c0.48504,0 0.97358,-0.1025 1.4311,-0.31578c0.49536,-0.2236 0.91945,-0.55814 1.24969,-0.9675c1.05952,-0.70176 4.34236,-2.57248 10.99188,-4.32688l-5.57656,-5.57656c-1.8232,0.59168 -3.85312,1.18616 -5.14656,1.74688v-6.40297l-6.38953,-6.88v13.45094c-6.90064,-3.0444 -20.8651,-7.12188 -46.09062,-7.12188c-0.79464,0 -1.60003,0.00312 -2.41875,0.01344v-86.95406h0.49719c32.76256,-0.04816 44.89464,9.96154 47.7636,12.78578v30.69125l6.64484,2.58v-33.07641c2.74856,-2.838 15.39406,-13.12741 48.3011,-13.02765v81.83437l6.88,6.88v-68.17515h4.99875c1.09048,0 1.88125,0.89133 1.88125,1.84765v73.22094l6.73219,6.88v-80.10766c0,-4.75408 -3.6916,-8.4925 -8.57984,-8.4925h-5.03235v-17.28062c0,-1.86792 -1.49145,-3.39528 -3.35937,-3.44c-2.12033,-0.05224 -4.17107,-0.0654 -6.14766,-0.04031zM83.48047,75.2836c-1.09374,0.05272 -2.09706,0.62296 -2.70201,1.5357c-0.60495,0.91273 -0.73927,2.05893 -0.36174,3.0868l7.06813,19.22906c0.17048,0.46915 0.44101,0.89557 0.79281,1.24969l58.52031,58.51359c0.91425,0.9142 2.26387,1.23863 3.49375,0.83985l1.10188,1.10187c3.98205,3.98206 10.52532,3.89985 14.50578,-0.08062c0,-0.00224 0,-0.00448 0,-0.00672c3.97632,-3.98664 4.06374,-10.52938 0.08063,-14.5125l-1.22953,-1.22953c0.23986,-1.13532 -0.10876,-2.31506 -0.92719,-3.13765l-58.5136,-58.52031c-0.35217,-0.35098 -0.77622,-0.62146 -1.24297,-0.79281l-19.23578,-7.06813c-0.4317,-0.15902 -0.89091,-0.22985 -1.35047,-0.20828zM92.12078,85.4961l6.9539,2.55984l-0.77265,0.77266c-0.63696,0.63679 -0.9988,1.49796 -1.00781,2.39859l-0.00672,1.00781l-1.00781,0.00672c-0.90296,0.00726 -1.76687,0.36923 -2.40531,1.00781l-0.89359,0.8936l-2.55985,-6.94719zM104.54375,92.31563l42.9664,42.97312l-7.29656,7.29656l-42.97313,-42.97313l0.5039,-0.5039l2.98313,-0.02015c1.87623,-0.01845 3.39165,-1.53687 3.4064,-3.41313l0.02688,-2.9764zM152.38125,140.15313l4.14547,4.15219l-7.29656,7.29656l-4.14547,-4.15219zM160.2825,150.27156l0.83313,0.83312c1.23191,1.23192 1.24081,3.45887 -0.08735,4.79047c-1.32457,1.3193 -3.53879,1.31214 -4.77031,0.08063l-0.83984,-0.83313z" />
				</g>
			</g>
		</svg>
	);

	// Array of objects that contains an ID string and variable with embedded SVG.
	const svgs = [
		{
			id: "software-dev-svg",
			svg: software_dev_svg,
		},
		{
			id: "writing-svg",
			svg: writing_svg,
		},
	];

	return (
		<Layout>
			{/* Typewriter */}
			<section className="container-fluid main-section nopad">
				<div
					className="center-page center-img"
					id="homepage-landing-img"
				>
					<div className="center">
						<div className="section-title center-title white">
							<Typewriter
								options={{
									strings: [
										"I'm John",
										"Software <span class='typewriter-spacing text-bg'>developer</span>",
										"Creative <span class='typewriter-spacing text-bg'>novelist</span>",
										"Avid <span class='typewriter-spacing text-bg'>learner</span",
									],
									autoStart: true,
									loop: true,
									delay: 35,
									deleteSpeed: 33,
								}}
								onInit={(typewriter) => {
									<h1>
										{typewriter.typeString().pauseFor(500)}
									</h1>;
								}}
							/>
						</div>
					</div>
					{/* Only for mobile */}
					<MenuContainer />
					{/* Only for desktop */}
					<SocialMediaLayout />
					{/* Page Scroll */}
					<div className="page-scroll-section">
						<h3 className="white">Scroll Down</h3>
						<a
							data-scroll
							href="#aboutme"
							className="page-scroll"
							id="scroll-anim"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								width={52}
								height={52}
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
									<path
										d="M0,172v-172h172v172z"
										fill="none"
									/>
									<g fill="#ffffff">
										<path d="M154.74625,44.6125c-1.8275,0.05375 -3.5475,0.80625 -4.81062,2.12313l-63.93563,63.93562l-63.93562,-63.93562c-1.30344,-1.33031 -3.07719,-2.08281 -4.945,-2.08281c-2.795,0 -5.30781,1.70656 -6.35594,4.3c-1.06156,2.59344 -0.43,5.56312 1.57219,7.51156l68.8,68.8c2.6875,2.6875 7.04125,2.6875 9.72875,0l68.8,-68.8c2.0425,-1.96188 2.6875,-4.98531 1.58562,-7.60563c-1.08844,-2.62031 -3.66844,-4.3 -6.50375,-4.24625z" />
									</g>
								</g>
							</svg>
						</a>
					</div>
				</div>
			</section>
			{/* About Me */}
			<section className="container-fluid main-section" id="aboutme">
				<div className="container">
					<h1 className="section-title text-center">ABOUT ME</h1>
					<h5
						className="pad20 text-center"
						style={{
							fontSize: "1.3em",
							letterSpacing: "1px",
							lineHeight: "1.5em",
						}}
					>
						For the longest time, I was fascinated by technology and
						storywriting. I wrote my first chapter at nine years old
						and executed my first line of code at 10. By utilizing
						both algorithmic thinking and vivid creativity, I make
						projects that bring meaning to not only myself, but for
						others too.
					</h5>
					<div className="pad-top-bottom-68" />
					<div className="card-group">
						{/* Iterate through "TABLE" array, composed of objects */}
						{TABLE.map((item, table_key) => (
							<div
								className="card add-shadow text-center bg-light"
								key={table_key}
							>
								<div className="card-body">
									{/* Display appropiate SVG */}
									{showSvg(svgs, item.svg_id)}
									<h1 className="card-title padtop20">
										{item.title}
									</h1>

									<br />

									{/* Iterate through objects in "category" property */}
									{item.category.map(
										(category, category_key) => (
											<>
												<h4
													className="card-text"
													key={category_key}
												>
													{category.name}
												</h4>

												{/* Iterate through "values" property inside "category" */}
												{category.values.map(
													(values, values_key) => (
														<h6
															className="card-text"
															key={values_key}
														>
															{values}
														</h6>
													)
												)}

												<br />
											</>
										)
									)}
								</div>
							</div>
						))}
					</div>
					<h6 className="padtop20">
						*See my Software page for more details.
					</h6>
				</div>
			</section>
			{/* Navigation Buttons */}
			<section className="container-fluid main-section bg-lightgrey">
				<div className="container center-text">
					<div className="row">
						{items.map((item, key) => (
							<div className="col pad20-top-bottom" key={key}>
								<h1 className="section-title black">
									{item.item.toUpperCase()}
								</h1>
								<h3 className="pad20 section-caption">
									{item.caption}
								</h3>
								<Link legacyBehavior href={item.link}>
									<a
										className="btn btn-outline-dark btn-lg font15"
										role="button"
									>
										{item.item}
									</a>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>
		</Layout>
	);
}
