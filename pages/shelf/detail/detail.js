Page({
  data: {
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 4000,
    duration: 100,
    icon: {
      switch: "/images/icon/switch.png",
      ps4: "/images/icon/ps4.png"
    }
  },
  onLoad(request) {
    // console.log(request);
    var app = getApp();
    var that = this;
    var intro_data;
    //获取游戏信息
    my.request({
      url: app.globalData.rest.prod.detail + request["id"] + "/",
      dataType: "json",
      success: function(res) {
        res.data.cover = JSON.parse(res.data.cover.replace(/\'/g, '"'));
        res.data.thumb = JSON.parse(res.data.thumb.replace(/\'/g, '"'));
        if (res.data.mp_cover.length == 0) {
          res.data.mp_cover = res.data.cover;
        }
        if (res.data.mp_thumb.length == 0) {
          res.data.mp_thumb = res.data.thumb;
        }
        //过滤掉html标签
        res.data.intro = res.data.intro.replace(/<br>/gi, "\n\n");
        res.data.intro = res.data.intro.replace(/<\/?[^>]*>/g, "");
        // console.log(res.data.mp_thumb.length);
        // console.log(res.data.mp_thumb);
        that.setData({
          background:
            res.data.mp_thumb.length > 0
              ? res.data.mp_thumb
              : [res.data.mp_cover_detail[0]],
          info: res.data
        });
        // console.log(that.data.info.subjects)
      }
    });
    //获取评分信息
    my.request({
      url: app.globalData.rest.prod.magzine + "?gameId=" + request["id"],
      dataType: "json",
      success: function(res) {
        console.log(res);
        that.setData({
          magzine: res.data
        });
      }
    });
  },
  //跳转到媒体评测页面
  go_review(e) {
    var mid = e.target.dataset["mid"];
    my.navigateTo({
      url: "/pages/shelf/magazine/magazine?id=" + mid
    });
  }
});
