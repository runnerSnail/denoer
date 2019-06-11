import React from 'react'
import { Layout, List } from 'antd' // Carousel, Button

import { Page } from 'components'
import { fetchPostsList } from 'service/posts'

import Item from './components/item'
import './style.sass'

const { Content } = Layout // Footer, Sider

interface HomeState {}

export default class Home extends React.Component<any, HomeState> {
  constructor (props: any) {
    super(props)
  }

  state= {
    dataSource: [],
    loading: true,
    recoders: 1,
    size: 10
  }
  async componentDidMount () {
    this._getData({ page: 1, size: 10 })
  }

  _getData = async ({ page, size }) => {
    this.setState({ loading: true })
    const { result: {data = [], recoders = 1} = {} } = await fetchPostsList({ page, size })
    this.setState({ dataSource: data, loading: false, recoders, page })
  }

  _jumpTo = (path) => () => {
    this.props.history.push(path)
  }

  _renderRow = ({ title = '', article_content = '', article_id, ...args }) => (
    <Item
      title={title}
      // desc={desc}
      content={article_content}
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
          total: this.state.recoders,
          pageSize: this.state.size,
          onChange: (page, size) => {
            this.setState({ page, size }, () => {
              this._getData({ page, size })
            })
          }
        }}
      />
    </Content>
  )

  render () {
    return (
      <Page
        {...this.props}
        selectKey='2'
      >
        <Layout className='my-article'>
          {this._renderContent()}
        </Layout>
      </Page>
    )
  }
}
