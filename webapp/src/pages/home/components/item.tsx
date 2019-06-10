import React from 'react'
import { List, Icon, Avatar } from 'antd'

import styles from './item.module.sass'

interface itemProps {
  title: string,
  content: string,
  // desc?: string,
  onClick: () => void,
  info: any
}

export default function ({ title, onClick, content, info }: itemProps) {
  const { support_num = '-', read_num = '-' } = info
  return (
    <List.Item
      key={title}
      actions={[
        <IconText type="star-o" text="156" />,
        <IconText type="like-o" text={support_num} />,
        <IconText type="message" text={read_num} />,
      ]}
      extra={
        <img
          width={272}
          alt='logo'
          src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
        />
      }
    >
      <List.Item.Meta
        avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
        title={<span onClick={onClick} className={styles['title']}>{title}</span>}
        // description={content}
      />
      {content.length > 50 ? content.slice(0, 50) + '...' : content}
    </List.Item>
  )
}

interface IconProps {
  type: string,
  text: string,
  onClick?: any
}

const IconText = ({ type, text, onClick }: IconProps) => (
  <span onClick={onClick} className={styles['icon']} >
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)
