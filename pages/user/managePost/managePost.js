// pages/user/managePost/managePost.js
const app = getApp()
var lock = false;
Page({
  data: {
    menuSelected: 0
  },
  onLoad: function () {
    this.getIndexList()
  },
  menuClicked: function (event) {
    var menutype = event.currentTarget.dataset.menutype;
    if (this.data.menuSelected == menutype) {
      return;
    }
    this.setData({
      menuSelected: menutype
    })
    this.getIndexList();
  },
  getIndexList() {
    wx.request({
      url: app.globalData.apiUrl + 'get_list.php?uid=' + app.globalData.uid + '&type=' + this.data.menuSelected,
      success: res => {
        this.setData({
          listData: res.data.data
        })
      }
    })
  }, 
  copyText(e) {
    lock = true;
    var v = e.currentTarget.dataset.wechat
    if (v == '') {
      wx.showToast({
        title: '未填写微信号',
        icon: 'none'
      })
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
  },
  callPhone(e) {
    lock = true;
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      complete: res => {
        lock = false;
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
  deletePost(e){
    lock = true;
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否删除帖⼦',
      success:res=>{
        console.log(res.confirm)
      },
      complete: res => {
        lock = false;
      }
    })
  },
  toTop(e){
    lock = true;
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '是否花费10元置顶',
      success: res => {
        console.log(res)
      },
      complete: res => {
        lock = false;
      }
    })
  }
})
