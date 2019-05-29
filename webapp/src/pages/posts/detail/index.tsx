import React, { Component } from 'react'
import Marked from 'marked'

import { fetchPostsInfo } from 'service/posts'
import { Page } from 'components'

import styles from './style.module.sass'

export default class PostsDetails extends Component<any> {
  state = {
    content: `#### 哈哈司空见惯哈
    
    #### 小表啦啥
    > 文章的一段引言，一般没有多大的阿婆时光就啊时光就是德国科隆伤筋动骨睡了快到啦就开始嘎时光
    
    #### 副标题

    ![黄图](https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png)

    ## 文章标题

    > 文章的一段引言，一般没有多大的阿婆时光就啊时光就是德国科隆伤筋动骨睡了快到啦就开始嘎时光

    #### 副标题

    ![黄图](https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png)

    ## 文章标题

    > 文章的一段引言，一般没有多大的阿婆时光就啊时光就是德国科隆伤筋动骨睡了快到啦就开始嘎时光

    #### 副标题
    `
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