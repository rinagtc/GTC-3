import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import LeftIcon from '../img/left-icon.svg'
import RightIcon from '../img/right-icon.svg'
import Layout from "../components/layout"
import Seo from "../components/seo"

const WorkSubPage = (props) => {
  const { pageContext, data, location } = props

  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social

  const nextSlug = pageContext?.next
    ? pageContext.next.fields.slug.split('/').slice(2, -1).join('/') === ''
      ? '/'
      : `/${pageContext.next.fields.slug.split('/').slice(2, -1).join('/')}`
    : '/'

  const previousSlug = pageContext?.previous
    ? pageContext.previous.fields.slug.split('/').slice(2, -1).join('/') === ''
      ? '/'
      : `/${pageContext.previous.fields.slug.split('/').slice(2, -1).join('/')}`
    : '/'

  const nextLinkStatus =
    pageContext?.next?.frontmatter?.templateKey === 'work-sub-page'
  const previousLinkStatus =
    pageContext?.previous?.frontmatter?.templateKey === 'work-sub-page'

  const image = getImage(post.frontmatter.thumbnail)

  return (
    <Layout location={location} title={siteTitle} social={social}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image?.images?.fallback?.src}
      />

      <article
        className={`post-content ${image ? "with-image" : "no-image"}`}
      >
        <header className="post-content-header">
          <h1 className="post-content-title">{post.frontmatter.title}</h1>
        </header>

        {post.frontmatter.description && (
          <p className="post-content-excerpt">{post.frontmatter.description}</p>
        )}

        {image && (
          <div className="post-content-image">
            <GatsbyImage
              image={image}
              alt={post.frontmatter.title}
              className="kg-image"
            />
          </div>
        )}

        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="post-link">
          <div>
            <a
              style={{
                display: nextLinkStatus ? "flex" : "none",
                alignItems: "center",
                color: "#131313",
                fontSize: "2rem",
              }}
              href={nextSlug}
            >
              <img src={LeftIcon} alt="Next" width={30} height={30} />
              <span>{pageContext.next?.frontmatter.title || ""}</span>
            </a>
          </div>

          <div>
            <a
              style={{
                display: previousLinkStatus ? "flex" : "none",
                alignItems: "center",
                color: "#131313",
                fontSize: "2rem",
              }}
              href={previousSlug}
            >
              <span>{pageContext.previous?.frontmatter.title || ""}</span>
              <img src={RightIcon} alt="Previous" width={30} height={30} />
            </a>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default WorkSubPage

export const pageQuery = graphql`
  query WorkSubPageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        social {
          twitter
          facebook
        }
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
