import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import { setLightness } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Helmet } from 'react-helmet';
import { DiscussionEmbed } from "disqus-react";

import AuthorCard from '../components/AuthorCard';
import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import PostContent from '../components/PostContent';
import PostFullFooter from '../components/PostFullFooter';
import PostFullFooterRight from '../components/PostFullFooterRight';
import ReadNextCard from '../components/ReadNextCard';
import Subscribe from '../components/subscribe/Subscribe';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteHeader, SiteMain } from '../styles/shared';
import config from '../website-config';

import { Container, Button, Link as BLink } from 'react-floating-action-button';
import { window, document, exists } from 'browser-monads';
import NoSSR from 'react-no-ssr';
//
// import Loadable from '@loadable/component';
// const Container = Loadable(() => import('react-floating-action-button'));
// export default () => ( <Container /> )

// import { Container, Link, Button, darkColors, lightColors } from './fab-dev/src/FAB/FloatingActionButton.jsx'

// import instagram from './icon/instagram.svg';

// const Container, Button, Link as ButtonLink = (() => {
//   if (typeof window !== 'undefined') {
//     return require('react-floating-action-button')
//   }
// })()


const PostTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
    font-family: Georgia;
  }
  .Disqus {
    padding-top: 10vw;
    padding-bottom: 7vw;
  }
  .mbcontainer {
    z-index: 50;
    position: absolute;
  }
  .fab-container {
    position: absoulte;
    z-index: 70;
  }
`;


export const PostFull = css`
  position: relative;
  z-index: 50;

`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PostFullHeader = styled.header`
  margin: 0 auto;
  padding: 6vw 3vw 3vw;
  max-width: 1040px;
  text-align: center;


  @media (max-width: 500px) {
    padding: 14vw 3vw 10vw;
  }
`;

const PostFullMeta = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.midgrey};
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;


  @media (max-width: 500px) {
    font-size: 1.2rem;
    line-height: 1.3em;

  }
`;

const PostFullMetaDate = styled.time`
  color: ${colors.skyblue};
  font-size:1.5rem;
`;

export const PostFullTitle = styled.h1`
  margin: 10px 0 0 0;
  color: ${setLightness('0.05', colors.darkgrey)};
  @media (max-width: 500px) {
    font-size: 2.9rem;
  }
`;

const PostFullImage = styled.figure`
  margin: 0 -10vw -165px;
  height: 800px;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;

  @media (max-width: 1170px) {
    margin: 0 -4vw -100px;
    height: 600px;
    border-radius: 0;
  }

  @media (max-width: 800px) {
    height: 400px;
  }
  @media (max-width: 500px) {
    height: 350px;
  }
`;

const DateDivider = styled.span`
  display: inline-block;
  margin: 0 6px 1px;
`;

const ReadNextFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 40px 0 0 0;
`;

interface PageTemplateProps {
  pathContext: {
    slug: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    markdownRemark: {
      html: string;
      htmlAst: any;
      excerpt: string;
      timeToRead: string;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        image: {
          childImageSharp: {
            fluid: any;
          };
        };
        tags: string[];
        author: {
          id: string;
          bio: string;
          avatar: {
            children: Array<{
              fixed: {
                src: string;
              };
            }>;
          };
        };
      };
    };
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image: {
      childImageSharp: {
        fluid: any;
      };
    };
    title: string;
    date: string;
    draft?: boolean;
    tags: string[];
    author: {
      id: string;
      bio: string;
      avatar: {
        children: Array<{
          fixed: {
            src: string;
          };
        }>;
      };
    };
  };
}

// class Container extends React.Component {
//   constructor () {
//     super();
//     this.state = { showMap: false };
//   }
//   componentDidMount () {
//     mapLib = require('react-floating-action-button');
//     this.setState({ showMap: true });
//   }
// }

const PageTemplate: React.FC<PageTemplateProps> = props => {
  const isBrowser = typeof window !== 'undefined';
  // componentDidMount() {
  //   console.log("componentdidmount");
  //   Container.init();
  //   Button.init();
  //   BLink.init();
  // }
  const post = props.data.markdownRemark;
  let width = '';
  let height = '';
  if (post.frontmatter.image && post.frontmatter.image.childImageSharp) {
    width = post.frontmatter.image.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
    height = String(Number(width) / post.frontmatter.image.childImageSharp.fluid.aspectRatio);
  }
  // disqus configuration
  const disqusShortName = 'youjinjung'
  const disqusConfig = {
      identifier: post.frontmatter.id, // you can define anything as "identifier" for each blog post
      title: post.frontmatter.title,
      url: config.siteUrl + props.pathContext.slug,
  }

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang={config.lang} />
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <script src='https://kit.fontawesome.com/a076d05399.js'></script>
        <title>{post.frontmatter.title}</title>

        <meta name="description" content={post.excerpt} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        {(post.frontmatter.image && post.frontmatter.image.childImageSharp) && (
          <meta property="og:image" content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`} />
        )}
        <meta property="article:published_time" content={post.frontmatter.date} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.frontmatter.tags && (
          <meta property="article:tag" content={post.frontmatter.tags[0]} />
        )}

        {config.github && <meta property="article:publisher" content={config.github} />}
        {config.github && <meta property="article:author" content={config.github} />}
        <meta name="instagram:card" content="summary_large_image" />
        <meta name="instagram:title" content={post.frontmatter.title} />
        <meta name="instagram:description" content={post.excerpt} />
        <meta name="instagram:url" content={config.siteUrl + props.pathContext.slug} />
        {(post.frontmatter.image && post.frontmatter.image.childImageSharp) && (
          <meta name="instagram:image" content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`} />
        )}
        <meta name="instagram:label1" content="Written by" />
        <meta name="instagram:data1" content={post.frontmatter.author.id} />
        <meta name="instagram:label2" content="Filed under" />
        {post.frontmatter.tags && <meta name="instagram:data2" content={post.frontmatter.tags[0]} />}
        {config.instagram && <meta name="instagram:site" content={`@${config.instagram.split('https://instagram.com/')[1]}`} />}
        {config.instagram && <meta
          name="instagram:creator"
          content={`@${config.instagram.split('https://instagram.com/')[1]}`}
        />}
        {width && <meta property="og:image:width" content={width} />}
        {height && <meta property="og:image:height" content={height} />}
      </Helmet>
      <Wrapper css={PostTemplate}>
        <header css={[outer, SiteHeader]}>
          <div css={inner}>
            <SiteNav />
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div id="mbcontainer">
            <NoSSR>
            <Container>
               <BLink href="/tags/diary"
                   tooltip="Tags"
                   icon="fas fa-book-open fa-lg"
                   className="fab-item btn btn-link btn-lg text-white"
                   styles={{backgroundColor: '#ffb2b2', color: '#ffffff'}}
                   />
               <BLink href="https://github.com/jung-youjin"
                   tooltip="Github"
                   icon="fab fa-github fa-lg"
                   className="fab-item btn btn-link btn-lg text-white"
                   styles={{backgroundColor: '#ffb2b2', color: '#ffffff'}}
                   />
               <BLink href="https://instagram.com/_jungyoujin"
                   tooltip="Instagram"
                   icon="fab fa-instagram fa-lg"
                   className="fab-item btn btn-link btn-lg text-white"
                   styles={{backgroundColor: '#ffb2b2', color: '#ffffff'}}
                   />
               <BLink href="/about"
                   tooltip="About"
                   icon="fas fa-user fa-lg"
                   styles={{backgroundColor: '#ffb2b2', color: '#ffffff'}}
                   />
               <BLink href="/"
                   tooltip="Home"
                   icon="fas fa-home fa-lg"
                   className="fab-item btn btn-link btn-lg text-white"
                   styles={{backgroundColor: '#ffb2b2', color: '#ffffff'}}
                   />
               <Button
                   tooltip="Menu"
                   icon="fas fa-plus fa-2x"
                   rotate={true}
                   href="/"
                   styles={{backgroundColor: '#91AFE1', color: '#ffffff'}}
                   // onClick={() => alert('FAB Rocks!')}
                   // #eb8c86
                   />
             </Container>
             </NoSSR>
            </div>
          <div css={inner}>
            {/* TODO: no-image css tag? */}
            <article css={[PostFull, !post.frontmatter.image && NoImage]}>
              <PostFullHeader>
                <PostFullMeta>
                  <PostFullMetaDate dateTime={post.frontmatter.date}>
                    {post.frontmatter.userDate}
                  </PostFullMetaDate>
                  {post.frontmatter.tags &&
                    post.frontmatter.tags.length > 0 && (
                      <>
                        <DateDivider>/</DateDivider>
                        <Link to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>
                          {post.frontmatter.tags[0]}
                        </Link>
                      </>
                  )}
                </PostFullMeta>
                <PostFullTitle>{post.frontmatter.title}</PostFullTitle>
              </PostFullHeader>

              {(post.frontmatter.image && post.frontmatter.image.childImageSharp) && (
                <PostFullImage>
                  <Img
                    style={{ height: '100%' }}
                    fluid={post.frontmatter.image.childImageSharp.fluid}
                  />
                </PostFullImage>
              )}
              <div id = "whitepost">
              <PostContent htmlAst={post.htmlAst} />

              {/* The big email subscribe modal content */}
              {config.showSubscribe && <Subscribe title={config.title} />}

              <PostFullFooter>
                <AuthorCard author={post.frontmatter.author} />
                <PostFullFooterRight authorId={post.frontmatter.author.id} />
              </PostFullFooter>
              <hr/>
              <div id="Disqus">
                <DiscussionEmbed shortname={disqusShortName} config={disqusConfig} />
              </div>
              </div>
            </article>
          </div>

        </main>

        {/* Links to Previous/Next posts */}
        <aside className="read-next" css={outer}>
          <div css={inner}>
            <ReadNextFeed>
              {props.data.relatedPosts && (
                <ReadNextCard tags={post.frontmatter.tags} relatedPosts={props.data.relatedPosts} />
              )}

              {props.pageContext.prev && <PostCard post={props.pageContext.prev} />}
              {props.pageContext.next && <PostCard post={props.pageContext.next} />}
            </ReadNextFeed>
          </div>
        </aside>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default PageTemplate;

export const query = graphql`
  query($slug: String, $primaryTag: String) {
    logo: file(relativePath: { eq: "img/youjin_logo.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      timeToRead
      fields{
        slug
      }
      frontmatter {
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        tags
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
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } } }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
