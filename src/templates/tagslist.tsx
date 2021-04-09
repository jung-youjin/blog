import { graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  AuthorProfileImage,
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteHeader,
  SiteHeaderContent,
  SiteTitle,
  SiteMain,
  SocialLink,
} from '../styles/shared';
import { PageContext } from './post';
import Github from '../components/icons/github';
import Helmet from 'react-helmet';
import config from '../website-config';
import Website from '../components/icons/website';
import Instagram from '../components/icons/instagram';
import Email from '../components/icons/email';


const HiddenMobile = css`
  @media (max-width: 500px) {
    display: none;
  }
`;

const AuthorMeta = styled.div`
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
  font-family: Georgia, serif;
  font-style: italic;
`;

const AuthorBio = styled.h2`
  z-index: 10;
  flex-shrink: 0;
  margin: 5px 0 10px 0;
  max-width: 600px;
  font-size: 2rem;
  line-height: 1.3em;
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0.9;
  font-family: 'Georgia';
`;

const Bull = styled.span`
  display: inline-block;
  margin: 0 12px;
  opacity: 0.9;
`;

const AuthorProfileBioImage = css`
  z-index: 10;
  flex-shrink: 0;
  margin: 0 0 20px 0;
  width: 100px;
  height: 100px;
  box-shadow: rgba(255, 255, 255, 0.1) 0 0 0 6px;
`;

interface TagslistTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    author: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fluid: any;
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
    authorYaml: {
      id: string;
      website?: string;
      instagram?: string;
      github?: string;
      location?: string;
      // eslint-disable-next-line @typescript-eslint/camelcase
      profile_image?: {
        childImageSharp: {
          fluid: any;
        };
      };
      bio?: string;
      avatar: {
        childImageSharp: {
          fluid: any;
        };
      };
    };
    allTagYaml: {
      edges: Array<{
        node: {
          id: string;
        };
      }>;
    };
    tagYaml: {
      id: string;
    };
  };
}

const TagsList: React.FC<TagslistTemplateProps> = props => {
  const author = props.data.authorYaml;
  const tagslist = props.data.allTagYaml;
  const test = props.data.tagYaml;
  const tagedges = tagslist.edges.filter(
    edge => {
      return edge.node.id;
    }
  );
  const edges = props.data.allMarkdownRemark.edges.filter(
    edge => {
      const isDraft = (edge.node.frontmatter.draft !== true ||
        process.env.NODE_ENV === 'development');
      return isDraft && edge.node.frontmatter.author && edge.node.frontmatter.author.id === author.id;
    }
  );
  const totalCount = edges.length;
  console.log(author);
  console.log(props.data.authorYaml[1]);
  console.log(props.data);
  console.log(props);
  console.log(tagslist.edges);
  console.log(tagedges);
  console.log('hello');
  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {author.id} - {config.title}
        </title>
        <meta name="description" content={author.bio} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${author.id} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        <meta property="article:publisher" content="https://www.github.com/ghost" />
        <meta property="article:author" content="https://www.github.com/ghost" />
        <meta name="instagram:card" content="summary" />
        <meta name="instagram:title" content={`${author.id} - ${config.title}`} />
        <meta name="instagram:url" content={config.siteUrl + props.pathContext.slug} />
        {config.instagram && (
          <meta
            name="instagram:site"
            content={`@${config.instagram.split('https://instagram.com/')[1]}`}
          />
        )}
        {config.instagram && (
          <meta
            name="instagram:creator"
            content={`@${config.instagram.split('https://instagram.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper>
        <header
          className="no-cover"
          css={[outer, SiteHeader]}
          style={{
            // eslint-disable-next-line @typescript-eslint/camelcase
            backgroundImage: author.profile_image ?
              `url(${author.profile_image.childImageSharp.fluid.src})` :
              '',
          }}
        >
          <div css={inner}>
            <SiteNav isHome={false} />
            <SiteHeaderContent>
              <img
                css={[AuthorProfileImage, AuthorProfileBioImage]}
                src={props.data.authorYaml.avatar.childImageSharp.fluid.src}
                alt={author.id}
              />
              <SiteTitle>{author.id}</SiteTitle>
              {author.bio && <AuthorBio>{author.bio}</AuthorBio>}
              <AuthorMeta>
                {author.location && (
                  <div css={HiddenMobile}>
                    {author.location} <Bull>&bull;</Bull>
                  </div>
                )}
                <div css={HiddenMobile}>
                  {totalCount > 1 && `${totalCount} posts`}
                  {totalCount === 1 && '1 post'}
                  {totalCount === 0 && 'No posts'} <Bull>•</Bull>
                </div>
                {author.instagram && (
                  <a
                    className="social-link-tw"
                    css={SocialLink}
                    href={`https://instagram.com/${author.instagram}`}
                    title="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram />
                  </a>
                )}
                {author.github && (
                  <a
                    className="social-link-fb"
                    css={SocialLink}
                    href={`https://www.github.com/${author.github}`}
                    title="Github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github />
                  </a>
                )}
                {author.email && (
                  <a
                    className="social-link-email"
                    css={SocialLink}
                    href={`mailto:${author.email}`}
                    title="Email"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Email />
                  </a>
                )}


                <ol>{test.id}</ol>


                {/* TODO: RSS for author */}
                {/* <a
                  css={SocialLink} className="social-link-rss"
                  href="https://feedly.com/i/subscription/feed/https://demo.ghost.io/author/ghost/rss/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ height: '1.9rem' }}
                  >
                    <circle cx="6.18" cy="17.82" r="2.18" />
                    <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
                  </svg>
                </a> */}
              </AuthorMeta>
            </SiteHeaderContent>
          </div>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
              {edges.map(({ node }) => {
                return <PostCard key={node.fields.slug} post={node} />;
              })}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default TagsList;

export const pageQuery = graphql`
  query($author: String) {
    authorYaml(id: { eq: $author }) {
      id
      website
      instagram
      bio
      github
      location
      email
      profile_image {
        childImageSharp {
          fluid(maxWidth: 3720) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      avatar {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allTagYaml {
      edges{
        node {
          id
        }
      }
    }
    tagYaml {
      id
    }
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } },
      sort: { fields: [frontmatter___date], order: DESC },
      limit: 2000,
    ) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            draft
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(quality: 90) {
                      src
                    }
                  }
                }
              }
            }
          }
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
