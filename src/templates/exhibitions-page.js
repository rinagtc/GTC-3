import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/postCard"

const WorkPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  const posts = data.allMarkdownRemark.edges
  const pageData = data.markdownRemark.frontmatter
  const pageImage = getImage(pageData.thumbnail)

  let postCounter = 0

  return (
    <Layout title={siteTitle} social={social}>
      <Seo
        keywords={[
          `Gatsby Theme`,
          `Free Gatsby Template`,
          `Clay Gatsby Theme`,
        ]}
        title={pageData.title}
        description={pageData.description || ""}
        image={
          pageData.thumbnail?.childImageSharp?.gatsbyImageData?.images
            ?.fallback?.src
        }
      />

      {pageImage && (
        <GatsbyImage
          image={pageImage}
          alt={pageData.title}
          className="kg-image"
          style={{ maxWidth: "100%", marginBottom: "2rem", borderRadius: "8px" }}
        />
      )}

      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site.siteMetadata.description}
          </h2>
        </header>
      )}

      <div className="post-feed card-con">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass="post"
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default WorkPage

export const WorkPageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        author
        social {
          twitter
          facebook
        }
        description
      }
    }

    markdownRemark(frontmatter: { templateKey: { eq: "exhibitions-sub-page" } }) {
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
      filter: { frontmatter: { templateKey: { eq: "exhibitions-sub-page" } } }
      limit: 30
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD:MM:YYYY hh:mm a")
            title
            description
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 600, quality: 90, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`
