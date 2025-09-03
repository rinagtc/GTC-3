import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/postCard"

const IndexPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  const posts = data.allMarkdownRemark.edges
  const frontmatter = data.markdownRemark.frontmatter

  // Ambil SEO image dari gatsbyImageData fallback
  const seoImage =
    frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData?.images?.fallback
      ?.src || ""

  let postCounter = 0

  return (
    <Layout title={siteTitle} social={social}>
      <Seo
        keywords={[`Gatsby Theme`, `Free Gatsby Template`, `Clay Gatsby Theme`]}
        title={frontmatter.title}
        description={frontmatter.description || ""}
        image={seoImage}
      />
      <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage

export const IndexPageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        social {
          twitter
          facebook
        }
      }
    }

    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 1200, quality: 90, placeholder: BLURRED)
          }
        }
      }
    }

    allMarkdownRemark(
      filter: { frontmatter: { pagetype: { eq: "main" } } }
      limit: 30
      sort: { frontmatter: { number: ASC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 600, quality: 80, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`
