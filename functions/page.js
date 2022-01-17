export const createHead = ({ article, title, description, image, $route, fulltitle }) => {
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

export const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-gb", dateOptions)

export const createMeta = (title, description, image, url) => {
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

    if (image) {
        meta.push(
            { hid: 'og:image', property: 'og:image', content: image },
            { hid: 'twitter:image', property: 'twitter:image', content: image })
    }

    return meta
}