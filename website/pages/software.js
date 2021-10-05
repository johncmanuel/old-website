import dynamic from 'next/dynamic'
import { SKILLS } from 'components/jsons/software_skills.json'


const Typewriter = dynamic(
    () => import('typewriter-effect'),
    { ssr: false }
)

const SocialMediaLayout = dynamic(
    () => import('components/menu/social_media_only'),
)

const MenuContainer = dynamic(
    () => import('components/menu/slide_menu_container'),
)

const Layout = dynamic(
    () => import('components/layout'),
)


// Fetch GitHub API data from database at request time
export async function getServerSideProps() {
    try {
        const pool = require('lib/db');

        // FYI, await actually does something, ignore any warnings if your editor / IDE says it doesn't work.
        // See lib/db.js and you'll see why.
        const rows = await pool.query('SELECT * FROM repos');
        const data = JSON.parse(JSON.stringify(rows));
        return { props: { data } }
    }
    catch (error) {
        console.error(error);
        return null;
    }
}   

/**
 * Display Software page
 * 
 * @param data  Object from getServerSideProps, containing GitHub information
 * @return      JSX element.
 */
export default function Software({ data }) {
    
    // This freakin' typewriter module doesn't want to recognize quotes in text, so I'll declare what I need here
    const repos = `'my repositories and programming projects'`;

    return <Layout>
        <section className="container-fluid main-section nopad">
            <div className="center-page center-img" id="software-landing-img">
                <div className="center">
                    <div className="section-title center-title white">
                        <Typewriter
                            options={{
                                strings: [
                                    // They have to be one-liners because Typewriter recognizes whitespace in literal strings
                                    `<span style="color: #56b6c2;">print</span>(<span style="color: #98c379;">${repos}</span>)`],
                                autoStart: true,
                                loop: true,
                                delay: 30,
                                deleteSpeed: 35,
                            }}
                            onInit={(typewriter) => {
                                <h1>
                                    {typewriter.typeString()
                                        .pauseFor(1000)}
                                </h1>
                            }}
                        />
                    </div>
                </div>
                {/* Only for mobile */}
                <MenuContainer />
                {/* Only for desktop */}
                <SocialMediaLayout />
            </div>
        </section>
        {/* Projects */}
        <section className="container-fluid main-section bg-lightgrey">
            <div className="container">
                <h1 className="text-center">Projects</h1>
                <h6 className="text-center">{'Data obtained via '} 
                    <a target="_blank" rel="noopener noreferrer" href="https://docs.github.com/en/rest" className="link-with-text">GitHub API</a>
                </h6>
                <hr />
                <div className="row row-cols-1 row-cols-md-2">
                    {data.map((item, key) => (
                        <div className="col mb-4" key={item.id}>
                            <div className="card add-shadow text-center">
                                <div className="card-body">
                                    <h3 className="card-title">{item.title}</h3>
                                    <p className="card-text">{item.details}</p>
                                    <br />
                                    <div className="row row-cols-1 row-cols-md-3">
                                        <div className="col mb-4">
                                            <p className="card-text">Date Created: </p>
                                            <p className="card-text">{item.date_created}</p>
                                        </div>
                                        <div className="col mb-4">
                                            <p className="card-text">Stars: </p>
                                            <p className="card-text">{item.stars}</p>
                                            
                                        </div>
                                        <div className="col mb-4">
                                            <p className="card-text">Language: </p>
                                            <p className="card-text">{item.lang}</p>
                                        </div>
                                    </div>
                                    <br />
                                    <a target="_blank" rel="noopener noreferrer" href={item.link} className="card-link">
                                        Link to Repository
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        {/* Software Dev Skills */}
        <section className="container-fluid main-section">
            <div className="container">
                <h1 className="text-center">Skills</h1>
                <hr />
                <div className="card-group">
                    {SKILLS.map((skill, key) => (
                        <div className="card add-shadow text-center" key={key}>
                        {/* Might have to repeat this process again with these svgs and the rest of the data */}
                        <svg className="card-img-top padtop20" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={100} height={100} viewBox="0 0 172 172" style={{ fill: '#000000' }}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDasharray="true" strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#000000"><path d="M16.66922,20.64c-5.4008,0 -9.78922,4.38842 -9.78922,9.78922v31.49078h158.24v-31.49078c0,-5.4008 -4.38842,-9.78922 -9.78922,-9.78922zM27.52,34.4c3.79776,0 6.88,3.0788 6.88,6.88c0,3.79776 -3.08224,6.88 -6.88,6.88c-3.79776,0 -6.88,-3.08224 -6.88,-6.88c0,-3.8012 3.08224,-6.88 6.88,-6.88zM48.16,34.4c3.79776,0 6.88,3.0788 6.88,6.88c0,3.79776 -3.08224,6.88 -6.88,6.88c-3.79776,0 -6.88,-3.08224 -6.88,-6.88c0,-3.8012 3.08224,-6.88 6.88,-6.88zM65.36,34.4h82.56v13.76h-82.56zM6.88,68.8v79.12c0,1.90232 1.53768,3.44 3.44,3.44h151.36c1.90232,0 3.44,-1.53768 3.44,-3.44v-79.12zM27.52,82.56h68.8v17.2h-68.8zM113.52,82.56h30.96v48.16h-30.96zM27.52,113.52h68.8v17.2h-68.8z" /></g></g></svg>
                        <div className="card-body">
                                <h1 className="card-title">{skill.title}</h1>
                                <br />
                                <div className="row">
                                    <div className="col">
                                        <h4>Frameworks / Libraries</h4>
                                        <ul className="list-unstyled">
                                            {skill.framework.map((f, key) => (
                                                <li className="card-text py-2" key={key}>{'• ' + f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <h4>Languages</h4>
                                        <ul className="list-unstyled">
                                            {skill.languages.map((l, key) => (
                                                <li className="card-text py-2" key={key}>{'• ' + l}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* <div className="card add-shadow text-center">
                        <svg className="card-img-top padtop20" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={100} height={100} viewBox="0 0 172 172" style={{ fill: '#000000' }}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDasharray strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#000000"><path d="M65.36,6.88c-1.36912,0 -2.61429,0.81377 -3.15781,2.06938c-0.54696,1.25904 -0.28396,2.72115 0.65172,3.72219l38.7,41.28c0.65016,0.69488 1.55666,1.08844 2.5061,1.08844h50.74v44.72h6.88v-44.72h3.44c1.38976,0 2.64821,-0.84 3.17797,-2.12313c0.5332,-1.28656 0.23806,-2.76522 -0.74578,-3.74906l-41.28,-41.28c-0.64328,-0.64672 -1.51715,-1.00781 -2.43219,-1.00781zM70.25125,30.62406l-7.79375,12.24828c-0.81872,1.29 -0.69542,2.95947 0.30906,4.11187l27.09,30.96c0.6536,0.74304 1.60272,1.17578 2.59344,1.17578h48.59c1.90232,0 3.44,-1.54112 3.44,-3.44v-13.76h-40.42c-2.838,0 -5.58124,-1.18428 -7.53172,-3.2586zM22.79,44.72c-4.97768,0 -9.03,4.07199 -9.03,9.07031v81.61937c0,4.99832 4.05232,9.07031 9.03,9.07031h112.66c4.97768,0 9.03,-4.07199 9.03,-9.07031v-49.40969h-3.44h-3.44v37.84h-116.96v-70.04969c0,-1.204 0.9632,-2.19031 2.15,-2.19031h34.5411c-1.59616,-1.98832 -2.33383,-4.44104 -2.23063,-6.88zM158.24,106.64c-3.8012,0 -6.88,3.0788 -6.88,6.88c0,3.8012 6.88,13.76 6.88,13.76c0,0 6.88,-9.9588 6.88,-13.76c0,-3.8012 -3.0788,-6.88 -6.88,-6.88zM79.12,130.72c1.89888,0 3.44,1.54112 3.44,3.44c0,1.89888 -1.54112,3.44 -3.44,3.44c-1.89888,0 -3.44,-1.54112 -3.44,-3.44c0,-1.89888 1.54112,-3.44 3.44,-3.44zM64.70156,151.36c-1.45856,3.956 -5.27212,6.88 -9.66156,6.88c-1.90232,0 -3.44,1.54112 -3.44,3.44c0,1.89888 1.53768,3.44 3.44,3.44h48.16c1.90232,0 3.44,-1.54112 3.44,-3.44c0,-1.89888 -1.53768,-3.44 -3.44,-3.44c-4.38944,0 -8.203,-2.924 -9.66156,-6.88z" /></g></g></svg>
                        <div className="card-body">
                            <h3 className="card-title">Machine Learning</h3>
                        </div>
                    </div>
                    <div className="card add-shadow">
                        <svg className="card-img-top padtop20" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={100} height={100} viewBox="0 0 172 172" style={{ fill: '#000000' }}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDasharray strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#000000"><path d="M151.0375,3.3325c-0.14781,0.02688 -0.29562,0.06719 -0.43,0.1075c-1.59906,0.36281 -2.72781,1.80063 -2.6875,3.44c0,6.53063 -3.02344,10.11844 -8.6,13.6525c-5.57656,3.53406 -13.63906,6.39625 -21.93,9.89c-8.29094,3.49375 -16.8775,7.69969 -23.5425,14.7275c-6.06031,6.39625 -10.26625,15.18438 -10.965,26.9825c-6.19469,-0.51062 -10.05125,-2.49937 -14.19,-4.6225c-5.0525,-2.59344 -10.83062,-5.59 -20.5325,-5.59c-20.70719,0 -48.16,47.07156 -48.16,82.56c0,16.20563 8.4925,27.52 20.64,27.52c18.24813,0 30.6375,-9.90344 41.6025,-18.5975c8.385,-6.65156 15.68156,-12.3625 23.7575,-12.3625c8.07594,0 15.3725,5.71094 23.7575,12.3625c10.965,8.69406 23.35438,18.5975 41.6025,18.5975c12.1475,0 20.64,-11.31437 20.64,-27.52c0,-35.48844 -27.45281,-82.56 -48.16,-82.56c-9.70187,0 -15.48,2.99656 -20.5325,5.59c-3.96406,2.0425 -7.68625,3.91031 -13.4375,4.515c0.67188,-10.11844 4.04469,-16.89094 9.03,-22.145c5.56313,-5.87219 13.16875,-9.83625 21.1775,-13.2225c8.00875,-3.38625 16.24594,-6.11406 22.8975,-10.32c6.65156,-4.20594 11.825,-10.50812 11.825,-19.4575c0.04031,-0.99437 -0.36281,-1.94844 -1.075,-2.62031c-0.72562,-0.68531 -1.70656,-1.02125 -2.6875,-0.92719zM127.28,92.88c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88zM41.28,96.32h10.32v10.32h10.32v10.32h-10.32v10.32h-10.32v-10.32h-10.32v-10.32h10.32zM113.52,106.64c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88zM141.04,106.64c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88zM127.28,120.4c3.80281,0 6.88,3.07719 6.88,6.88c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-3.80281 3.07719,-6.88 6.88,-6.88z" /></g></g></svg>
                        <div className="card-body">
                            <h3 className="card-title">Game Development</h3>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
        {/* GitHub Link */}
        <div className="container-fluid main-section bg-lightgrey">
            <div className="container">
                <div className="text-center">
                    <h1 className="text-center pad20">My GitHub</h1>
                    <a className="btn btn-outline-dark btn-lg text-center" target="_blank" rel="noopener noreferrer" href="https://github.com/johncmanuel">
                        GitHub
                    </a>
                </div>
                <br />
                <blockquote className="blockquote text-center">
                    <p className="mb-0">“GitHub is where programmers go to build their ego.”</p>
                    <footer className="blockquote-footer">{'Jarvis Johnson, '}
                        <cite title="Link To Source">
                            <a href="https://youtu.be/Nxu6GlDleqA?t=254" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
                                I Wrote A Program To Order Pizza
                            </a>
                        </cite>
                    </footer>
                </blockquote>
            </div>
        </div>
    </Layout>
}