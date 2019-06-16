import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
// import { RouteComponentProps } from 'react-router'

import { Page } from 'components'
import { authUrl } from 'utils'

import './index.scss'

declare var $: any;
function User(props) {
    const { history, userInfo = {} } = props
    const { gitlab_id = '' } = userInfo || {}
    if (!gitlab_id) {
      window.location.href = `${authUrl}`
    }
    let _jumpTo = (path) => () => {
        history.push(path)
    }
    return (
        <Page {...props} selectKey='4'>
            <Layout>
                <div className='markdown-about'>
                    {Txt(userInfo)}
                </div>
            </Layout>
        </Page>
    )
}

const mapToState = ({ user }) => ({ userInfo: user })

export default connect(mapToState)(User)

function Txt(userInfo) {
  const { email, gitlab_url, location, user_img, user_name, company } = userInfo
  return (
    <div className="main margin-20">
        <h1 className="margin-10">个人信息</h1>
        <div>
          <img src={user_img || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} style={{ width: 50 }} />
          <span style={{ marginLeft: 10 }}>{user_name || '-'}</span>
        </div>
        <br />
        {`email: ${email && email !== 'null' ? email : '-'}`}<br />
        {`location: ${location && location !== 'null' ? location : '-'}`}<br />
        {`github: ${gitlab_url && gitlab_url !== 'null' ? gitlab_url : '-'}`}<br />
        {`company: ${company && company !== 'null' ? company : '-'}`}<br />
        <div style={{ marginBottom: 50 }} />
        您想参与网站建设请提交pr至---><a href="https://github.com/runnerSnail/denoer">项目地址</a><br />
        <h1 className="margin-20">商业合作请加QQ: 867151175</h1>
        <div style={{ marginBottom: 100 }} />
    </div>
  )
}
