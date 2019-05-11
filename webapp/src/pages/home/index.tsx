import React from 'react'
import Layout from 'antd/lib/layout'
import Breadcrumb from 'antd/lib/breadcrumb'


import { request } from 'utils'
import { Nav } from 'components'

const { Content, Footer, Sider } = Layout
export default class Home extends React.Component {
  async componentDidMount () {
    const res = await request('testapiServer', { aa: 'aa' }, { opt: 'opt' })
    console.log('res:', res)

  }
  render () {
    console.log('request:', request)
    return (
      <Layout className='layout'>
        <Nav />
        <Layout style={{ padding: '20px 50px', marginTop: 64, display: 'flex', flexDirection: 'row' }}>
          <Content style={{ width: '1000px' }}>
            <div style={{ background: '#aaa', padding: 24, minHeight: 280 }}>Content</div>
            <div style={{ background: '#bbb', padding: 24, minHeight: 280 }}>Content</div>
            <div style={{ background: '#ccc', padding: 24, minHeight: 280 }}>Content</div>
          </Content>
          <Sider style={{ maxWidth: '200px', marginLeft: 20 }}>
            <div style={{ width: 200, height: 200, background: '#216525', borderRadius: '3px' }} />
            <div style={{ width: 200, height: 500, background: '#888', marginTop: 20, borderRadius: '3px' }} />
            <div style={{ width: 200, height: 200, background: '#999', marginTop: 20, borderRadius: '3px' }} />
            <div style={{ width: 200, height: 200, background: '#eee', marginTop: 20, borderRadius: '3px' }} />
          </Sider>
        </Layout>
        <Footer style={{ textAlign: 'center', paddingBottom: 50 }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}