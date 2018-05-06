// pages/circle/topic/topic.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    orgin:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orgin = options.orgin ? options.orgin:1;
    this.setData({
      orgin: orgin
    })
    this.getList();
  },
  getList(){
    wx.request({
      url: app.globalData.apiUrl + 'get_topic.php',
      success: res => {
        console.log(res)
        this.setData({
          data: res.data.data
        })
      }
    })
  },
  topicSelect(e){
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    if(this.data.orgin==1){
      wx.navigateTo({
        url: '/pages/circle/circleList/circleList?id='+id,
      })
    }else{
      app.globalData.topicId = id;
      app.globalData.topicName = name;
      wx.navigateBack({
        
      })
    }
  },
  topicJoin(e){
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/publish/dynamic/dynamic?id=' + id + '&name=' + name,
    })
  }
})