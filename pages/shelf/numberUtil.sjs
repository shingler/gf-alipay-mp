//小数点后几位小数
function numberFormat(value, digital=2) {
  var v = parseFloat(value);
  return v.toFixed(digital);
}

//暴露接口可用
export default {
  numberFormat: numberFormat
};
