import Head from 'next/head'


/**
 * Include title, meta, favicon, and CDN libraries in the head of each page.
 * 
 * @return JSX element.
 */
export default function Includes() {
    const title = 'John Carlo Manuel | Software Developer & Novelist';
    const desc  = "Electrical engineering student who develops software and writes fiction in his freetime.";
    const site  = process.env.NEXT_PUBLIC_SITE || 'http://localhost:3000';
    const img   = site + '/assets/imgs/meta_img.png';
    const alt   = 'Website banner'

    // Thanks to https://metatags.io/ for an easy way to generate meta tags.

    return <Head>
        {/* Main tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={desc} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="ogtype" />
        <meta property="og:url" content={site} key="ogurl" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={desc} key="ogdesc" />
        <meta property="og:image" content={img} key="ogimg" />
        <meta property="og:image:secure_url" content={img} />
        <meta property="og:image:alt" content={alt} key="ogalt" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" key="twicard" />
        <meta property="twitter:url" content={site} key="twiurl" />
        <meta property="twitter:title" content={title} key="twititle" />
        <meta property="twitter:description" content={desc} key="twidesc"/>
        <meta property="twitter:image" content={img} key="twiimg" />

        {/* Favicon via. https://realfavicongenerator.net/ */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=ngj9zMkjmd" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=ngj9zMkjmd" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=ngj9zMkjmd" />
        <link rel="manifest" href="/site.webmanifest?v=ngj9zMkjmd" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=ngj9zMkjmd" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico?v=ngj9zMkjmd" />
        <meta name="apple-mobile-web-app-title" content="John Carlo Manuel's Website" />
        <meta name="application-name" content="John Carlo Manuel's Website" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Include Bootstrap CSS first */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.1/css/bootstrap.min.css" integrity="sha384-VCmXjywReHh4PwowAiWNagnWcLhlEJLA5buUprzK8rxFgeH0kww/aWY76TfkUoSX" crossOrigin="anonymous" />
        {/**
         * Import libraries in order:
         * 1. jQuery
         * 2. popper.js
         * 3. Bootstrap.js
         */}
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous" />            
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossOrigin="anonymous" />
        <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.1/js/bootstrap.min.js" integrity="sha384-XEerZL0cuoUbHE4nZReLT7nx9gQrQreJekYhJD9WNWhH8nEW+0c5qq7aIo2Wl30J" crossOrigin="anonymous" />
        {/* Import other scripts/libraries */}
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/akzhy/vara@master/src/vara.min.js" integrity="sha384-xH4x4cr4B4nF5PHecjzylau3Kx5b31OnWDELlSASZGiqvquVky0jqr/YJ57+ABKC" crossOrigin="anonymous" />   
        <script type="text/javascript" src='/assets/scripts/navbar_scroll.js' />
        <script type="text/javascript" src='/assets/scripts/scroll_down.js' />
    </Head>
}