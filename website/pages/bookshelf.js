import styles from 'public/assets/css/bookshelf.module.css'
import { m as motion, MotionConfig, AnimationFeature} from 'framer-motion'
import dynamic from 'next/dynamic'


const SocialMediaLayout = dynamic(
    () => import('components/menu/social_media_only'),
)

const MenuContainer = dynamic(
    () => import('components/menu/slide_menu_container'),
)

const Layout = dynamic(
    () => import('components/layout'),
)

const BookShelfTable = dynamic(
    () => import('components/bookshelf_table'),
    { loading: () => <p>Loading...</p>}
)

// Fetch data from database at request time
// Passes data into bookshelf component
export async function getServerSideProps() {
    try {
        const pool = require('lib/db');

        // FYI, await actually does something, ignore any warnings if your editor / IDE says it doesn't work.
        // See lib/db.js and you'll see why.
        const rows = await pool.query('SELECT * FROM books');
        const data = JSON.parse(JSON.stringify(rows));

        return { props: { data } }
    }
    catch (error) {
        console.error(error);
        return null;
    }
}   

/**
 * Display Bookshelf page.
 * 
 * @param data  Get data from function: getServerSideProps
 * @return      JSX element.
 */
export default function Bookshelf({ data }) {
    const reading_list = [
        'The Gulag Archipelago Vol 1-3 by Aleksandr Solzhenitsyn',
        'Fear and Loathing in Las Vegas by Hunter Thompson',
        'Lord of the Flies by William Golding',
        'Crime and Punishment by Fyodor Dostoevsky',
        'War and Peace by Leo Tolstoy',
        'The Republic by Aristotle',
        'To Kill a Mockingbird by Harper Lee',
        '21 Lessons for the 21st Century by Yuval Noah Harari',
        'Jane Eyre by Charlotte Brontë',
        'Pride and Prejudice by Jane Austen',
        'All Quiet on the Western Front by Erich Maria Remarque',
        'Sapiens: A Brief History of Mankind by Yuval Noah Harari',
        'Politics by Aristotle',
        'Animal Farm by George Orwell',
        'Noli Me Tángere by José Rizal',
        'El Filibusterismo by José Rizal',
        'Lolita by Vladimir Nabokov',
        'Holy Bible by various authors',
        'Beyond Good and Evil by Friedrich Nietzsche' 
    ]

    // Declare animation settings
    // See documentation for framer.js variants: https://www.framer.com/api/motion/animation/#variants
    const big_title = {
       initial: {
            opacity: 0
       },
       animate: {
            opacity: 1,
            scale: 1.35,
            transition: {
               duration: 1.1,
           }
       },
    }

    return <Layout>
        <section className="container-fluid main-section nopad">
        <div className="center-page center-img" id={styles["bookshelf-landing-img"]}>
                <div className="center">
                    <MotionConfig features={[AnimationFeature]}>
                        <motion.div 
                            className="section-title center-title white"
                            initial='initial'
                            animate='animate'
                            variants={big_title}
                        >
                            A complete collection of my reads.
                        </motion.div>
                    </MotionConfig>
                </div>
                {/* Only for mobile */}
                <MenuContainer />
                {/* Only for desktop */}
                <SocialMediaLayout />
            </div>
        </section>
        <section className="container-fluid main-section">
            <div className="container">
                <h1 className={styles["bookshelf-h"] + ' ' + "pad-bottom-20"}>
                    My Bookshelf
                </h1>
                <h6 className={styles["bookshelf-h"]}>{'Book data obtained via '} 
                    <a target="_blank" rel="noopener noreferrer" href="https://www.goodreads.com/api" className="link-with-text">Goodreads API</a>
                </h6>
                <div className="mytable">
                    {/* <bookshelf_table obj={data} /> */}
                    <BookShelfTable obj={data} />
                </div>
                <h6 className="padtop20">* I started using Goodreads in early February, so the dates read 
                from 2017 to the beginning of 2019 were approximated. Another thing: I read more than one book at a time,
                so expect to see lengthy works finished within days.</h6>
            </div>
        </section>
        <section className="container-fluid main-section bg-lightgrey">
            <div className="container">
                <h2 className="subtitle">Thoughts On Reading</h2>
                <h5 className="padtop50">
                    I wasn't a heavy reader back in my youth, but some time later, I decided to pick up
                    reading as a way to broaden my mind and perceive the things I learned throughout my life from a different perspective.
                    In order to turn this into a habit, I took on the book-a-week challenge in 2019 and dedicated my free-time to
                    reading.
                    From modern, romantic stories to classical, thought-provoking literature, reading allowed me to
                    explore the minds of authors from the past and the present and appreciate the beauty of words and language.
                </h5>
                <div className="pad-top-bottom-68">
                    <br/>
                </div>
                <h3 className="subtitle pad-bottom-20">Reading List for 2021</h3>
                <div className="reading-list">
                    <ul>
                        {reading_list.map((book, key) => (
                            <li className={styles["book-item"]} key={key}>{book}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    </Layout>
}