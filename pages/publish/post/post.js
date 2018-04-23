// pages/publish/post/post.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics:[],
    picCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  addPic() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          pics: tempFilePaths,
          picCount: tempFilePaths.length
        });
        console.log(that.data.pics);
      }
    })
  }
})