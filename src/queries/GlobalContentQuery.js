import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Language from '@input-output-hk/front-end-core-components/components/Language'

const GlobalContentQuery = ({ render }) => (
  <Language.Consumer>
    {({ key: lang }) => (
      <StaticQuery
        query={graphql`
          query {
            allFile(filter:{relativePath:{glob:"content/global/*.md"}}) {
              nodes{
                relativePath,
                childMarkdownRemark{
                  frontmatter {
                    content {
                      main_title
                      main_title_aria_label
                      select_language
                      select_theme
                      last_updated
                      report_an_issue
                      search
                      search_form_aria_label
                      search_form_submit_aria_label
                      open_search_bar
                      close_search_bar
                      main_navigation_label
                      close_main_navigation
                      open_main_navigation
                      logo_alt
                      kevm_description
                      iele_description
                    }
                  }
                }
              }
            }

            iohkMainNavigationLinks {
              mainNavigationLinks {
                lang
                items {
                  label
                  path
                }
              }
            }
          }
        `}
        render={({ allFile, iohkMainNavigationLinks }) => {
          const content = allFile.nodes.filter(node => node.relativePath === `content/global/global-${lang}.md`).shift()
          if (!content || !content.childMarkdownRemark) throw new Error(`No global translations found for language ${lang}`)

          const items = (iohkMainNavigationLinks.mainNavigationLinks.filter((itemSet) => itemSet.lang === lang).shift() || {}).items
          if (!items) throw new Error(`No header links for language ${lang}`)

          return render(content.childMarkdownRemark.frontmatter.content, items)
        }}
      />
    )}
  </Language.Consumer>
)

GlobalContentQuery.propTypes = {
  render: PropTypes.func.isRequired
}

export default GlobalContentQuery