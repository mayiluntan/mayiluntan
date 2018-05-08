// pages/circle/circleList/circleList.js
const app=getApp()
var topic_id = 0;
var id = 0;
var userid = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide:1,
    data:{},
    keyword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    topic_id = options.id ? options.id:0
    var keyword = options.keyword ? options.keyword : '';
    this.setData({
      keyword: keyword
    })
    this.getList()
  },
  getList() {
    wx.request({
      url: app.globalData.apiUrl + 'get_dynamic.php',
      data: { uid: app.globalData.uid, topic_id: topic_id, keyword:this.data.keyword },
      method: "POST",
      success: res => {
        if (res.data.ret == 1) {
          this.setData({
            data: res.data.data
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  showInput(e) {
    id = e.currentTarget.dataset.id
    userid = 0
    this.setData({
      hide: 0,
      nick: ''
    })
  },
  hideInput() {
    this.setData({
      hide: 1
    })
  },
  replyInput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  replyUser(e) {
    id = e.currentTarget.dataset.id
    var nick = e.currentTarget.dataset.nick
    userid = e.currentTarget.dataset.userid
    this.setData({
      hide: 0,
      nick: nick
    })
  },
  replyClick() {
    if (this.data.content == '') {
      app.showTips('提示', '请输入内容', false)
      return
    }
    wx.request({
      url: app.globalData.apiUrl + 'dynamic_message.php',
      data: { id: id, uid: app.globalData.uid, content: this.data.content, to_user_id: userid },
      method: 'POST',
      success: res => {
        if (res.data.ret == 1) {
          wx.showToast({
            title: '回复成功',
            icon: 'success'
          })
          this.setData({
            content: ''
          })
          this.hideInput();
          this.getList();
          id = 0;
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  thumbsUp(e) {
    id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.apiUrl + 'dynamic_up.php',
      data: { id: id, uid: app.globalData.uid },
      method: 'POST',
      success: res => {
        if (res.data.ret == 1) {
          this.getList();
          id = 0;
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  }
})