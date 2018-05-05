//circle.js
//获取应用实例
const app = getApp()
var istoday=0;
Page({
  data: {
    menuSelected:0,
    hide:1,
    data:{}
  },
  onLoad: function () {
    this.getList();
  },
  getList(){
    wx.request({
      url: app.globalData.apiUrl + 'get_dynamic.php',
      data: { uid: app.globalData.uid,istoday: istoday},
      method:"POST",
      success:res=>{
        if(res.data.ret==1){
          this.setData({
            data:res.data.data
          })
          console.log(res)
        }else{
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  menuClicked: function (event) {
    var menutype = event.currentTarget.dataset.menutype;
    if (this.data.menuSelected == menutype) {
      return;
    }
    this.setData({
      menuSelected: menutype
    })
  },
  showInput(){
    this.setData({
      hide: 0
    })
  },
  hideInput(){
    this.setData({
      hide:1
    })
  },
  replyClick(){
    console.log(1)
  }
})
