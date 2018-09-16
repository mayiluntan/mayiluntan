// pages/view/report/report.js
const app=getApp();
var source = 1;
var source_id = 0;
var lock=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:1,
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    lock=false;
    source = options.source ? options.source : 1;
    source_id = options.source_id ? options.source_id : 0;
    wx.request({
      url: app.globalData.apiUrl + 'v6/get_report.php?uid=' + app.globalData.uid + '&source=' + source + '&source_id=' + source_id,
      success: res => {
        if(res.data.data==1){
          this.setData({
            isShow:0
          })
        }
      }
    })
  },
  cancelClick(){
    wx.navigateBack({
      
    })
  },
  sendClick(e){
    if (lock){
      return;
    }
    var content=this.data.content
    if(content==''){
      app.showTips('提示', '请输入内容', false);
      return;
    }
    lock=true;
    wx.request({
      url: app.globalData.apiUrl + 'v6/add_report.php',
      method:'POST',
      data: { uid: app.globalData.uid, source: source, source_id: source_id, content: content},
      success:function(res){
        if(res.data.ret==1){
          wx.showToast({
            title: '举报成功',
            mask:'true',
            success:function(){
              setTimeout(function(){
                wx.navigateBack({

                })
              },1500)
              
            }
          })
          
        }else{
          lock=false;
          app.showTips('提示', '举报失败', false);
        }
      }
    })
  },
  contentInout(e){
    var v = e.detail.value
    this.setData({
      content:v
    })
  }
})