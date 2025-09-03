import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import LeftIcon from "../img/left-icon.svg"
import RightIcon from "../img/right-icon.svg"

const BlogPostTemplate = (props) => {
  const { pageContext, data, location } = props

  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social

  const next = pageContext.next
  const previous = pageContext.previous

  const nextSlug = next
    ? next.fields.slug.split("/").slice(2, -1).join("/") === ""
      ? "/"
      : `/${next.fields.slug.split("/").slice(2, -1).join("/")}`
    : "/"

  const previousSlug = previous
    ? previous.fields.slug.split("/").slice(2, -1).join("/") === ""
      ? "/"
      : `/${previous.fields.slug.split("/").slice(2, -1).join("/")}`
    : "/"

  const nextLinkStatus = next?.frontmatter.templateKey === "exhibitions-sub-page"
  const previousLinkStatus = previous?.frontmatter.templateKey === "exhibitions-sub-page"

  const image = getImage(post.frontmatter.thumbnail)

  return (
    <Layout location={location} title={siteTitle} social={social}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={
          post.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData?.images
            ?.fallback?.src || ""
        }
      />

      <article className={`post-content ${image ? "with-image" : "no-image"}`}>
        <header className="post-content-header">
          <h1 className="post-content-title">{post.frontmatter.title}</h1>
        </header>

        {post.frontmatter.description && (
          <p className="post-content-excerpt">{post.frontmatter.description}</p>
        )}

        {image && (
          <GatsbyImage
            image={image}
            className="kg-image"
            alt={post.frontmatter.title}
          />
        )}

        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div
          className="post-link"
          style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}
        >
          <div>
            <a
              style={{
                display: nextLinkStatus ? "flex" : "none",
                alignItems: "center",
                color: "#131313",
                fontSize: "1.5rem",
              }}
              href={nextSlug}
            >
              <img src={LeftIcon} alt="Next" width={30} height={30} />
              <span>{next?.frontmatter.title || ""}</span>
            </a>
          </div>

          <div>
            <a
              style={{
                display: previousLinkStatus ? "flex" : "none",
                alignItems: "center",
                color: "#131313",
                fontSize: "1.5rem",
              }}
              href={previousSlug}
            >
              <span>{previous?.frontmatter.title || ""}</span>
              <img src={RightIcon} alt="Previous" width={30} height={30} />
            </a>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
