import Link from 'next/link'
import { m as motion, MotionConfig, GesturesFeature } from 'framer-motion'


/**
 * Display Footer component in every page.
 * 
 * @param ITEMS      Get array of objects named 'ITEMS' from nav_footer_items.json.
 * @param HOME_ITEMS Get array of objects named 'HOME_ITEMS' from social_media.json.
 * @param VAlUES     Get object named 'VALUES' from hover_tap_values.json.
 * @return           JSX element.
 */
export default function Footer({ ITEMS, HOME_ITEMS, VALUES }) {
    return <footer className="footer container-fluid">
        {/* Motto */}
        <header className="footer-motto">
            <h1 className="section-title footer-unique-motto">CONNECT WITH ME!</h1>
        </header>
        {/* Social Media List */}
        <MotionConfig features={[GesturesFeature]}>
            <div className="center-text no-margin-pad">
                <ul className="social-link-list">
                    {HOME_ITEMS.map((item, key) => (
                        <li className="social-display social-icon" key={key}>
                            <a target="_blank" rel="noopener noreferrer" href={item.link} className="social-link">
                                <motion.img 
                                    className="social-icon-footer-img pad5" 
                                    src={item.pic} 
                                    alt={item.alt_text}
                                    whileHover={{ scale: VALUES.hover }}
                                    whileTap={{ scale: VALUES.tap }} 
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Links */}
            <div className="footer-nav-group center-text">
                {ITEMS.map((item, key) => (
                    <Link href={item.link} key={key}>
                        <motion.a 
                            className="footer-nav-items" 
                            whileHover={{ scale: VALUES.hover }}
                            whileTap={{ scale: VALUES.tap }}
                            style={{cursor: 'pointer'}}
                        >
                            {item.item}
                        </motion.a>
                    </Link>
                ))}
            </div>
            </MotionConfig>
        {/* Copyright */}
        <div className="footer-copyright-section">
            <p className="copyright-message">{`© Copyright ${new Date().getFullYear()} John Carlo Manuel. All rights reserved.`}</p>
            <p className="copyright-message">Handcoded with love. ♥(ˆ⌣ˆԅ)</p>
        </div>
    </footer>
}