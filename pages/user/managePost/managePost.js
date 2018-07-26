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
      menuSelected: menutype,
      listData:{}
    })
    this.getIndexList();
  },
  getIndexList() {
    if (this.data.menuSelected==2){
      var url = app.globalData.apiUrl + 'get_my_business.php?uid=' + app.globalData.uid;
    }else{
      var url = app.globalData.apiUrl + 'v4/get_list.php?uid=' + app.globalData.uid + '&mine=1&mineType=' + this.data.menuSelected;
    }
    wx.request({
      url: url,
      success: res => {
        if (res.data.ret == 1) {
          this.setData({
            listData: res.data.data
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
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
    var v = e.currentTarget.dataset.id;
    if (this.data.menuSelected==2){
      wx.navigateTo({
        url: '/pages/view/businessDetail/businessDetail?id=' + v,
      })
    }else{
      wx.navigateTo({
        url: '/pages/view/viewDetail/viewDetail?id=' + v,
      })
    }
    
  },
  deletePost(e){
    lock = true;
    var id = e.currentTarget.dataset.id
    var title = e.currentTarget.dataset.title
    title = title == '' ? '小蚂蚁':title;
    if (this.data.menuSelected==2){
      wx.showModal({
        title: '提示',
        content: '是否删除商户',
        success: res => {
          if (res.confirm) {
            wx.request({
              url: app.globalData.apiUrl + 'del_business.php',
              data: { id: id, uid: app.globalData.uid },
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
    }else{
      wx.showModal({
        title: '提示',
        content: '是否删除帖⼦',
        success:res=>{
          if(res.confirm){
            wx.request({
              url: app.globalData.apiUrl + 'del_post.php',
              data: { id: id, uid: app.globalData.uid },
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
  },
  editPost(e){
    lock = true;
    var id = e.currentTarget.dataset.id
    if (this.data.menuSelected == 2) {
      wx.navigateTo({
        url: '/pages/publish/business/business?id=' + id,
        complete: res => {
          lock = false;
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/publish/post/post?id=' + id,
        complete: res => {
          lock = false;
        }
      })
    }
    
  },
  toTop(e){
    lock = true;
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否花费10元置顶',
      success: res => {
        if (res.confirm) {
          if (this.data.menuSelected == 2) {
            var source=4;
          }else{
            var source=3;
          }
          wx.request({
            url: app.globalData.apiUrl + 'retop.php',
            data: { id: id, uid: app.globalData.uid, source:source},
            method: 'POST',
            success: res => {
              if (res.data.ret == 1) {
                wx.requestPayment({
                  'timeStamp': res.data.pay_info.timeStamp,
                  'nonceStr': res.data.pay_info.nonceStr,
                  'package': res.data.pay_info.package,
                  'signType': 'MD5',
                  'paySign': res.data.pay_info.paySign,
                  'success': function (res) {
                    wx.showToast({
                      title: '置顶成功',
                      icon: 'success'
                    })
                  },
                  'fail': function (res) {
                    wx.showToast({
                      title: '取消置顶',
                      icon: 'none'
                    })
                  },
                  'complete': function (res) {
                  }
                })
                
              } else {
                app.showTips(res.data.title, res.data.msg, false);
              }
            },
            complete: res => {
              lock = false;
            }
          })
        }
      },
      complete: res => {
        lock = false;
      }
    })
  },
  onShareAppMessage: function (res) {
    lock = true;
    var id = res.target.dataset.id;
    var title = res.target.dataset.title;
    title = title == '' ? '小蚂蚁' : title;
    return {
      title: title,
      path: '/pages/index/index?id=' + id,
      imageUrl:"/images/share.jpg",
      success: function (res) {
        wx.request({
          url: app.globalData.apiUrl + 'post_share.php',
          data: { id: id, uid: app.globalData.uid },
          method: 'POST',
          success: res => {
            if(res.data.ret==0){
              app.showTips(res.data.title, res.data.msg, false);
            }else{
              wx.showToast({
                title: '刷新成功',
                icon: 'success'
              });
              this.getIndexList();
            }
          }
        })
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      },
      complete:res=>{
        lock = false;
      }
    }
  },
  goShare(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/share/share?id=' + id,
    })
  }
})
