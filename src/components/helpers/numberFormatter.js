
export const formatByDecimals = (num,decimal=6) => {
  if(+num > 0){
    let arr = num.toString().split('.')
    if(arr.length > 1){
      let drob = arr[1].substr(0,decimal)
      if(decimal===0){
        return arr[0]
      }
      return arr[0]+'.'+drob
    }
  }
  return num
}

export function numberWithCommas(x, decimals) {
  if (x) {
    if (+x === 0) {
      return x;
    }
    let numFixed = decimals ? x?.toFixed(decimals) : x;
    if (numFixed === "0.00") {
      return "~0";
    }
    var str = numFixed?.toString().split(".");
    str[0] = str[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }
  return 0;
}