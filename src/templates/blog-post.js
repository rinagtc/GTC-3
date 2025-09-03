import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import LeftIcon from "../img/left-icon.svg"
import RightIcon from "../img/right-icon.svg"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = (props) => {
  const { pageContext, location, data } = props
  const post = data?.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social

  // Cek jika post tidak ditemukan
  if (!post || !post.frontmatter) {
    return (
      <Layout location={location} title={siteTitle} social={social}>
        <div style={{ color: "red", textAlign: "center", padding: "50px" }}>
          <h1>404 - Artikel tidak ditemukan</h1>
          <p>Pastikan slug valid dan frontmatter di markdown lengkap.</p>
        </div>
      </Layout>
    )
  }

  // Link navigasi next & previous
  const nextSlug = pageContext.next
    ? pageContext.next.fields.slug.split("/").slice(2, -1).join("/") === ""
      ? "/"
      : `/${pageContext.next.fields.slug.split("/").slice(2, -1).join("/")}`
    : "/"

  const previousSlug = pageContext.previous
    ? pageContext.previous.fields.slug.split("/").slice(2, -1).join("/") === ""
      ? "/"
      : `/${pageContext.previous.fields.slug.split("/").slice(2, -1).join("/")}`
    : "/"

  const nextLinkStatus =
    pageContext.next?.frontmatter.templateKey === "blog-post"

  const previousLinkStatus =
    pageContext.previous?.frontmatter.templateKey === "blog-post"

  // Ambil thumbnail sebagai GatsbyImageData
  const imageData = getImage(post.frontmatter.thumbnail)

  return (
    <Layout location={location} title={siteTitle} social={social}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={
          post.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData?.images
            ?.fallback?.src
        }
      />

      <article
        className={`post-content ${
          post.frontmatter?.thumbnail ? "has-image" : "no-image"
        }`}
      >
        <header className="post-content-header">
          <h1 className="post-content-title">{post.frontmatter.title}</h1>
        </header>

        {post.frontmatter.description && (
          <p className="post-content-excerpt">
            {post.frontmatter.description}
          </p>
        )}

        {imageData && (
          <div className="post-content-image">
            <GatsbyImage
              image={imageData}
              className="kg-image"
              alt={post.frontmatter.title}
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
              <img src={LeftIcon} alt="" width={30} height={30} />
              <span>
                {pageContext.next ? pageContext.next.frontmatter.title : ""}
              </span>
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
              <span>
                {pageContext.previous
                  ? pageContext.previous.frontmatter.title
                  : ""}
              </span>
              <img src={RightIcon} alt="" width={30} height={30} />
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
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              quality: 90
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`
