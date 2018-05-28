// pages/select/select.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cityArray: app.globalArray.cityArray
    })    
  },
  citySelect(e){
    var city = [e.currentTarget.dataset.state, e.currentTarget.dataset.country, e.currentTarget.dataset.city]
    wx.request({
      url: app.globalData.apiUrl + 'update_city.php',
      data: { uid: app.globalData.uid, city: city},
      method: 'POST',
      success: res => {
        if(res.data.ret==1){
          app.globalData.indexPic = res.data.pic
        }
      }
    })
    app.globalData.cityArray = city
    app.globalData.cityChange = true
    app.globalData.pageChange = true
    wx.navigateBack({

    })
  }
})