// pages/user/personal/edit/edit.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'endDate':'',
    'sexArray': ['女', '男'],
    'date': '',
    'info':{
      'gender': 1,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var utils = require('../../../../utils/util.js');
    this.setData({
      endDate: utils.formatDate(new Date()),
      date: utils.formatDate(new Date())
    })
    wx.request({
      url: app.globalData.apiUrl +'get_uinfo.php',
      data:{uid:app.globalData.uid},
      method:'POST',
      success:res=>{
        if(res.data.ret==1){
          this.setData({
            info:res.data.data
          })
        }else{
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },

  datePickerChange: function (e) {
    var date = e.detail.value;
    if (this.data.date == date) return;
    this.setData({
      date: date
    });
  },
  genderChange(e){
    var v = e.detail.value;
    var info = this.data.info
    if (info.gender == v) return;
    info.gender=v;
    this.setData({
      info: info
    })
  },
  nicknameInput(e) {
    var info = this.data.info
    info.nickname = e.detail.value
    this.setData({
      info: info
    })
  },
  mobileInput(e) {
    var info = this.data.info
    info.mobile = e.detail.value
    this.setData({
      info: info
    })
  },
  remarkInput(e) {
    var info = this.data.info
    info.remark = e.detail.value
    this.setData({
      info: info
    })
  }, 
  editClick() {
    var info = this.data.info
    if (info.nickname == '') {
      app.showTips('提示', '请输入昵称', false)
      return
    }
    var mobileReg = /^[1][0-9]{10}$/;
    if (!mobileReg.test(info.mobile)) {
      app.showTips('提示', '手机号有误', false);
      return;
    }
    info.uid = app.globalData.uid
    info.birth=this.data.date
    wx.request({
      url: app.globalData.apiUrl + 'save_info.php',
      data: info,
      method: 'POST',
      success: res => {
        if (res.data.ret == 1) {
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          })
          setTimeout(function () {
            wx.hideToast()
            wx.navigateBack({
              
            })
          }, 2000)
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  addPic(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var info = that.data.info;
        for (var i = 0; i < tempFilePaths.length; i++) {
          var img = tempFilePaths[i];
          wx.uploadFile({
            url: app.globalData.apiUrl + 'upload_head.php',
            filePath: img,
            name: 'file',
            formData: {
              'uid': app.globalData.uid
            },
            success: res => {
              if (res.data == 0) {
                app.showTips('提示', '上传失败', false);
              } else {
                info.avatar = res.data
                that.setData({
                  info: info
                });
              }
            }
          })
        }
      }
    })
  }
})