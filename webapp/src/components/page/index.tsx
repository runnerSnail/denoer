import React from 'react'
import { Layout } from 'antd'

import { Nav } from 'components'

const { Footer } = Layout

interface State {}

export default class Page extends React.Component<Object, State> {
  constructor (props: any) {
    super(props)
  }
  render () {
    const { children } = this.props
    return (
    <Layout style={{ paddingTop: 64 }}>
      <Nav {...this.props} />
      {children}
      <Footer style={{ textAlign: 'center', paddingBottom: 50 }}>
          {`Denoer ©2019 Created by runSnail & OnlyFlyer`}
        </Footer>
    </Layout>
    )
  }
}