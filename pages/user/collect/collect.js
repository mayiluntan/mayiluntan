// pages/user/managePost/managePost.js
const app = getApp()
var lock = false;
Page({
  data: {
    listData: {}
  },
  onLoad: function () {
    this.getIndexList()
  },
  getIndexList() {
    wx.request({
      url: app.globalData.apiUrl + 'get_collect.php?uid=' + app.globalData.uid,
      success: res => {
        this.setData({
          listData: res.data.data
        })
      }
    })
  },
  viewDetail(e) {
    if (lock) {
      return
    }
    //console.log(e);
    var v = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/view/viewDetail/viewDetail?id=' + v,
    })
  },
  deleteCollect(e) {
    lock = true;
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否取消收藏',
      success: res => {
        if(res.confirm){
          wx.request({
            url: app.globalData.apiUrl + 'del_collect.php',
            data: { post_id: id, uid: app.globalData.uid},
            method: 'POST',
            success: res => {
              if (res.data.ret == 1) {
                this.getIndexList();
              } else {
                app.showTips(res.data.title, res.data.msg, false);
              }
            }
          })
        }
      },
      complete: res => {
        lock = false;
      }
    })
  }
})
