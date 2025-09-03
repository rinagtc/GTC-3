import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { navigate } from "gatsby-link"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const ContactPage = ({ data }, location) => {
  const [state, setState] = React.useState({})
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error))
  }

  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  const frontmatter = data.markdownRemark.frontmatter
  const image = getImage(frontmatter.thumbnail)

  return (
    <Layout title={siteTitle} social={social}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description}
        image={
          frontmatter.thumbnail?.childImageSharp?.gatsbyImageData?.images
            ?.fallback?.src || ""
        }
      />

      <article className="contact-form page-template">
        {image && (
          <div className="post-content-image">
            <GatsbyImage
              image={image}
              className="kg-image"
              alt={frontmatter.title}
            />
          </div>
        )}

        <div className="post-content-body">
          <h3 id="forms">
            <b>Form</b>
          </h3>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            action="thanks"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={handleChange} />
              </label>
            </p>

            <div className="row gtr-uniform">
              <div className="col-6 col-12-xsmall">
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="col-6 col-12-xsmall">
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="col-6 col-12-xsmall">
                <input
                  type="email"
                  name="email"
                  id="demo-email"
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-6 col-12-xsmall">
                <input
                  type="text"
                  name="location"
                  id="location"
                  onChange={handleChange}
                  placeholder="Location"
                  required
                />
              </div>

              <div className="col-12">
                <select
                  name="category"
                  id="category"
                  onChange={handleChange}
                  required
                >
                  <option value>-Materials-</option>
                  <option value="Linux Fundamental">Linux Fundamental</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Google Workspace">Google Workspace</option>
                  <option value="Bisnis Digital">Bisnis Digital</option>
                  <option value="Mikrotik Fundamental">
                    Mikrotik Fundamental
                  </option>
                </select>
              </div>

              <div className="col-12">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Enter your message"
                  rows={6}
                  onChange={handleChange}
                  required
                />
              </div>

              <div data-netlify-recaptcha="true"></div>

              <div className="col-12">
                <ul className="actions">
                  <li>
                    <input
                      type="submit"
                      value="Send Message"
                      className="primary"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          twitter
          facebook
        }
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "contact-page" } }) {
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

export default (props) => (
  <StaticQuery
    query={indexQuery}
    render={(data) => (
      <ContactPage location={props.location} data={data} {...props} />
    )}
  />
)
