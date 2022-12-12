import { Link } from 'gatsby';
import { setLightness } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../styles/colors';
import { outer, inner } from '../styles/shared';
import config from '../website-config';

const SiteFooter = css`
  position: relative;
  padding-top: 20px;
  padding-bottom: 60px;
  color: #ffb2b2;
  background: #91AFE1;
`;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  a {
    color: rgba(255, 255, 255, 0.85);
  }
  a:hover {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
    font-weight: bold;
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
  background-image: url('./content/img/cover/may-27-2019-galaxy-i-zwicky-18.jpg');
`;

const SiteFooterNav = styled.nav`
  display: flex;

  a {
    position: relative;
    margin-left: 20px;
  }

  a:before {
    content: '';
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }

  a:first-of-type:before {
    display: none;
  }
  @media (max-width: 650px) {
    a:first-child {
      margin-left: 0;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <footer css={[outer, SiteFooter]}>
      <div css={[inner, SiteFooterContent]}>
        <section className="copyright">
          <Link to="/">{config.title}</Link> &copy; {new Date().getFullYear()}{' '}
          {(
            <a href={config.source}>
              | {config.footer}
            </a>
          )}
        </section>
        <SiteFooterNav>
          <Link to="/">Latest Posts</Link>
          {config.github && (
            <a href={config.github} target="_blank" rel="noopener noreferrer">
              Github
            </a>
          )}
          {config.instagram && (
            <a href={config.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          )}

        </SiteFooterNav>
      </div>
    </footer>
  );
};

export default Footer;
