import React from 'react'
import { Layout, List, Avatar, Icon, Carousel, Button } from 'antd'


import { request, sleep } from 'utils'
import { Page } from 'components'

import './style.sass'

interface HomeState {}

const { Content, Footer, Sider } = Layout

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)
export default class Home extends React.Component<any, HomeState> {
  constructor (props: any) {
    super(props)
  }

  state= {
    dataSource: [],
    loading: true
  }
  async componentDidMount () {
    // const res = await request('testapiServer', { aa: 'aa' }, { opt: 'opt' })
    await sleep(1000)
    this.setState({
      dataSource: [
        {
          title: '文章1',
          desc: '描述3描述3描述3描述3描述3描述3描述3描述3',
          content: 'la;ehgawkl;gwek;lagjhfkjfsaklhlkjhgkjlghslkg'
        },
        {
          title: '文章2',
          desc: '描述3描述3描述3描述3描述3描述3描述3描述3',
          content: 'lkwghneioqthasmfnasfuiqtghjbdmnbasfabfqjwtgbajksb'
        },
        {
          title: '文章3',
          desc: '描述3描述3描述3描述3描述3描述3描述3描述3',
          content: 'lkwghneioqthasmfnasfuiqtghjbdmnbasfabfqjwtgbajksb'
        }
      ],
      loading: false
    })
  }

  toPublish = (path) => () => {
    console.log('path:', path)
    console.log('history:', this.props.history)
    this.props.history.push(path)
  }

  _renderRow = ({ title = '', desc = '', content = '' }) => {
    return (
      <List.Item
        key={title}
        actions={[
          <IconText type="star-o" text="156" />,
          <IconText type="like-o" text="156" />,
          <IconText type="message" text="2" />,
        ]}
        extra={
          <img
            width={272}
            alt='logo'
            src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
          title={<a href='/'>{title}</a>}
          description={desc}
        />
        {content}
      </List.Item>
    )
  }

  _listHeader = () => (
    <div style={{ marginTop: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      {App({ title: 'czx' })}
      <span>全部</span>
      <span>精华</span>
      <span>分享</span>
      <span>问答</span>
      <span>测试</span>
    </div>
  )
  render () {
    console.log('request:', request)
    console.log('props:', this.props)
    return (
      <Page>
        <Layout style={{
          padding: '20px 50px',
          marginTop: 64,
          display: 'flex',
          flexDirection: 'row',
        }}
        >
          <Content>
            <Carousel
              dots
              autoplay
            >
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
                pageSize: 8,
                onChange: (pageNum, pageSize) => {
                  console.log('pagination onChange:', pageNum, pageSize)
                }
              }}
            />
          </Content>
          <Sider
            className='sider'
            style={{
              marginLeft: 50,
              backgroundColor: 'rgb(240, 242, 245)'
            }}
          >
            <div style={{ width: 300, height: 'auto', overflow: 'hidden', background: '#fff', color: '#000', padding: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' style={{ width: 60, height: 60, borderRadius: 30 }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 14 }}>runSnail</span>
                  <span style={{ fontSize: 12, marginTop: 10 }}>个人说明: 人生如棋，我愿为卒，行动虽慢，可谁见我后退一步。</span>
                </div>
              </div>
              <div style={{ marginTop: 10, marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button size='small' type='primary' onClick={this.toPublish('/publish')}>发表文章</Button>
                <Button size='small' type='primary'>撰写文章</Button>
                <Button size='small' type='primary'>分享资源</Button>
              </div>
            </div>
            <div style={{ width: 300, height: 200, background: '#999', marginTop: 20, textAlign: 'center', lineHeight: '200px' }}>广告位</div>
            <div style={{ width: 300, height: 200, background: '#aaa', marginTop: 20, textAlign: 'center', lineHeight: '200px' }}>广告位</div>
            <div style={{ width: 300, height: 200, background: '#bbb', marginTop: 20, textAlign: 'center', lineHeight: '200px' }}>广告位</div>
          </Sider>
        </Layout>
      </Page>
    )
  }
}

interface AppProps {
  title: string
}
const App: React.SFC<AppProps> = props => {
  console.log('props:', props)
  return (
    <div>{`App-${props.title}`}</div>
  )
}