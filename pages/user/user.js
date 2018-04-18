const app = getApp()

Page({
  data: {
    list:[
      { name: '个人主页', page: '' },
      { name: '帖子管理', page: '' },
      { name: '动态管理', page: '' },
      { name: '关注的人', page: '' },
      { name: '我的收藏', page: '' },
      { name: '关于我们', page: '/pages/user/about/about' },
    ]
  },
  onLoad: function () {

  },
  listClick(e){
    var page = e.currentTarget.dataset.page
    if (page!=''){
      wx.navigateTo({
        url: page,
      })
    }
  }
})