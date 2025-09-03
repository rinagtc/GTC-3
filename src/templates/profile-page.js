import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ProfilePage = ({ data, location }) => {
  const { markdownRemark: post, site } = data
  const { title, description, thumbnail } = post.frontmatter
  const image = getImage(thumbnail)

  return (
    <Layout location={location} title={site.siteMetadata.title} social={site.siteMetadata.social}>
      <Seo
        title={title}
        description={description}
        image={image?.images?.fallback?.src}
        keywords={["Artikel", "Guest Teacher", "AretaNet Indonesia"]}
      />

      <article className={`post-content ${image ? "with-image" : "no-image"}`}>
        <header className="post-content-header">
          <h1 className="post-content-title">{title}</h1>
        </header>

        {description && (
          <p className="post-content-excerpt">{description}</p>
        )}

        {image && (
          <div className="post-content-image">
            <GatsbyImage image={image} alt={title} className="kg-image" />
          </div>
        )}

        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="post-content-footer"></footer>
      </article>
    </Layout>
  )
}

ProfilePage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default ProfilePage

export const query = graphql`
  query ProfilePage {
    site {
      siteMetadata {
        title
        social {
          twitter
          facebook
        }
      }
    }

    markdownRemark(frontmatter: { templateKey: { eq: "artikel-page" } }) {
      html
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
  }
`
