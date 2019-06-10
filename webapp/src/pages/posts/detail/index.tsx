import React, { Component } from 'react'
import Marked from 'marked'

import { fetchPostsInfo } from 'service/posts'
import { Page } from 'components'

import styles from './style.module.sass'

export default class PostsDetails extends Component<any> {
  state = {
    content: ``,
    support_num: ``,
    read_num: ``,
    title: ``
  }
  async componentDidMount () {
    const { params = {} } = this.props.match || {}
    const { result: { content = '', ...args } = {} } = await fetchPostsInfo(params.article_id)
    const articleContent = await Marked(content)
    this.setState({ content: articleContent, ...args })
    console.log('args:', args)
  }

  render () {
    // const { params = {} } = this.props.match || {}
    const { content = '', support_num = '', read_num = '', title = '' } = this.state
    console.log('conent:', this.state.content)
    return (
      <Page
        {...this.props}
      >
        <div className={styles['wrapper']}>
          <div className={styles['title']}>{`${title}`}</div>
          <div className={styles['introduce']}>
            <img
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              className={styles['img']}
            />
            <div className={styles['introduce-detail']}>
              <span>Mark Scofield</span>
              <span>{`点赞${support_num}个，阅读${read_num}次`}</span>
            </div>
          </div>
          <img src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' style={{ height: 'auto', width: '100%', marginTop: 20 }} />
          <div className={`markdown-body ${styles['md-wrapper']}`}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </Page>
    )
  }
}