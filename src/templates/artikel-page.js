import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import PostCard from "../components/postCard";

const WorkPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const siteDescription = data.site.siteMetadata.description;
  const social = data.site.siteMetadata.social;
  const posts = data.allMarkdownRemark.edges;
  const pageData = data.markdownRemark.frontmatter;

  // ✅ ganti ke gatsbyImageData, nggak pakai fluid lagi
  const seoImage =
    pageData.thumbnail?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || "";

  let postCounter = 0;

  return (
    <Layout title={siteTitle} social={social}>
      <Seo
        keywords={["Gatsby Theme", "Free Gatsby Template", "Clay Gatsby Theme"]}
        title={pageData.title}
        description={pageData.description || ""}
        image={seoImage}
      />

      {siteDescription && (
        <header className="page-head">
          <h2 className="page-head-title">{siteDescription}</h2>
        </header>
      )}

      <div className="post-feed card-con">
        {posts.map(({ node }) => {
          postCounter++;
          return (
            <PostCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass="post"
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default WorkPage;

export const WorkPageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        description
        author
        social {
          twitter
          facebook
        }
      }
    }

    markdownRemark(frontmatter: { templateKey: { eq: "artikel-page" } }) {
      frontmatter {
        title
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

    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "artikel-sub-page" } } }
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
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  width: 600
                  quality: 90
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
  }
`;
