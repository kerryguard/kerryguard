export const createHead = ({ article, title, description, image, $route, fulltitle, structuredOrg }) => {
    title = title || (article && (article.seotitle || article.title))
    description = description || (article && (article.seodescription || article.description))
    const creator = article && article.authors && article.authors[0] && article.authors[0].twitter

    const rootUrl = process.env.ROOT_URL
    image = image || (article && article.img)
    if (image && (!image.startsWith('http://') && !image.startsWith('https://')))
        image = rootUrl + image

    // Remove once we have a handle on decent social images
    image = undefined

    const url = rootUrl + $route.path

    const head = (
        {
            title: fulltitle || (title + ' » Kerry Guard'),
            meta: createMeta(title, description, image, url, creator),
            link: [
                {
                    rel: 'canonical',
                    href: process.env.ROOT_URL + $route.path
                }
            ],
            script: []
        })

    return head
}

const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
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

export const titleCase = (value) => value.split(' ').map(v => v[0].toUpperCase() + v.substr(1).toLowerCase()).join(' ')

export const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-gb", dateOptions)

export const createMeta = (title, description, image, url, creator) => {
    const meta = [
        { hid: 'og:title', property: 'og:title', content: title },
        {
            hid: 'og:type', property: 'og:type', content: 'website'
        },
        { hid: 'twitter:site', name: 'twitter:site', content: '@kerryguard' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
    ]

    if (url) {
        meta.push({
            hid: 'og:url',
            property: 'og:url',
            content: url
        }
        )
    }

    if (description) {
        meta.push(
            { hid: 'description', name: 'description', content: description },
            {
                hid: 'og:description',
                property: 'og:description',
                content: description
            },
            { hid: 'twitter:description', name: 'twitter:description', content: description })
    }

    if (creator) {
        meta.push({ hid: 'og:creator', property: 'og:creator', content: '@' + creator })
    }

    if (image) {
        meta.push(
            { hid: 'og:image', property: 'og:image', content: image },
            { hid: 'twitter:image', property: 'twitter:image', content: image })
    }

    return meta
}