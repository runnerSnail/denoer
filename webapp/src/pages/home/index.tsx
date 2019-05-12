import React from 'react'
// import Layout from 'antd/lib/layout'
import Breadcrumb from 'antd/lib/breadcrumb'
// import List from 'antd/lib/list'
// import Avatar from 'antd/lib/avatar'
// import Icon from 'antd/lib/icon'
import { Icon, Avatar, List, Layout } from 'antd'


import { request, sleep } from 'utils'
import { Nav } from 'components'

const { Content, Footer, Sider } = Layout
export default class Home extends React.Component {

  state= {
    dataSource: [],
    loading: true
  }
  async componentDidMount () {
    // const res = await request('testapiServer', { aa: 'aa' }, { opt: 'opt' })
    await sleep(1000)
    this.setState({
      dataSource: [
        { title: '文章1', desc: '描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1描述1' },
        { title: '文章2', desc: '描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2描述2' },
        { title: '文章3', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章4', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章5', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章6', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章7', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章8', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章9', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章10', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章11', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章12', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章13', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章14', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章15', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章16', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章17', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章18', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章19', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章20', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' },
        { title: '文章21', desc: '描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3描述3' }
      ],
      loading: false
    })
  }

  _renderRow = ({ title = '', desc = '' }) => {
    return (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
          title={<a href='/'>{title}</a>}
          description={desc}
        />
        <div>2 天前</div>
      </List.Item>
    )
  }

  _listHeader = () => (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <span>全部</span>
      <span>精华</span>
      <span>分享</span>
      <span>问答</span>
      <span>测试</span>
    </div>
  )
  render () {
    console.log('request:', request)
    return (
      <Layout className='layout'>
        <Nav />
        <Layout style={{ padding: '20px 50px', marginTop: 64, display: 'flex', flexDirection: 'row' }}>
          <Content style={{ marginRight: 100 }}>
            <List
              loading={this.state.loading}
              itemLayout='horizontal'
              dataSource={this.state.dataSource}
              renderItem={this._renderRow}
              header={this._listHeader()}
              pagination={{
                // showQuickJumper: true,
                total: 21,
                pageSize: 8,
                onChange: (pageNum, pageSize) => {
                  console.log('pagination onChange:', pageNum, pageSize)
                }
              }}
            />
          </Content>
          <Sider style={{ background: '#eee', breakpoint: 'lg' }}>
            <div style={{ width: 200, height: 200, background: '#216525', borderRadius: '3px' }} />
            <div style={{ width: 200, height: 200, background: '#999', marginTop: 20, borderRadius: '3px' }} />
          </Sider>
        </Layout>
        <Footer style={{ textAlign: 'center', paddingBottom: 50 }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}