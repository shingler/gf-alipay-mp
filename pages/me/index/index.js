// var api_prefix = getApp().globalData.rest.prod
var api_prefix = getApp().globalData.rest.dev;
Page({
  data: {},
  onLoad() {
    let token = my.getStorageSync({ key: "gf_token" }).data;
    console.log(token);
    if (token) {
      this.getUserInfo(token);
    }
  },
  // 获得登录验证码
  getAuthCode() {
    let that = this;
    my.getAuthCode({
      scopes: "auth_user",
      success: ({ authCode }) => {
        console.log(authCode);
        // 调用自己的服务端接口，让服务端进行后端的授权认证，并且利用session，需要解决跨域问题
        my.request({
          url: api_prefix.login, // 该url是您自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
          data: {
            auth_code: authCode,
            platform: "alipay"
          },
          method: "POST",
          success: res => {
            // 授权成功并且服务器端登录成功
            console.log(res);
            // 将应用token保存到storage
            my.setStorage({
              key: "gf_token",
              data: res.data.data.token,
              success: result => {
                my.getStorage({
                  key: "gf_token",
                  success: result => {
                    console.log(result.data);
                  }
                });
              }
            });
            that.getUserInfo(res.data.data.token);
          },
          fail: res => {
            // 根据自己的业务场景来进行错误处理
          }
        });
      }
    });
  },

  // 取得个人信息
  getUserInfo(token) {
    let that = this;
    console.log(token);
    my.request({
      url: api_prefix.userInfo,
      data: { token: token },
      success: res => {
        console.log(res);
        if (res.data.status == 0) {
          //token不可用
          my.removeStorage({
            key: "gf_token",
            success: res => {}
          });
        } else {
          that.setData({
            userInfo: res.data,
            token: token
          });
        }
      },
      fail: res => {}
    });
  },

  // 跳转到我的收藏
  go_my_favorite() {
    my.navigateTo({
      url: "/pages/me/favorite/favorite"
    });
  }
});
