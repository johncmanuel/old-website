// import Includes from './includes'
import { ITEMS } from './jsons/nav_footer_items.json'
import { HOME_ITEMS } from './jsons/social_media.json'
import { VALUES } from './jsons/hover_tap_values.json'
import dynamic from 'next/dynamic'


const Nav = dynamic(
  () => import('./nav')
)

const Footer = dynamic(
  () => import('./footer')
)

const Includes = dynamic(
  () => import('./includes')
)

/**
 * Combine Nav, Footer, and Includes components with each page, as well as their
 * respective parameters.
 * 
 * @param children  Rest of the page's components.
 * @return          JSX element.
 */
export default function Layout({ children }) {
  return <>
      <Includes />
      {/* Pass objects from imports into Nav and Footer components */}
      <Nav ITEMS={ITEMS} VALUES={VALUES} />
      {children}
      <Footer ITEMS={ITEMS} 
              HOME_ITEMS={HOME_ITEMS} 
              VALUES={VALUES} 
        />
    </>
}
