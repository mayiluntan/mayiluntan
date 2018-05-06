//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectArray: ['', '', ''],
    selectIndex: [0, 0, 0]
  },
  onLoad: function () {

  },
  onShow() {
    if (app.globalData.pageChange) {
      app.globalData.pageChange = false;
      this.setData({
        selectArray: app.globalData.cityArray,
        selectIndex: app.globalData.cityIndex
      })
    }
  },
  swiperChange(e) {
    this.setData({
      cateSelected: e.detail.current
    });
  }
})
