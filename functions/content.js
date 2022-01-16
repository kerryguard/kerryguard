const siteUrl = process.env.ROOT_URL;

export const createSitemapRoutes = async () => {
    let routes = [];
    const { $content } = require('@nuxt/content');
    const articles = await $content({ deep: true }).where({ hidden: { $ne: true } }).only(['path', 'date', 'updated']).fetch();
    for (const article of articles) {
        if (!article.path.startsWith('/comments/')) {
            let url = article.path.startsWith('/blog/') ? siteUrl + blogUrl(article.path) : article.url ?? article.path;
            if (url.endsWith('/index'))
                url = url.substr(url, url.length - 5);
            routes.push({ url: url, lastmod: article.updated || article.date });
        }
    }
    return routes;
}

export const blogUrl = (value) => {
    const parts = value.split('/')
    const slug = parts.pop()
    const slugParts = slug.split('-')
    parts.push(slugParts[1])
    parts.push(slugParts[2])
    parts.push(slug.substr(11))
    return parts.join('/')
}

export const readingTime = (text) =>
    Math.ceil(text.trim().split(/\s+/).length / 225)

export const createBlogFeed = async (feed) => {
    feed.options = {
        id: "kerryguard",
        title: "Kerry Guard's Blog Feed",
        link: siteUrl + "/blog/feed.xml",
        description: "Kerry Guard",
        image: siteUrl + '/android-chrome-192x192.png',
        favicon: siteUrl + '/favicon.ico',
        generator: undefined,
        copyright: 'Copyright © 2022 Kerry Guard.',
    }

    const { $content } = require('@nuxt/content');
    const posts = await $content("blog", { deep: true })
        .sortBy("date", "desc")
        .limit(10)
        .fetch();

    posts.forEach(post => {
        feed.addItem({
            title: post.title,
            id: post.slug.substr(11),
            link: siteUrl + blogUrl(post.path),
            description: post.description,
            date: new Date(post.date),
            content: createHtml(post.body),
            author: [
                { name: post.author }
            ],
        })
    });
}

function createHtml(node) {
    switch (node.type) {
        case 'element':
            const contents = (node.children || []).map(c => createHtml(c)).join('');
            if (!contents) return '';

            if (node.tag == 'nuxt-link') {
                node.props.href = process.env.ROOT_URL + node.props.to;
                delete (node.props.to);
                node.tag = 'a';
            }

            const href = node?.props?.href;
            if (node.tag == 'a' && isRelative(href)) {
                node.props.href = process.env.ROOT_URL + href;
            }

            const properties = (Object.entries(node.props || {})).filter(p => p[0] !== 'className').map(p => p[0] + '="' + p[1] + '"').join(' ');
            if (node.tag == 'span' && !properties)
                return contents;

            return '<' + (node.tag + ' ' + properties).trim() + '>' + contents + '</' + node.tag + '>';
        case 'text':
            return node.value;
        case 'root':
            return (node.children || []).map(c => createHtml(c)).join('')
        default:
            return '';
    }
}

function isRelative(link) {
    return !link.startsWith('https://') && !link.startsWith('http://') && !link.startsWith('#') && !link.startsWith('//') && !link.startsWith('data:');
}