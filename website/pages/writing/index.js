import styles from "public/assets/css/writing.module.css";
import dynamic from "next/dynamic";
import { NOVELS } from "components/jsons/novels.json";
import Link from "next/link";

const TextAnim = dynamic(() => import("components/writing_anim"), {
	ssr: false,
});

const SocialMediaLayout = dynamic(() =>
	import("components/menu/social_media_only")
);

const MenuContainer = dynamic(() =>
	import("components/menu/slide_menu_container")
);

const Layout = dynamic(() => import("components/layout"));

/**
 * Display Writing page
 *
 * @return JSX element.
 */
export default function Writing() {
	return (
		<Layout>
			<TextAnim />
			<section className="container-fluid main-section nopad">
				<div
					className="center-page center-img"
					id={styles["writing-landing-img"]}
				>
					<div className="center">
						<div className="section-title center-title white">
							<div id="writing-title"></div>
						</div>
					</div>
					{/* Only for mobile */}
					<MenuContainer />
					{/* Only for desktop */}
					<SocialMediaLayout />
				</div>
			</section>
			<section className="container-fluid main-section">
				<div className="container">
					<h1 className={styles["writing-h"]}>Books</h1>
					<hr />
					<br />
					<div className="row row-cols-1 row-cols-md-3 text-center">
						{NOVELS.map((item, key) => (
							<div className="col mb-4" key={key}>
								<div className="card bg-light add-shadow">
									<img
										src={item.cover}
										className="card-img-top img-fluid"
										alt={item.alt}
									/>
									<div className="card-body">
										<h5 className="card-title">
											{item.name}
										</h5>
										<Link
											legacyBehavior
											href={`/writing/works/[id]`}
											as={`/writing/works/${item.name}`}
										>
											<a className="btn card-link">
												More Info
											</a>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* Might put some context here */}
			{/* <section className="container-fluid main-section bg-lightgrey">
            <div className="container">
            </div>
        </section> */}
		</Layout>
	);
}
