//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {

  },

  swiperChange(e) {
    this.setData({
      cateSelected: e.detail.current
    });
  }
})
