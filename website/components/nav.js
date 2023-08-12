import Link from "next/link";
import { m as motion, MotionConfig, GesturesFeature } from "framer-motion";

/**
 * Display navigation bar at the top of each page.
 *
 * @param ITEMS   Get array of objects named 'ITEMS' from nav_footer_items.json.
 * @param VAlUES  Get object named 'VALUES' from hover_tap_values.
 * @return        JSX element.
 */
export default function Nav({ ITEMS, VALUES }) {
	return (
		<>
			<MotionConfig features={[GesturesFeature]}>
				<nav
					className="navbar navbar-light fixed-top navbar-expand-lg"
					style={{ padding: "0px" }}
					id="global-nav"
				>
					<div className="container toggler-pad-right">
						<Link legacyBehavior href="/">
							<motion.div
								whileHover={{ scale: VALUES.hover }}
								whileTap={{ scale: VALUES.tap }}
							>
								<a className="nav-brand">John Carlo Manuel</a>
							</motion.div>
						</Link>
						<button
							className="navbar-toggler navbar-toggler-right"
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon" />
						</button>
						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav ml-auto">
								{/* Other pages */}
								{ITEMS.map((item, key) => (
									<motion.li
										className="nav-item pad5-top-bottom"
										key={key}
										whileHover={{ scale: VALUES.hover }}
										whileTap={{ scale: VALUES.tap }}
									>
										<Link legacyBehavior href={item.link}>
											<a className="nav-link padright10">
												{item.item}
											</a>
										</Link>
									</motion.li>
								))}
							</ul>
						</div>
					</div>
				</nav>
			</MotionConfig>
		</>
	);
}
