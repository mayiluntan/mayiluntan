// pages/user/personal/personal.js
const app=getApp();
var to_user_id=0;
var id=0;
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
    userMessage:{},
    hide:1,
    nick:'',
    content:'',
    isFollow:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var user_id = options.user_id ? options.user_id:0
    this.setData({
      user_id: user_id
    })
    wx.request({
      url: app.globalData.apiUrl + 'get_personal.php',
      data: { uid: app.globalData.uid, user_id: this.data.user_id},
      method:'POST',
      success: res => {
        console.log(res)
        if (res.data.ret == 1) {
          this.setData({
            info: res.data.data.info,
            showData: res.data.data.show_data
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
    this.getList();
  },
  onShow(){
    
  }, 
  getList() {
    wx.request({
      url: app.globalData.apiUrl + 'get_dynamic.php',
      data: { uid: app.globalData.uid, user_id: this.data.user_id },
      method: "POST",
      success: res => {
        if (res.data.ret == 1) {
          this.setData({
            userMessage: res.data.data
          })
          console.log(res)
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
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
  },
  showInput2(e) {
    id = e.currentTarget.dataset.id
    to_user_id = 0
    this.setData({
      hide: 0,
      nick: ''
    })
  },
  hideInput2() {
    this.setData({
      hide: 1
    })
  },
  replyInput2(e) {
    this.setData({
      content: e.detail.value
    })
  },
  replyUser2(e) {
    id = e.currentTarget.dataset.id
    var nick = e.currentTarget.dataset.nick
    to_user_id = e.currentTarget.dataset.userid
    this.setData({
      hide: 0,
      nick: nick
    })
    console.log(this.data)
  },
  replyClick2() {
    if (this.data.content == '') {
      app.showTips('提示', '请输入内容', false)
      return
    }
    wx.request({
      url: app.globalData.apiUrl + 'dynamic_message.php',
      data: { id: id, uid: app.globalData.uid, content: this.data.content, to_user_id: to_user_id },
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
  thumbsUp2(e) {
    id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.apiUrl + 'dynamic_up.php',
      data: { id: id, uid: app.globalData.uid },
      method: 'POST',
      success: res => {
        console.log(res)
        if (res.data.ret == 1) {
          this.getList();
          id = 0;
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  addFollow(){
    wx.request({
      url: app.globalData.apiUrl + 'add_follow.php',
      data: { user_id: this.data.user_id, uid: app.globalData.uid },
      method: 'POST',
      success: res => {
        if (res.data.ret == 1) {
          this.setData({
            isFollow:1
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  }
})