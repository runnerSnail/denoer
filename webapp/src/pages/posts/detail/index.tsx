import React, { Component } from 'react'
import Marked from 'marked'

import { fetchPostsInfo } from 'service/posts'
import { Page } from 'components'

import styles from './style.module.sass'

export default class PostsDetails extends Component<any> {
  state = {
    content: `#### 会嘎舒服 阿说嘎哈说昂那个卡`
  }
  async componentDidMount () {
    const { params = {} } = this.props.match || {}
    const content = await Marked(this.state.content)
    this.setState({ content })
    const res = await fetchPostsInfo(params.article_id)
    console.log('文章详情:', res)
  }

  render () {
    const { params = {} } = this.props.match || {}
    console.log('conent:', this.state.content)
    return (
      <Page
        {...this.props}
      >
        <div className={styles['wrapper']}>
          <div className={styles['title']}>{`文章标题啊啊啊啊啊a`}</div>
          <div className={styles['introduce']}>
            <img
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              className={styles['img']}
            />
            <div className={styles['introduce-detail']}>
              <span>Mark Scofield</span>
              <span>点赞五个，喜欢10次</span>
            </div>
          </div>
          <img src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' style={{ height: 'auto', width: '100%', marginTop: 20 }} />
          <div className={`markdown-body ${styles['md-wrapper']}`}>
            <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
          </div>
        </div>
      </Page>
    )
  }
}