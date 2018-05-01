//app.js
App({
  onLaunch: function () {
    this.getUserAuth()
  },
  getUserAuth() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] || res.authSetting['scope.userInfo'] == undefined) {
          this.appGetUserInfo();
        } else {
          //console.log(2)
          wx.navigateTo({
            url: '/pages/error/error'
          })
          //this.showAuthTips();
        }
      }
    })
  },
  appGetUserInfo() {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        this.wxLogin();
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      },
      fail: res => {
        wx.navigateTo({
          url: '/pages/error/error',
        })
        //this.showAuthTips();
      }
    })
  },
  globalData: {
    apiUrl: 'https://www.haiwaixiaomayi.com/api/',
    userInfo: null,
    uid: null,
    lon: 0,
    lat: 0
  },
  wxOpneSetting() {
    wx.openSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
          this.appGetUserInfo()
        }
        if (res.authSetting["scope.userLocation"]) {
          //this.globalData.cityChage = true;
          //this.globalData.getNewIndex = true;
        }
      }, fail: function (res) { }
    })
  },
  wxLogin() {
    var that = this;
    wx.login({
      success: function (loginCode) {
        let uinfo = that.globalData.userInfo
        wx.request({
          url: that.globalData.apiUrl + 'get_openid.php',
          data: { code: loginCode.code, uinfo: uinfo },
          method: "POST",
          success: function (res) {
            if (res.data.ret == 1) {
              that.globalData.uid = res.data.data
              console.log(that.globalData.uid)
              if (that.wxLoginCallback) {
                that.wxLoginCallback()
              }
            } else {
              that.showTips(res.data.title, res.data.msg, false);
            }
          }
        })
      }
    })
  },
  showTips(title, content, showCancel) {
    if (!title || !content) {
      return;
    }
    wx.showModal({
      title: title,
      content: content,
      showCancel: showCancel
    })
  }, 
  showAuthTips(content) {
    wx.showModal({
      title: '提示',
      content: content == '' ? '您点击了拒绝授权，将无法正常使用，点击确定重新获取授权。' : content,
      success: res => {
        if (res.confirm) {
          this.wxOpneSetting();
        }
      }
    })
  }
})