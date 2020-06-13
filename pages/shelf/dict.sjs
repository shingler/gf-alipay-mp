var currency = {
  getName: function(cname) {
    var name = "";
    switch (cname) {
      case "HKD":
        name = "港币";
        break;
      case "USD":
        name = "美元";
        break;
      case "JPY":
        name = "日元";
        break;
      case "ZAR":
        name = "南非元";
        break;
    }
    return name;
  }
};

var area = {
  //通过国家代码返回国家名
  getName: function(country_code) {
    var country_name = "";
    switch (country_code) {
      case "HK":
        country_name = "港服";
      case "JP":
        country_name = "日服";
      case "US":
        country_name = "美服";
      case "ZA":
        country_name = "南非服";
    }
    return country_name;
  },
  //根据国家代码获取国旗
  getFlag: function(country_code) {
    var flag = "";
    switch (country_code) {
      case "HK":
        flag = "🇭🇰";
        break;
      case "JP":
        flag = "🇯🇵";
        break;
      case "US":
        flag = "🇺🇸";
        break;
      case "ZA":
        flag = "🇿🇦";
        break;
    }
    return flag;
  }
};

export default {
  getCurrencyName: currency.getName,
  getAreaName: area.getName,
  getAreaFlag: area.getFlag
};
