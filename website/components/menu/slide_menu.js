import { HOME_ITEMS } from '../jsons/social_media.json'
import { VALUES } from '../jsons/hover_tap_values.json'
import { m as motion, MotionConfig, GesturesFeature } from 'framer-motion'


class Menu extends React.Component {
    render() {
        var visibility = "hide";

        if (this.props.menuVisibility) {
            visibility = "show";
        }

        return (
            <div id='social-media-menu'
                onMouseDown={this.props.handleMouseDown}
                className={visibility}
            >
                <div className="center">
                    <MotionConfig features={[GesturesFeature]}>
                        {HOME_ITEMS.map((item, key) => (
                            <div
                                className="social-links-home-item"
                                key={key}
                            >
                                <a target="_blank" rel="noopener noreferrer" href={item.link}>
                                    <motion.img
                                        className="social-icon-img"
                                        src={item.pic}
                                        alt={item.alt_text}
                                        whileHover={{ scale: VALUES.hover }}
                                        whileTap={{ scale: VALUES.tap }} 
                                    />
                                </a>
                            </div>
                        ))}
                    </MotionConfig>
                </div>
            </div>
        );
    }
}

export default Menu;