import React from 'react'
import { Layout } from 'antd'

import { Nav } from 'components'

const { Footer } = Layout


export default class Page extends React.Component {
  render () {
    const { children } = this.props
    return (
    <Layout style={{ paddingTop: 64 }}>
      <Nav {...this.props} />
      {children}
      <Footer style={{ textAlign: 'center', paddingBottom: 50 }}>
          {`Denoer ©2019 Created By runSnail & OnlyFlyer`}
        </Footer>
    </Layout>
    )
  }
}