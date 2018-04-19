const app = getApp()

Page({
  data: {
    list: [
      { name: '个人主页', page: '' },
      { name: '帖子管理', page: '/pages/user/managePost/managePost' },
      { name: '动态管理', page: '/pages/user/manageActive/manageActive' },
      { name: '关注的人', page: '/pages/user/attentions/attentions' },
      { name: '我的收藏', page: '/pages/user/collect/collect' },
      { name: '关于我们', page: '/pages/user/about/about' },
    ]
  },
  onLoad: function () {

  },
  listClick(e) {
    var page = e.currentTarget.dataset.page
    if (page != '') {
      wx.navigateTo({
        url: page,
      })
    }
  }
})