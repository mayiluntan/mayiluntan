// pages/user/manageActive/manageActive.js
const app = getApp()
var id = 0;
var userid = 0;
Page({
  data: {
    menuSelected: 0
  },
  onLoad: function () {
    this.getList();
  },
  menuClicked: function (event) {
    var menutype = event.currentTarget.dataset.menutype;
    if (this.data.menuSelected == menutype) {
      return;
    }
    this.setData({
      menuSelected: menutype,
      data:{}
    })
    this.getList();
  },
  getList() {
    wx.request({
      url: app.globalData.apiUrl + 'get_dynamic.php',
      data: { uid: app.globalData.uid, mine: 1, mineType: this.data.menuSelected},
      method: "POST",
      success: res => {
        if (res.data.ret == 1) {
          this.setData({
            data: res.data.data
          })
          console.log(res)
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
    console.log(this.data)
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
  deleteOne(e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: res => {
        if (res.confirm) {
          wx.request({
            url: app.globalData.apiUrl + 'del_dynamic.php',
            data: { id: id, uid: app.globalData.uid },
            method: 'POST',
            success: res => {
              if (res.data.ret == 1) {
                this.getList();
              } else {
                app.showTips(res.data.title, res.data.msg, false);
              }
            }
          })
        }
      }
    })
  }
})



