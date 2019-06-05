import React from 'react'
import { Layout, List, Carousel, Button } from 'antd'

import { Page } from 'components'
import { fetchPostsList } from 'service/posts'

import Item from './components/item'
import './style.sass'

const { Content, Footer, Sider } = Layout

interface HomeState {}

export default class Home extends React.Component<any, HomeState> {
  constructor (props: any) {
    super(props)
  }

  state= {
    dataSource: [],
    loading: true
  }
  async componentDidMount () {
    const { result: dataSource = [] } = await fetchPostsList({
      page: 1,
      size: 10
    })
    this.setState({
      dataSource,
      loading: false
    })
    // const res = await request('testapiServer', { aa: 'aa' }, { opt: 'opt' })
    // await sleep(1000)
  }

  _jumpTo = (path) => () => {
    this.props.history.push(path)
  }

  _renderRow = ({ title = '', desc = '', content = '', article_id, ...args }) => (
    <Item
      title={title}
      desc={desc}
      content={content}
      onClick={this._jumpTo(`/posts/${article_id}`)}
    />
  )

  _listHeader = () => (
    <div className='list-header'>
      <span>全部</span>
      <span>精华</span>
      <span>分享</span>
      <span>问答</span>
      <span>测试</span>
    </div>
  )

  _renderContent = () => (
    <Content>
      <Carousel dots autoplay>
        <div>第一张</div>
        <div>第二张</div>
        <div>第三张</div>
      </Carousel>
      <List
        loading={this.state.loading}
        itemLayout='vertical'
        dataSource={this.state.dataSource}
        renderItem={this._renderRow}
        header={this._listHeader()}
        pagination={{
          // showQuickJumper: true,
          total: 21,
          pageSize: 10,
          onChange: (pageNum, pageSize) => {
            console.log('pagination onChange:', pageNum, pageSize)
          }
        }}
      />
    </Content>
  )

  _renderSider = () => (
    <Sider
      className='sider'
      style={{ marginLeft: 50 }}
    >
      <div className='sider-wrapper'>
        <div className='sider-desc'>
          <img src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' className='sider-avator' />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 14 }}>runSnail</span>
            <span style={{ fontSize: 12, marginTop: 10 }}>个人说明: 人生如棋，我愿为卒，行动虽慢，可谁见我后退一步。</span>
          </div>
        </div>
        <div className='sider-btn'>
          <Button size='small' type='primary' onClick={this._jumpTo('/publish')}>发表文章</Button>
          <Button size='small' type='primary'>撰写文章</Button>
          <Button size='small' type='primary'>分享资源</Button>
        </div>
      </div>
      {[1,2,3].map(e => (<div style={{ width: 300, height: 200, background: '#999', marginTop: 20, textAlign: 'center', lineHeight: '200px' }}>广告位</div>))}
    </Sider>
  )
  render () {
    return (
      <Page
        {...this.props}
      >
        <Layout className='wrapper'>
          {this._renderContent()}
          {this._renderSider()}
        </Layout>
      </Page>
    )
  }
}
