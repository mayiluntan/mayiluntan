// pages/view/viewDetail/viewDetail.js
var id=0;
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:{},
    message:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id ? options.id:0
    wx.request({
      url: app.globalData.apiUrl+'get_content.php',
      data: { id: id, uid: app.globalData.uid},
      success:res=>{
        console.log(res)
        if(res.data.ret==1){
          this.setData({
            content: res.data.data
          })
        }else{
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  messageInput(e){
    this.setData({
      message:e.detail.value
    })
  },
  replySubmit(){
    if (this.data.message == '') {
      app.showTips('提示', '请输入内容', false)
      return
    }
    wx.request({
      url: app.globalData.apiUrl + 'post_message.php',
      data: { id: id, uid: app.globalData.uid, content: this.data.message, reply_id:0 },
      method:'POST',
      success:res=>{
        if (res.data.ret == 1) {
          wx.showToast({
            title: '留言成功',
            icon:'success'
          })
          this.setData({
            message: ''
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  }
})