import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';

import portfolio_pdf1 from '../content/portfolio_pdf/portfolio_pdf1024_1.jpg';
import portfolio_pdf2 from '../content/portfolio_pdf/portfolio_pdf1024_2.jpg';
import portfolio_pdf3 from '../content/portfolio_pdf/portfolio_pdf1024_3.jpg';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
    font-family: Consolas;
  }
  h3, p {
    font-family: Consolas;
  }

`;

const About_title = css`
  title {
    font-family: Consolas;
  }
`;


const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title css={About_title}>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>
          <SiteNav />
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <article className="post page" css={[PostFull, NoImage]}>
          <PostFullHeader>
            <PostFullTitle>About</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">

              <h3>YouJin Jung's Portfolio</h3>

              <small><p> Welcome to my blog! This is my portfolio section. This section has been <b>temporarily archived</b> due to update progress! Further contents to be updated...! Stay tuned! </p></small>
              <small><p>현재 재정비 및 공사중!! &U+2692; </p></small>
              <div className="portfolio">

                // <!--img src = {portfolio_pdf1}/-->
                // <!--img src = {portfolio_pdf2}/-->
                // <!--img src = {portfolio_pdf3}/-->

              </div>

              <h5> youjin's blog - since 2020.03.20 ~ing </h5>


            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
