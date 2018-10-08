const app = getApp()

Page({
  data: {
    list: [
      { name: '个人主页', page: '/pages/user/personal/personal','text':'','copy':''},
      { name: '帖子管理', page: '/pages/user/managePost/managePost', 'text': '', 'copy': ''},
      { name: '动态管理', page: '/pages/user/manageActive/manageActive', 'text': '', 'copy': ''},
      { name: '关注的人', page: '/pages/user/attentions/attentions', 'text': '', 'copy': ''},
      { name: '我的收藏', page: '/pages/user/collect/collect', 'text': '', 'copy': '' },
      { name: '联系客服', page: '', 'text': '客服微信：xiaomayikefu0', 'copy': 'xiaomayikefu0'},
      { name: '关于我们', page: '/pages/user/about/about', 'text': '', 'copy': '' },
    ],
    userInfo:[],
    showData:[0,0,0]
  },
  onLoad: function () {
      this.setData({
        userInfo: app.globalData.userInfo
      })
  },
  listClick(e) {
    var page = e.currentTarget.dataset.page
    if (page != '') {
      wx.navigateTo({
        url: page + '?user_id=' + app.globalData.userId,
      })
    }
  },
  copyText(e) {
    var v = e.currentTarget.dataset.content
    if (v == '') {
      return;
    } else {
      wx.setClipboardData({
        data: v,
        success: function (res) {
          wx.showToast({
            title: '已复制',
            icon: 'success'
          })
        }
      })
    }
  }
})