// pages/publish/post/post.js
const app = getApp();
const MinContentCount = 10;
const MaxVideoDuration = 60;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    tip: '至少' + MinContentCount + '个字哦',

    MaxPicCount: 5,
    MaxVideoCount: 1,
    picCount: 0,
    videoCount: 0,
    pics: [],
    video: null,

    buttonDisabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  contentInput(e) {
    this.data.content = e.detail.value.trim();

    this.updateTip();
  },

  updateTip() {

    var tip = '';
    var disabled = true;
    if (this.data.content.length < 10) {
      tip = '至少' + MinContentCount + '个字哦';
    } else {
      if (this.data.picCount == 0 && this.data.videoCount == 0) {
        tip = '添加图片或视频，让点评更棒~';
      }
      disabled = false;
    }

    this.setData({
      tip: tip,
      buttonDisabled: disabled
    });
  },

  addPic() {
    var that = this;
    wx.chooseImage({
      count: that.data.MaxPicCount,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          pics: tempFilePaths,
          picCount: tempFilePaths.length
        });
        that.updateTip();
        console.log(that.data.pics);
      }
    })
  },

  addVideo() {
    var that = this;
    wx.chooseVideo({
      maxDuration: MaxVideoDuration,
      success: function (res) {
        if (res.duration > MaxVideoDuration) {
          wx.showToast({
            title: '请选择' + MaxVideoDuration + 's以内的视频',
            icon: 'none',
            duration: 2000
          });
          return;
        }

        that.setData({
          video: res,
          videoCount: 1
        });
        that.updateTip();
        console.log(that.data.video);
      }
    })
  },
  videoClicked() {
    var videoId = 'video';
    this.data.videoContext = wx.createVideoContext(videoId);
    this.data.videoContext.play();
    this.data.videoContext.requestFullScreen();
  },
  fullScreenChange(e) {
    console.log(e);
    if (!e.detail.fullScreen && this.data.videoContext) {
      this.data.videoContext.pause();
    }
  },
  imageClicked: function (e) {
    var index = e.currentTarget.dataset.index;
    if (index >= this.data.pics.length || index < 0) return;

    var that = this;
    wx.previewImage({
      urls: that.data.pics,
      current: that.data.pics[index]
    })
  },
  deleteVideoClicked() {

    var that = this;
    this.setData({
      video: null,
      videoCount: 0
    });
    this.updateTip();
  },
  deletePicClicked(e) {
    var index = e.currentTarget.dataset.index;
    if (index >= this.data.pics.length || index < 0) return;

    this.data.pics.splice(index, 1);
    var that = this;
    this.setData({
      pics: that.data.pics,
      picCount: that.data.pics.length
    });
    this.updateTip();
  },
  submitClicked() {
    if (this.data.content.length < 10) {
      wx.showToast({
        title: '至少' + MinContentCount + '个字哦',
        icon: 'none'
      });
      return;
    }

    var promises = [];
    var picIds = [];
    var videoId = 0;
    var that = this;
    if (this.data.videoCount > 0) {
      var video = that.data.video;
      let uploadVideo = new Promise(resolve => {
        wx.uploadFile({
          url: 'https://www.qubaobei.com/',
          filePath: video.tempFilePath,
          name: 'video',
          formData: {
            size: video.size,
            duration: video.duration,
            width: video.width,
            height: video.height,
          },
          success: function (res) {
            // res => video id
          },
          complete: function () {
            resolve(1);
          }
        })
      });
      promises.push(uploadVideo);
    }
    if (this.data.picCount > 0) {
      for (var i = 0; i < this.data.pics.length; i++) {
        let uploadPic = new Promise(resolve => {
          wx.uploadFile({
            url: 'https://www.qubaobei.com/',
            filePath: that.data.pics[i],
            name: 'pic' + i,
            success: function (res) {
              // res => pic ids
            },
            complete: function () {
              resolve(i + 2);
            }
          })
        });
        promises.push(uploadPic);
      }
    }


    if (promises.length > 0) {
      Promise.all(promises).then(() => {
        //根据返回的 picids videoid 提交数据
      });
    } else {
      //直接提交文字数据
    }
  }
})