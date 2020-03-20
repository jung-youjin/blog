export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  github?: string;
  /**
   * full url, no username
   */
  instagram?: string;
  /**
   * hide or show all email subscribe boxes
   */
  // showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  // mailchimpAction?: string;
  // /**
  //  * this is the hidden input field name
  //  */
  // mailchimpName?: string;
  // /**
  //  * name and id of the mailchimp email field
  //  */
  // mailchimpEmailFieldName?: string;
  // /**
  // /**
  //  * Meta tag for Google Webmaster Tools
  //  */
  googleSiteVerification?: string;
  /**
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;
}

const config: WebsiteConfig = {
  title: 'youjin jung',
  description: 'Hi, welcome to my blog!',
  coverImage: 'img/toystory_cover2.jpg',
  logo: 'img/ghost-logo.png',
  lang: 'en',
  siteUrl: 'https://jung-youjin.com',
  github: 'https://github.com/jung-youjin',
  instagram: 'https://instagram.com/_jungyoujin',
  googleSiteVerification: 'GoogleCode',
  footer: 'All rights reserved - Gatsby Template by scttcper / gatsby-casper',
};

export default config;
