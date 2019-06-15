import React, { Component } from 'react'
import Marked from 'marked'
import { connect } from 'react-redux'

import { fetchPostsInfo } from 'service/posts'
import { Page } from 'components'

import styles from './style.module.sass'

class PostsDetails extends Component<any> {
  state = {
    article_content: ``,
    support_num: ``,
    read_num: ``,
    title: ``,
    img: ``
  }
  async componentDidMount () {
    const { params = {} } = this.props.match || {}
    try {
      const { result = {} } = await fetchPostsInfo(params.article_id)
      this.setState({ ...result })
    } catch (err) {
      console.log('err:', err)
    }
  }

  render () {
    const { article_content = '', support_num, read_num, title, img } = this.state
    // const { user_img = '', user_name = '' } = this.props.userInfo ||
    const defaultImg = 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
    return (
      <Page
        {...this.props}
        selectKey='2'
      >
        <div className={styles['wrapper']}>
          <div className={styles['title']}>{`${title || '-'}`}</div>
          <div className={styles['introduce']}>
            <img
              src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
              className={styles['img']}
            />
            <div className={styles['introduce-detail']}>
              <span>Michael Scofield</span>
              <span>{`点赞 ${support_num || '0'} 个，阅读 ${read_num || '0'} 次`}</span>
            </div>
          </div>
          <img src={img || defaultImg} style={{ height: 'auto', width: '100%', marginTop: 20 }} />
          <div className={`markdown-body ${styles['md-wrapper']}`}>
            <div dangerouslySetInnerHTML={{ __html: Marked(article_content) }} />
          </div>
        </div>
        <div style={{
          width: 150,
          height: '50px',
          lineHeight: '50px',
          background: '#7e7e7e',
          textAlign: 'center',
          position: 'fixed',
          right: '50px',
          top: '100px',
          cursor: 'pointer',
          borderRadius: 50,
          color: '#eee',
          opacity: 0.3
          }}>去编辑</div>
      </Page>
    )
  }
}

const mapToState = ({ user }) => ({
  userInfo: user
})
const mapToDispatch = () => ({})

export default connect(mapToState, mapToDispatch)(PostsDetails)