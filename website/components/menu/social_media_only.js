import { HOME_ITEMS } from '../jsons/social_media.json'
import { VALUES } from '../jsons/hover_tap_values.json'
import { m as motion, MotionConfig, GesturesFeature } from 'framer-motion'


// Return social media links for desktop
export default function SocialMediaLinksOnDesktop() {
    return (
        <div className="social-media-desktop">
            <MotionConfig features={[GesturesFeature]}>
            {HOME_ITEMS.map((item, key) => (
              <div 
                className="social-links-home-item-desktop" 
                key={key}
              >
                <a target="_blank" rel="noopener noreferrer" href={item.link}>
                  <motion.img 
                    className="social-icon-img-desktop"
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
    )
}