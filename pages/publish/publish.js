// pages/publish/publish.js
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
  btnClick(e){
    var t = e.currentTarget.dataset.type;
    if (t==1){
      wx.navigateTo({
        url: '/pages/publish/post/post',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  }
})