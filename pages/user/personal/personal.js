// pages/user/personal/personal.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    showData:[0,0,0],
    menuSelected:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  menuClicked: function (event) {
    var menutype = event.currentTarget.dataset.menutype;
    if (this.data.menuSelected == menutype) {
      return;
    }
    this.setData({
      menuSelected: menutype
    })
  },
  swiperChange(e) {
    this.setData({
      menuSelected: e.detail.current
    });
  }
})