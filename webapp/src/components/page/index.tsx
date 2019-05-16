import React from 'react'
import { Layout } from 'antd'


import { Nav } from 'components'

const { Footer } = Layout

interface State {}

export default class Page extends React.Component<Object, State> {
  render () {
    const { children } = this.props
    return (
    <Layout className='layout'>
      <Nav />
      {children}
      <Footer style={{ textAlign: 'center', paddingBottom: 50 }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
    </Layout>
    )
  }
}