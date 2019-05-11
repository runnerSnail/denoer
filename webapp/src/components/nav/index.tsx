
import * as React from 'react'
import { RouteProps, RouteComponentProps } from 'react-router'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'

import styles from './style.module.sass'

const { Header } = Layout

export default class Nav extends React.PureComponent {
    public render () {
      return (
        <Header style={{ width: '100%', position: 'fixed', zIndex: 1, top: 0, height: '63px', background: '#333', paddingLeft: '10px' }}>
          <div className={styles['logo']} />
          <div style={{ height: '63px', lineHeight: '63px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <span><Icon type="appstore" />首页</span>
            <span><Icon type="mail" />未读消息</span>
            <span><Icon type='smile' />新手入门</span>
            <span><Icon type='cloud' />deno API</span>
            <span><Icon type='team' />关于</span>
            <span><Icon type='user' />设置</span>
            <span><Icon type='frown' />退出</span>
          </div>
          {/* <Menu
            // theme='dark'
            mode='horizontal'
            // defaultSelectedKeys={['2']}
            style={{ height: '63px', maxHeight: '63px', lineHeight: '63px' }}
          >
            <Menu.Item key='1' title='nav1'>
              <Icon type="mail" />首页
            </Menu.Item>
            <Menu.Item key='2' title='nav2'>
            <Icon type="appstore" />未读消息
            </Menu.Item>
            <Menu.Item key='3' title='nav3'>
              新手入门
            </Menu.Item>
            <Menu.Item key='4' title='nav4'>
              deno API
            </Menu.Item>
            <Menu.Item key='5' title='nav5'>
              关于
            </Menu.Item>
            <Menu.Item key='6' title='nav6'>
              设置
            </Menu.Item>
            <Menu.Item key='7' title='nav7'>
              退出
            </Menu.Item>
          </Menu> */}
        </Header>
      )
    }
}