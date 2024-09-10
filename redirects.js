const permalinks = require('./src/utilities/formatPermalink')
const { formatPermalink } = permalinks

module.exports = async () => {
  const internetExplorerRedirect = {
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all IE browsers
      },
    ],
    permanent: false,
    destination: '/ie-incompatible.html',
  }

  const redirectsRes = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/redirects?limit=1000&depth=1`
  )

  const redirectsData = await redirectsRes.json()

  const { docs } = redirectsData

  let dynamicRedirects = []

  if (docs) {
    for (const doc of docs) {
      const { from, to: { type, url, reference } = {} } = doc

      let source = from.replace(process.env.NEXT_PUBLIC_APP_URL, '').split('?')[0].toLowerCase()

      if (source.endsWith('/')) source = source.slice(0, -1) // a trailing slash will break this redirect

      let destination = '/'

      // Handle custom URLs
      if (type === 'custom' && url) {
        destination = url.replace(process.env.NEXT_PUBLIC_APP_URL, '')
      }

      // Handle references to pages or posts
      if (
        type === 'reference' &&
        typeof reference.value === 'object' &&
        reference?.value?._status === 'published'
      ) {
        destination = `${process.env.NEXT_PUBLIC_APP_URL}`

        if (reference.relationTo === 'pages') {
          destination = `${reference.value.fullPath}`
        } else if (reference.relationTo === 'posts') {
          // Fetch category slug for the post
          try {
            const categoryData = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/categories/${reference.value.category[0]}?depth=1`)
            const categoryRes = await categoryData.json()
            destination = `/blog/${categoryRes.slug}/${reference.value.slug}`
          } catch (error) {
            console.error('Error fetching category data:', error)
          }
        }
      }
      console.log(source,destination,'destination**')
      if (source.startsWith('/') && destination && source !== destination) {
        dynamicRedirects.push({
          source,
          destination,
          permanent: true,
        })
      }
    }
  }

  const redirects = [internetExplorerRedirect, ...dynamicRedirects]
  return redirects
}
