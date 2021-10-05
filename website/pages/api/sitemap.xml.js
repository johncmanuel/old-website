import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap';
import { createGzip } from 'zlib';
import { ITEMS } from 'components/jsons/nav_footer_items.json'


// Create sitemap for robots.txt to utilize
export default async (req, res) => {
    if (!res) return {};
    try {
        // Set response header 
        res.setHeader('content-type', 'application/xml');
        res.setHeader('Content-Encoding', 'gzip');

        // A transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
        // The readable stream it transforms must be in object mode.
        const smStream = new SitemapStream({
            hostname: process.env.NEXT_PUBLIC_SITE || 'http://localhost:3000',
        });

        const pipeline = smStream.pipe(createGzip());

        // Add static URLs
        ITEMS.map((item) => {
            smStream.write({ url: item.link, changefreq: EnumChangefreq.MONTHLY });
        });

        smStream.end();

        // Cache the response
        // streamToPromise.then(sm => sitemap = sm)
        const sitemap = await streamToPromise(pipeline);

        // Stream the response
        pipeline.pipe(res).on('error', error => {
            throw error;
        });
        res.write(sitemap);

    } catch (error) {
        console.log(error);
        res.status(500);
    }
    res.end();
};