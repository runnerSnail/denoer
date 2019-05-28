import React, { Component } from 'react'

import { fetchPostsInfo } from 'service/posts'
import { Page } from 'components'

import styles from './style.module.sass'

export default class PostsDetails extends Component<any> {
  async componentDidMount () {
    const { params = {} } = this.props.match || {}
    const res = await fetchPostsInfo(params.article_id)
    console.log('文章详情:', res)
  }

  render () {
    const { params = {} } = this.props.match || {}
    return (
      <Page
        {...this.props}
      >
        <div className={styles['wrapper']}>
          <div className={styles['zxc']}>
            <div style={{ marginTop: 30, fontSize: 40 }}>{`文章标题啊啊啊啊啊a`}</div>
            <div style={{ marginTop: 30, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <img src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' style={{ width: 48, height: 48 }} />
              <div style={{ marginLeft: 5, display: 'flex', flexDirection: 'column' }}>
                <span>Mark Scofield</span>
                <span>点赞五个，喜欢10次</span>
              </div>
            </div>
            <img src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' style={{ height: 'auto', width: '100%', marginTop: 20 }} />
            <div style={{ marginTop: 30 }}>
              <p>张敏1968年出生在上海，从小就随父母移居香港，18岁在街边派发传单时，被永盛电影公司老板娘向太陈岚相中，加盟永盛电影公司，从此成为该公司的当家花旦。
              张敏又复出了！然而对于90后和00后来说，她已是个遥远的女明星。是的，她今年已经51岁了。早在20多年前，她就淡出银幕了。在她最风华绝代的时候，年轻的朋友们还没出生。
图片发自简书App
张敏1968年出生在上海，从小就随父母移居香港，18岁在街边派发传单时，被永盛电影公司老板娘向太陈岚相中，加盟永盛电影公司，从此成为该公司的当家花旦。
图片发自简书App
从1986年到1993年，她拍了70多部电影，曾13次和周星驰搭档。张敏的首部电影，就是搭档刘德华主演《魔翡翠》。接着，永胜又请来周润发、钟楚红等当红明星来捧她。等到1988年，永胜拍了电影《最佳女婿》，片中，周星驰、张学友、莫少聪三个人抢一个女朋友，那个女朋友便是张敏。
图片发自简书App
这是张敏第一次和周星驰合作，周星驰当时尚未成气候。李连杰、周润发、刘德华这样的，才是巨星和票房保证；而这些人，张敏都合作过。
图片发自简书App
图片发自简书App
图片发自简书App
《绝代双骄》
图片发自简书App
《新碧血剑》而等到周星驰凭借《逃学威龙》开始走红后，张敏又成了周星驰身边最频繁出现的女主角。
图片发自简书App
她，是《赌圣》里让周星驰魂牵梦萦的绮梦，是《逃学威龙》里气质无敌的女老师阿敏，是《武状元苏乞儿》里风华绝代的如霜姑娘，是《鹿鼎记》里风骚狠辣的皇太后……
图片发自简书App
《鹿鼎记》
图片发自简书App
《苏乞儿》
图片发自简书App
《九品芝麻官》总之，当时的香港女明星，除了霞玉芳红，就是张敏了。而她的容貌和演技，也没辜负她的资源和机会。
图片发自简书App
就拿和周星驰合作过的女明星来说，林青霞、张曼玉、巩俐、吴君如、毛舜筠、朱茵、莫文蔚、赵薇、张柏芝……无论是美貌还是演技，张敏都不是最出众的，但她是最醒目的。其他女明星在周星驰身边，都想着如何去搭配他，而张敏是少有的能和周星驰非常默契但不会被他带偏的女明星。在当时，没人叫她“星女郎”，她就是张敏。
图片发自简书App
这是张敏在电影《倚天屠龙记》里饰演的赵敏，白衣胜雪，英气逼人，有一种令人窒息的美，也是她除了星女郎之外最经典的角色之一。很多人说，她是所有版本的赵敏中最接近原著的。金庸曾这么形容赵敏：自来美人不是温雅秀美，便是娇艳姿媚，这位赵小姐却是十分美丽之中更带着三分英气，三分豪态，同时雍容华贵，自有一副端严之致，令人肃然起敬，不敢逼视。
图片发自简书App
作者：文字剧社
链接：https://www.jianshu.com/p/788ca1392366
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
</p>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}