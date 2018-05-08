const app = getApp()

Page({
  data: {
    menuSelected: 0,
    data:{}
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
      data: {}
    })
    this.getList();
  },
  getList() {
    wx.request({
      url: app.globalData.apiUrl + 'get_follow.php?uid=' + app.globalData.uid + '&type=' + this.data.menuSelected,
      success: res => {
        this.setData({
          data: res.data.data
        })
      }
    })
  },
  addFollow(e) {
    var user_id = e.currentTarget.dataset.id
    var state = e.currentTarget.dataset.type
    if (state==0){
      wx.showModal({
        title: '提示',
        content: '是否取消关注',
        success: res => {
          if (res.confirm){
            wx.request({
              url: app.globalData.apiUrl + 'add_follow.php',
              data: { user_id: user_id, uid: app.globalData.uid, state: state },
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
    }else{
      wx.request({
        url: app.globalData.apiUrl + 'add_follow.php',
        data: { user_id: user_id, uid: app.globalData.uid, state: state },
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


