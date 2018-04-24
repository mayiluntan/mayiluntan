// pages/pages/pagePost/pagePost.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    picCount: 0,
    index: 0,
    cateArray: ['房屋出租', '房屋求租', '二手市场', '求职招聘', '汽车交易', '求助问事', '拼车信息', '短租民宿', '生意转让', '交友项目', '宠物相关', '二手教材', '二手房产', '同城交友', '家居家具', '数码电子'],
    on: 1
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
  },
  cateChange(e) {
    var v = e.detail.value;
    if (this.data.index != v) {
      this.setData({
        index: v
      })
    }
  },
  clickSwitch(e) {
    var v = this.data.on;
    if (v == 1) {
      v = 0
    } else {
      v = 1
    }
    this.setData({
      on: v
    })
  }
})
