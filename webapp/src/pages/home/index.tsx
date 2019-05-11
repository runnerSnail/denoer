import React from 'react'

import { request } from 'utils'
export default class Home extends React.Component {
  async componentDidMount () {
    const res = await request('testapiServer', { aa: 'aa' }, { opt: 'opt' })
    console.log('res:', res)

  }
  render () {
    console.log('request:', request)
    return (
      <div>Home Page</div>
    )
  }
}