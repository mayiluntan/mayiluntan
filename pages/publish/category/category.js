// pages/publish/category/category.js
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
  showList(e){
    var cate = e.currentTarget.dataset.cate
    if(cate>100){
      cate = cate-100
      wx.navigateTo({
        url: '/pages/publish/post/post?cate='+cate,
      })
    }else{
      wx.navigateTo({
        url: '/pages/publish/business/business?cate=' + cate
      })
    }
  }
})