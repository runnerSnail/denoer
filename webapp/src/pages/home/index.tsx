import React from 'react'
import { Layout, List, Carousel, Button } from 'antd'
import { connect } from 'react-redux'
// import isEmpty from 'lodash/isEmpty'

import { Page } from 'components'
import { fetchPostsList } from 'service/posts'
import { loginAuthByCode, fetchUserInfo } from 'service/user'

import Item from './components/item'
import { TYPE_ARRAY, authUrl } from 'utils'
import './style.sass'

const { Content, Sider } = Layout

class Home extends React.Component<any, any> {
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
    const { updateUserInfo = () => void 0 } = this.props
    const { search } = window.location
    const matchArr = search.match(/\?code=(\S+)/)
    if (search && matchArr && matchArr.length === 2) {
      try {
        this.setState({ loading: true })
        const { result: { user_id = '' } = {} } = await loginAuthByCode(matchArr[1])
        if (user_id) {
          const { result = {} } = await fetchUserInfo(Number(user_id))
          if (result) {
            await updateUserInfo({...result})
            this.setState({ loading: false })
            console.log('result:', result)
          } else {
            console.log(`获取 user_id=${user_id} 的用户信息失败，请重试!`)
            this.setState({ loading: false })
          }
        } else {
          window.location.href = `${authUrl}`
        }
      } catch (err) {
        this.setState({ loading: false })
        window.location.href = `${authUrl}`
      }
    }
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

  _renderSider = () => {
    const {
      gitlab_id = '', user_name = '-',
      user_img = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      company = '-'
    } = this.props.userInfo || {}
    return (
      <Sider
        className='sider'
        style={{ marginLeft: 50 }}
      >
        {
        gitlab_id ? <div className='sider-wrapper'>
          <div className='sider-desc'>
            <img src={user_img} className='sider-avator' />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 14 }}>{user_name}</span>
              <span style={{ fontSize: 12, marginTop: 10 }}>{`公司: ${company},`}</span>
            </div>
          </div>
          <div className='sider-btn'>
            <Button size='small' type='primary' onClick={this._jumpTo('/publish')} className='sider-btn-publish'>发表文章</Button>
            <Button size='small' type='primary' onClick={async () => {
              console.log('点击登录', window.location)
            }}>合作推广</Button>
            <Button size='small' type='primary'>个人信息</Button>
          </div>
        </div> : <div className='sider-wrapper' style={{ textAlign: 'center' }} onClick={this._toLogin}><span style={{ cursor: 'pointer' }}>点击登录</span></div>}
        {[1,2,3].map(e => (<div style={{ width: 300, height: 200, background: '#999', marginTop: 20, textAlign: 'center', lineHeight: '200px' }}>广告位</div>))}
      </Sider>
    )
  }

  _toLogin = async () => {
    window.location.href = `${authUrl}`
  }
  render () {
    console.log('home render:', this.props)
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

const mapToState = ({ user }) => ({
  userInfo: user
})
const mapToDispatch = ({ user }: any) => ({
  updateUserInfo: user.updateUserInfo
})

export default connect(mapToState, mapToDispatch)(Home)