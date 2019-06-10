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
    const { result } = await fetchPostsList({
      page: 1,
      size: 10
    })
    this.setState({
      dataSource: result.data,
      loading: false
    })
    // const res = await request('testapiServer', { aa: 'aa' }, { opt: 'opt' })
    // await sleep(1000)
  }

  _jumpTo = (path) => () => {
    this.props.history.push(path)
  }

  _renderRow = ({ title = '', desc = '这撒上嘎顺利开工阿说了飞机卡上就撒了阿娇阿拉山口分', content = '', article_id, ...args }) => (
    <Item
      title={title}
      // desc={desc}
      content={content}
      info={args}
      onClick={this._jumpTo(`/posts/${article_id}`)}
    />
  )


  _renderContent = () => (
    <Content>
      <List
        loading={this.state.loading}
        itemLayout='vertical'
        dataSource={this.state.dataSource}
        renderItem={this._renderRow}
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

  render () {
    return (
      <Page
        {...this.props}
      >
        <Layout className='wrapper'>
          {this._renderContent()}
        </Layout>
      </Page>
    )
  }
}
