var app = getApp();
var page = 1;
var keyword = "";
var noMore = false;
var api_prefix = app.globalData.rest.prod;
// var api_prefix = app.globalData.rest.dev;

Page({
  data: {
    loading_show: "show",
    end_show: "hide"
  },
  //加载数据
  onLoad(query) {
    var that = this;
    this.get_shelf_list(that, "");
  },
  //下拉刷新
  onPullDownRefresh() {
    this.get_shelf_list(this, "", 1);
  },
  //到底部获取更多
  onReachBottom() {
    if (!noMore) {
      page++;
      this.get_shelf_list(this, keyword, page);
    }
  },

  // 获取游戏库数据
  get_shelf_list(that, keyword, page = 1) {
    console.log(keyword);
    var req_url = api_prefix.list;
    req_url += "?page=" + page;
    if (keyword.length > 0) {
      req_url += "&keyword=" + encodeURI(keyword);
    }
    my.request({
      url: req_url,
      method: "GET",
      dataType: "json",
      headers: {
        "content-type": "application/json"
      },
      success: function(res) {
        // console.log(res);
        var item = 0;
        var covers = "";
        for (item in res.data.results) {
          if (res.data.results[item]["mp_cover"].length == 0) {
            covers = res.data.results[item]["cover"].replace(/\'/g, '"');
            res.data.results[item]["mp_cover"] = JSON.parse(covers);
          }
        }
        var data_list = [];
        if (that.data.result) {
          data_list = that.data.result;
          for (item in res.data.results) {
            data_list.push(res.data.results[item]);
          }
        } else {
          data_list = res.data.results;
        }
        // console.log(data_list);
        // 是否有更多
        if (res.data.next == null) {
          noMore = true;
        }
        that.setData({
          result: data_list,
          noMore: noMore,
          loading_show: noMore ? "hide" : "show",
          end_show: noMore ? "show" : "hide"
        });
      },
      fail(res) {
        console.log("error");
        noMore = true;
        that.setData({
          loading_show: "hide",
          end_show: "show"
        });
      }
    });
  },

  /**
   * 跳转到对应的位置
   */
  go_detail: function(event) {
    // console.log(event);
    var game_id = event.target.dataset.gid;
    console.log(game_id);
    my.navigateTo({
      url: "/pages/shelf/detail/detail?id=" + game_id
    });
  },

  //处理搜索请求
  search_shelf: function(e) {
    // console.log(e);
    var keyword = e;
    var that = this;

    //先清空数据
    this.setData({
      search_result: [],
      result: []
    });

    this.get_shelf_list(that, keyword, 1);
  },

  //处理搜索栏请空
  search_clear: function(e) {
    this.setData({
      result: []
    });
    this.get_shelf_list(this, "", 1);
  }
});
