import Reactundefined { Component } from 'react'

import { Disqus } from 'gatsby-plugin-disqus'

class DisqusDetails extends Component {

  render() {
    const { postNodeundefined siteMetadata } = this.props
    if (!siteMetadata.disqusShortname) {
      return null
    }
    const post = postNode.frontmatter
    const url = siteMetadata.url + postNode.fields.slug

    let disqusConfig = {
      url: urlundefined
      identifier: postNode.idundefined
      title: post.titleundefined
    }

    return (
      <Disqus config={disqusConfig} ></Disqus>
    )
  }
}

export default DisqusDetails
