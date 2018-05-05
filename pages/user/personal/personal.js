// pages/user/personal/personal.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:0,
    showData:[0,0,0],
    menuSelected:0,
    info:{},
    hide: 1,
    replyContent:'',
    user_message:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_id = options.user_id ? options.user_id:0
    this.setData({
      user_id: user_id
    })
    wx.request({
      url: app.globalData.apiUrl + 'get_personal.php',
      data: { uid: app.globalData.uid},
      method:'POST',
      success: res => {
        if (res.data.ret == 1) {
          this.setData({
            info: res.data.data.info,
            showData: res.data.data.show_data,
            userMessage: res.data.data.user_message
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  onShow(){
    
  },
  menuClicked: function (event) {
    var menutype = event.currentTarget.dataset.menutype;
    if (this.data.menuSelected == menutype) {
      return;
    }
    this.setData({
      menuSelected: menutype
    })
  },
  swiperChange(e) {
    this.setData({
      menuSelected: e.detail.current
    });
  },
  editClick(){
    wx.navigateTo({
      url: '/pages/user/personal/edit/edit'
    })
  },
  showInput() {
    this.setData({
      hide: 0
    })
  },
  hideInput() {
    this.setData({
      hide: 1
    })
  },
  replyInput(e){
    this.setData({
      replyContent:e.detail.value
    })
  },
  replyClick() {
    if (this.data.replyContent == '') {
      app.showTips('提示', '请输入内容', false)
      return
    }
    var data={
      uid:app.globalData.uid,
      user_id: this.data.user_id,
      content:this.data.replyContent
    }
    wx.request({
      url: app.globalData.apiUrl+'user_message.php',
      data: data,
      method:'POST',
      success:res=>{
        if (res.data.ret == 1) {
          wx.showToast({
            title: '留言成功',
            icon:'success'
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  }
})