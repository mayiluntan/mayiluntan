// pages/error/error.js
const app=getApp();
var time=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      app.wxLogin();
      wx.showLoading({
        title: '授权中',
      })
      this.getGlobalInfo();
    }else{
      app.showAuthTips('');
      app.wxErrorCallback = function () {
        wx.navigateBack({
        })
      }
    }
  },
  getGlobalInfo(){
    if (time>=10){
      wx.hideLoading();
      app.showTips('提示', '获取超时，重新打开再试', false);
      time=0;
      return;
    }
    this.getGlobalAuth()
  },
  getGlobalAuth(){
    time++;
    if (app.globalData.uid == null) {
      var that = this;
      setTimeout(function () {
        that.getGlobalInfo()
      }, 1000)
    } else {
      wx.hideLoading();
      time = 0;
      wx.navigateBack({
      })
    }
  }
})