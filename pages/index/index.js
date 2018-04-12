//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cateSelected:0,
    imgUrls: [
      {
        link: '/pages/index/index',
        url: '/images/banner1.png'
      }, {
        link: '/pages/pages/pages',
        url: '/images/banner2.png'
      }, {
        link: '/pages/user/user',
        url: '/images/banner3.png'
      }
    ]
  },
  
  onLoad: function () {
    
  },
  swiperChange(e){
    this.setData({
      cateSelected: e.detail.current
    });
  }
})
