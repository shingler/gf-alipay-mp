var api_prefix = getApp().globalData.rest.prod;
// var api_prefix = getApp().globalData.rest.dev;
var userInfo;
Page({
  data: {},
  onLoad() {
    let token = my.getStorageSync({ key: "gf_token" }).data;
    // console.log(token);
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
        // console.log(authCode);
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
            // console.log(res);
            // 将应用token保存到storage
            my.setStorage({
              key: "gf_token",
              data: res.data.data.token,
              success: result => {
                my.getStorage({
                  key: "gf_token",
                  success: result => {
                    // console.log(result.data);
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
    // console.log(token);
    my.request({
      url: api_prefix.userInfo,
      data: { token: token },
      success: res => {
        // console.log(res);
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
          userInfo = res.data;
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
  },
  // 修改用户名
  go_changename() {
    my.navigateTo({ url: "/pages/me/changename/changename" });
  },
  // 修改头像
  chooseImage() {
    // 获取上传签名
    let token = my.getStorageSync({ key: "gf_token" }).data;
    let sign;
    let that = this;
    my.request({
      url: api_prefix.avatar_sign,
      data: { token: token },
      method: "get",
      dataType: "json",
      success: res => {
        // console.log(res);
        sign = res.data.data;
      }
    });
    // 选择图片
    my.chooseImage({
      sourceType: ["camera", "album"],
      count: 1,
      success: res => {
        // console.log(res.apFilePaths);
        const path = res.apFilePaths[0];
        my.uploadFile({
          url: sign.host,
          fileType: "image",
          fileName: "file",
          filePath: path,
          formData: {
            key: sign.dir + "/" + userInfo.id,
            policy: sign.policy,
            OSSAccessKeyId: sign.accessid,
            signature: sign.signature,
            success_action_status: "200"
          },
          success: res => {
            // 默认上传成功状态码为204，此处被success_action_status设置为200。
            // console.log(res);
            if (res.statusCode === "200") {
              // console.log("上传成功");
              // 通知服务器更新头像
              my.request({
                url: api_prefix.change_avatar,
                method: "post",
                dataType: "json",
                data: { token: token },
                success: res => {
                  userInfo.userprofile.avatar = res.data.data;
                  that.setData({
                    userInfo: userInfo
                  });
                  my.showToast({
                    type: "success",
                    content: "头像上传成功",
                    duration: 3000
                  });
                },
                fail: res => {}
              });
            }
          },
          fail: err => {
            console.log(err);
          }
        });
      }
    });
  }
});
