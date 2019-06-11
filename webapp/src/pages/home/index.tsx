import React from 'react'
import { Layout, List, Carousel, Button } from 'antd'
// import isEmpty from 'lodash/isEmpty'

import { Page } from 'components'
import { fetchPostsList } from 'service/posts'

import Item from './components/item'
import { TYPE_ARRAY } from 'utils'
import './style.sass'

const { Content, Footer, Sider } = Layout

interface HomeState {}

export default class Home extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
  }

  state= {
    dataSource: [],
    loading: true,
    selectedType: 1,
    recoders: 1,
    size: 10,
    type: 1
  }

  _getData = async ({ page = 1, size = 10, type = 1 }) => {
    this.setState({ loading: true })
    try {
      const { result: {data = [], recoders = 1} = {} } = await fetchPostsList({ page, size, type })
      this.setState({ dataSource: data, loading: false, recoders, page })
    } catch (err) {
      this.setState({ loading: false, dataSource: [] })
    }
  }
  async componentDidMount () {
    this._getData({ page: 1, size: 10, type: 1 })
  }

  _jumpTo = (path) => () => {
    this.props.history.push(path)
  }

  _renderRow = ({ title = '', desc = '', article_content = '', article_id, ...args }) => (
    <Item
      title={title}
      content={article_content}
      info={args}
      onClick={this._jumpTo(`/posts/${article_id}`)}
    />
  )

  _listHeader = () => (
    <div className='list-header'>
      {
        TYPE_ARRAY.map(({ key, value }) => {
          const { selectedType } = this.state
          let activeCls = selectedType === key ? 'list-header-active' : ''
          return (
            <span
              onClick={this._selectPosts(key)}
              className={`list-header-item ${activeCls}`}
            >{value || '-'}</span>
          )
        })
      }
    </div>
  )

  _selectPosts = (type: number) => () => {
    console.log('type:', type, typeof type)
    this.setState({
      selectedType: type
    }, () => {
      this._getData({ page: 1, size: 10, type })
    })
  }

  _renderContent = () => (
    <Content>
      <Carousel dots autoplay>
        <div>
          <img className="image-logo" src="https://denoer-1255609850.cos.ap-chengdu.myqcloud.com/logo-1.jpg" alt=""/>
        </div>
      </Carousel>
      <List
        loading={this.state.loading}
        itemLayout='vertical'
        dataSource={this.state.dataSource}
        renderItem={this._renderRow}
        header={this._listHeader()}
        pagination={{
          // showQuickJumper: true,
          total: this.state.recoders,
          pageSize: this.state.size,
          onChange: (page, size) => {
            this.setState({ page, size }, () => {
              this._getData({ page, size, type: 1 })
            })
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
          <Button size='small' type='primary' onClick={this._jumpTo('/publish')} className='sider-btn-publish'>发表文章</Button>
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
        selectKey='1'
      >
        <Layout className='wrapper'>
          {this._renderContent()}
          {this._renderSider()}
        </Layout>
      </Page>
    )
  }
}
