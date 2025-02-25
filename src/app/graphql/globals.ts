import { LINK_FIELDS } from './link'

export const GLOBALS = `
  query {
    Header {
      navItems {
        link ${LINK_FIELDS({ disableAppearance: true })}
      }
    }

    Footer {
      navItems {
        link ${LINK_FIELDS({ disableAppearance: true })}
      }
    }
  }
`
export const HEADER = `
  Header {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`

export const HEADER_QUERY = `
query Header {
  ${HEADER}
}
`
export const FOOTER = `
  Footer {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`

export const FOOTER_QUERY = `
query Footer {
  ${FOOTER}
}
`