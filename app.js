// const myPlugin = requirePlugin("myPlugin");
import PubSub from "./assets/js/event.js";

App({
  // gf code
  globalData: {
    userInfo: null,
    rest: {
      dev: {
        list: "http://127.0.0.1:8100/games/",
        detail: "http://127.0.0.1:8100/games/",
        magzine: "http://127.0.0.1:8100/magzine/",
        related: "http://127.0.0.1:8100/serial/"
      },
      prod: {
        list: "https://api.gf-app.cn/games/",
        detail: "https://api.gf-app.cn/games/",
        magzine: "https://api.gf-app.cn/magzine/",
        related: "https://api.gf-app.cn/serial/"
      }
    }
  }
});
