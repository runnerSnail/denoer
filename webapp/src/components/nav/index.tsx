
import * as React from 'react'
import { RouteProps, RouteComponentProps } from 'react-router'
import { Layout, Menu, Icon, Input } from 'antd'
import axios from 'axios'

import styles from './style.module.sass'

const { Header } = Layout
const Search = Input.Search
let CancelToken = axios.CancelToken
let source = CancelToken.source()

interface NavState {
  searchvalueBaiduPrex: string,
  searchvalueGooglePrex: string,
  searchByGoogle: boolean
}

export default class Nav extends React.PureComponent<any, NavState> {
  _jumpTo = (path) => () => this.props.history.push(path)
  state = {
    searchvalueBaiduPrex: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=site:denoer.cn+',
    searchvalueGooglePrex: 'https://www.google.com.hk/search?hl=zh-CN&q=site:denoer.cn+',
    searchByGoogle: false
  }
  public componentDidMount() {
    let that = this
    axios.get('https://www.google.com/', {
      cancelToken: source.token
    })
      .then(function (response) {
        that.setState({
          searchByGoogle: true
        })
      })
      .catch(function (error) {
        if (error.message != '超时取消') {
          that.setState({
            searchByGoogle: true
          })
        }
      })
    setTimeout(() => {
      // 3秒超时取消
      source.cancel('超时取消')
    }, 3000)
  }
  public render() {
    const { selectKey } = this.props
    return (
      <Header className={styles['header-wrapper']}>
        <div className={styles['logo']}> </div>
        <Menu
          mode='horizontal'
          className={styles['menu']}
          defaultSelectedKeys={[selectKey || '1']}
        >
          <Menu.Item key='1' title='nav1' onClick={this._jumpTo('/')}>
            <Icon type='home' />首页
          </Menu.Item>
          <Menu.Item key='2' title='nav2' onClick={this._jumpTo('/myarticle')}>
            <Icon type="read" />我的文章
          </Menu.Item>
          <Menu.Item key='3' title='nav3' onClick={this._jumpTo('/new')}>
          <Icon type="appstore" />资源汇总
          </Menu.Item>
          <Menu.Item key='4' title='nav5' onClick={this._jumpTo('/about')}>
            <Icon type="user" />关于
          </Menu.Item>
          <Search
            placeholder="搜索本站内容"
            onSearch={value => {
              // window.open(this.state.searchvaluePrex+value)
              if (this.state.searchByGoogle) {
                  window.location.href = this.state.searchvalueGooglePrex + value
              }else{
                  window.location.href = this.state.searchvalueBaiduPrex + value
              }
            }}
            style={{ width: 200, marginLeft: 20 }}
          />
        </Menu>
      </Header>
    )
  }
}
