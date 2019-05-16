import React from 'react'
import Loadable from 'react-loadable'
import { Icon } from 'antd'

interface Props {
  loader: any,
  Loading?: any
}

const withLoadable = ({ loader, Loading }: Props) => Loadable({
  loader: () => loader,
  loading: Loading || DefaultLoading
})

export default withLoadable

const DefaultLoading = () => (
  <div style={{ textAlign: 'center', padding: 50 }}>
    <Icon type='loading' />
  </div>
)