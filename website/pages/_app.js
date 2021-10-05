// Import CSS
import 'public/assets/css/fonts.css'
import 'public/assets/css/footer.css'
import 'public/assets/css/main.css'
import 'public/assets/css/nav.css'
import 'public/assets/css/fonts.css'
import 'public/assets/css/padding.css'
import 'public/assets/css/menu.css'

import Head from "next/head"

/**
 * Controls page initialization
 * 
 * @param Component Active page.
 * @param pageProps Object with initial, preloaded props.
 * @return          JSX element.
 */
export default function MyApp({ Component, pageProps }) {
    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" key="http" />
        </Head>
        <Component {...pageProps} />
    </>
}