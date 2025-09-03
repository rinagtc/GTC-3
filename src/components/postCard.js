import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default props => {
  const { node, count, postClass } = props
  const thumbnail = node.frontmatter.thumbnail
  const image = getImage(thumbnail)

  return (
    <article
      className={`post-card ${count % 3 === 0 ? `post-card-large` : ``} ${
        postClass
      } ${image ? `with-image` : `no-image`}`}
    >
      <Link
        to={
          node.fields.slug.split("/").slice(2, -1).join("/") === ""
            ? "/"
            : `/${node.fields.slug.split("/").slice(2, -1).join("/")}`
        }
        className="post-card-link"
      >
        {image && (
          <GatsbyImage
            image={image}
            alt={node.frontmatter.title}
            className="post-card-image"
          />
        )}
        <div className="post-card-content">
          <h2 className="post-card-title">{node.frontmatter.title}</h2>
        </div>
      </Link>
    </article>
  )
}
