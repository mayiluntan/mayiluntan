// pages/publish/dynamic/dynamic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics:[],
    dynamicArray: ['不选择', '#健身是个问题#', '#今天天气不错，去哪里游玩#'],
    dynamicIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  dynamicChange(e){
    var v = e.detail.value;
    if (this.data.dynamicIndex != v) {
      this.setData({
        dynamicIndex: v
      })
    }
  }
})