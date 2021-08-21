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

import portfolio_pdf1 from '../content/portfolio_pdf/0001.jpg';
import portfolio_pdf2 from '../content/portfolio_pdf/0002.jpg';
import portfolio_pdf3 from '../content/portfolio_pdf/0003.jpg';
import portfolio_pdf4 from '../content/portfolio_pdf/0004.jpg';

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
            <PostFullTitle>Hello there! I'm YouJin <img src="https://raw.githubusercontent.com/TheDudeThatCode/TheDudeThatCode/master/Assets/Hi.gif" width="10%" /> </PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <meta charset="UTF-8"/>
            <div className="post-content">

              <br/>

              <div className="portfolio">
                {/*
                <img src = {portfolio_pdf1}/>
                <img src = {portfolio_pdf2}/>
                <img src = {portfolio_pdf3}/>
                <img src = {portfolio_pdf4}/>
                */}
              </div>


              <p>
                <img src ="https://user-images.githubusercontent.com/37402072/124953068-c493f080-e04f-11eb-99fb-33366bb093d9.png" width="50%"/>
              </p>

              <h4> 🙆🏼‍♀️ About ME  </h4>

              <br/>

              <p> - 🙎‍♀️ Pronouns: She | Her </p>
              <p> - 🔭 I’m currently a final year Electronic & Electrical Engineering student with Computer Science Engineering minor @ Ewha Womans University 🌸 </p>
              <p> - 🌱 I’m passionate in efficient software developments 👩‍💻 on embedded systems with my hardware major background on circuit designs. 🎛 I'm also developing interests in DevOps with ML applications lately! ⚡ </p>
              <p> - 💡 I love to create, develop and communicate. Communities are what makes me endlessly motivated. Feel free to reach me! 😘 </p>
              <p> - 🌼 I'm also developing my skills in tech-leadership, making presentations, writing journals, creative design creations </p>

              <h4> 📫 Contacts </h4>
              <div>
                 <span>
                   <a href="mailto:jungyoujin0527@gmail.com?"/><img src="https://img.shields.io/badge/Gmail-EA4335?style=flat-square&logo=Gmail&logoColor=white&link=(mailto:jungyoujin0527@gmail.com?subject=Hi%YouJin,%reaching%out%to%you%from%Github!)"/>
                   <a href="https://www.linkedin.com/in/youjinjung/"/><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=LinkedIn&logoColor=white&link=https://www.linkedin.com/in/youjinjung/"/>
                   <a href="https://www.instagram.com/_jungyoujin/"/><img src="https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/_jungyoujin/"/>
                   <a href="https://www.facebook.com/jungyoujin0527"/><img src="https://img.shields.io/badge/-Facebook-1877f2?style=flat-square&logo=facebook&logoColor=white&link=https://www.facebook.com/jungyoujin0527"/>
                </span>
              </div>

              <br/>
              <p>
                <img src ="https://resources.altium.com/sites/default/files/inline-images/Creating-a-Ground-Plane-for-Your-PCB-Design-animation-C.gif" width="50%" />
              </p>

              <h5> youjin's blog - since 2020.03.20 ~ing </h5>

              <br/>

            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
