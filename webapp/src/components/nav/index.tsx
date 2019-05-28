
import * as React from 'react'
import { RouteProps, RouteComponentProps } from 'react-router'
import { Layout, Menu, Icon } from 'antd'

import styles from './style.module.sass'

const { Header } = Layout

export default class Nav extends React.PureComponent<any> {
  _jumpTo = (path) => () => this.props.history.push(path)
  public render () {
    return (
      <Header className={styles['header-wrapper']}>
        <div className={styles['logo']} />
        <Menu
          // theme='dark'
          mode='horizontal'
          // defaultSelectedKeys={['2']}
          style={{ height: '63px', maxHeight: '63px', lineHeight: '63px' }}
        >
          <Menu.Item key='1' title='nav1' onClick={this._jumpTo('/')}>
            <Icon type="mail" />首页
          </Menu.Item>
          <Menu.Item key='2' title='nav2' onClick={this._jumpTo('/posts/1')}>
          <Icon type="appstore" />我的文章
          </Menu.Item>
          <Menu.Item key='3' title='nav3' onClick={this._jumpTo('/new')}>
            新手入门
          </Menu.Item>
          <Menu.Item key='4' title='nav4' onClick={this._jumpTo('/api')}>
            deno API
          </Menu.Item>
          <Menu.Item key='5' title='nav5' onClick={this._jumpTo('/about')}>
            关于
          </Menu.Item>
          <Menu.Item key='6' title='nav6' onClick={this._jumpTo('/setting')}>
            设置
          </Menu.Item>
          <Menu.Item key='7' title='nav7' onClick={this._jumpTo('/logout')}>
            退出
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}