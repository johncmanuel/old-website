import { useRouter } from 'next/router'
import { NOVELS } from 'components/jsons/novels.json'
import styles from 'public/assets/css/id.module.css'
import Layout from 'components/layout';


/**
 * Returns a specific object if query id matches object's "name" property.
 * It's specifically tailored for an array named "NOVELS" located in novels.json, but it
 * could work with other arrays of objects with a "name" property.
 * 
 * @param works Array of objects from "NOVELS".
 */
function returnWorksInfo(works) {
    const router = useRouter();
    for (let i = 0; i < works.length; i++) {
        if (router.query.id == works[i].name) {
            return works[i];
        }
    }
}

/**
 * Displays ID page
 * 
 * @return JSX element.
 */
export default function IdPage() {
    const work = returnWorksInfo(NOVELS);

    // Somehow this fixes the SSR refresh bug
    if (work == null) { return <></> }

    /**
     * My colors in case I change my mind
     * #da4900 - mahogany
     * #C04000 - lighter shade of mahogany
     * D4CAA3 - dark vanilla
     */
   
    return <Layout>
        <section className="container-fluid main-section" style={{ backgroundColor: '#D4CAA3'}}>
            <div className="container add-shadow" style={{backgroundColor: 'whitesmoke'}}>
                <h1 className={styles['title'] + ' ' + 'padtop20'}>{work.name}</h1>
                <hr />
                <br />
                <div className="row">
                    <div className="col-sm pb-5">
                        <figure className="figure">
                            <img className="img-fluid figure-img" src={work.cover} alt={work.alt}></img>
                                <figcaption className="figure-caption text-right">
                                    Cover Credits: {work.cover_credits}
                                </figcaption>
                        </figure>
                    </div>
                    <div className="col-sm pb-5">
                        <h1 className={styles['genre']}>{'Genre(s) '}</h1>
                        <h5 className={styles['genre']}>{work.genre}</h5>
                        <br />
                        <h1 className={styles['synposis']}>Synposis</h1>
                        <p className={styles['synposis-text']}>{work.synposis}</p>
                        <div className="text-center padtop50">
                            <br />
                            <a className="btn btn-lg btn-dark" href={work.link} target="_blank" rel="noopener noreferrer">
                                Purchase
                            </a>
                        </div>
                        <br />
                        <div className="text-center">
                            <h5 className="">Available in {work.format} Format</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}