import Loadable from 'react-loadable'
import { Icon } from 'antd'
import { Class } from '@babel/types';

type Props = {
  loader: Class,
  Loading: Function
}

const withLoadable = ({ loader, Loading }: Props) => Loadable({
  loader: () => loader,
  loading: Loading || DefaultLoading
})

export default withLoadable

const DefaultLoading = () => (
  <div style={{ textAlign: 'center', padding: 5 }}>
  <Icon type='loading' />
  </div>
)