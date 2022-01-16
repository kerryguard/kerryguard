import { readingTime, createSitemapRoutes, createBlogFeed, blogUrl } from './functions/content.js';

export default {
    target: 'static',
    components: true,
    generate: {
        fallback: true
    },

    router: {
        prefetchLinks: false,
    },

    head: {
        titleTemplate: '%s',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { name: 'msapplication-TileColor', content: '#f1f0ee' },
            { name: 'author', content: 'Kerry Guard' },
            { name: 'theme-color', content: '#00b1c7' },
            { hid: 'description', name: 'description', content: 'Kerry Guard.' }
        ],
        link: [
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
            { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/apple-touch-icon.png' },
            { rel: 'manifest', href: '/site.webmanifest' },
            { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#1abcaa' }
        ],
        script: [
        ],
    },

    css: [
        '@/assets/css/main.css',
    ],

    content: {
        liveEdit: false,
    },

    hooks: {
        'content:file:beforeInsert': (document) => {
            if (document.extension === '.md') {
                if (document.text && !document.minutes)
                    document.minutes = readingTime(document.text)
                if (document.path && document.path.includes('blog/'))
                    document.url = blogUrl(document.path);
                if (document.date)
                    document.dateFormatted = formatDate(document.date);
                if (document.updated)
                    document.updatedFormatted = formatDate(document.updated);
            }
        }
    },

    buildModules: [
        '@nuxt/postcss8',
    ],

    modules: [
        '@nuxt/content',
        '@nuxtjs/feed',
        '@nuxtjs/sitemap',
    ],

    feed: [
        {
            path: '/feed-rss.xml',
            type: 'rss2',
            async create(feed) {
                await createBlogFeed(feed);
            }
        },
        {
            path: '/feed.xml',
            type: 'atom1',
            async create(feed) {
                await createBlogFeed(feed);
            }
        },
    ],

    sitemap: {
        hostname: process.env.ROOT_URL,
        gzip: true,
        exclude: ['**/thanks/', '**/fake/'],
        routes: createSitemapRoutes
    },

    build: {
        html: {
            minify: {
                removeRedundantAttributes: false
            }
        },
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-gb", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}