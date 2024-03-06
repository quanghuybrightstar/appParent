import API from '../API/APIConstant';
import api from '../API/APIConstant';
import LogBase from '../base/LogBase';
import SmartScreenBase from '../base/SmartScreenBase';

const validWord = (s) => {
  if (!s || s.length == 0) {
    return s;
  }
  let res = s
    .toLowerCase()
    .replace(/[‘\u2018\u2019]/g, "'")
    .trim();
  while (res.indexOf('  ') > -1) {
    res = res.replace(/ {2}/g, ' ');
  }
  while (
    res.charAt(res.length - 1) === '.' ||
    res.charAt(res.length - 1) === ','
  ) {
    res = res.substring(0, res.length - 1).trim();
  }
  return res.trim();
};
const validWordNoLower = (s) => {
  if (!s) {
    return s;
  }
  let res = s.replace(/[‘\u2018\u2019]/g, "'").trim();
  while (res.indexOf('  ') > -1) {
    res = res.replace(/ {2}/g, ' ');
  }
  while (
    res.charAt(res.length - 1) === '.' ||
    res.charAt(res.length - 1) === ','
  ) {
    res = res.substring(0, res.length - 1).trim();
  }
  return res.trim();
};
const shuffleArray = (arr) => {
  var array = [...arr];
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
const parseStringToDate = (s) => {
  //"2021-01-22 12:00:00"
  var ss = s.split(' ');
  var dd = ss[0].split('-');
  var hh = ss[1].split(':');
  return new Date(
    parseInt(dd[0]),
    parseInt(dd[1]) - 1,
    parseInt(dd[2]),
    parseInt(hh[0]),
    parseInt(hh[1]),
    parseInt(hh[2]),
  );
};
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getRandomElFromArr = (arr) => {
  console.log('length', arr.length);
  const rd = getRandomInt(0, arr.length - 1);
  console.log('random', rd);
  return arr[rd];
};
function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .trim();
}

const getLink = (s) => {
  if (!s) {
    return s;
  }
  if (s.indexOf('http') == 0) {
    return s;
  }
  return `${api.domain}${s}`;
};

// check xem có phải link một file video ko
const isVideoLink = (string) => {
  const videoTypes = ['mp4', 'mp3'];
  var mstr = string.slice(string.length - 3)
  LogBase.log("=====isVideoLink", mstr)
  return videoTypes.includes(mstr);
};

// sài dc cả link full và link rút gọn từ API trả về
const convertUrlMedia = (string) => {
  var resu = ""
  if(!string || string == "") return ""
  const mstr = string.split("http")
  if(mstr.length <= 1){
    resu = API.image_base_url + string
  }else
    resu = string
  LogBase.log("=====convertUrlMedia", resu)
  return resu;
};

// check loại file từ string type trả về (vd: video/mp4)
const checkTypeRS = (string) => {
  if(!string || string == "") return ""
  const mstr = string.split("/")
  LogBase.log("=====checkTypeRS", mstr[0])
  return mstr[0];
};

export function fixedStringNumber(numberStr = '', fractionDigits = 1) {
  const number = Number.parseFloat(numberStr);

  const fraction = Number.isInteger(number) ? 0 : fractionDigits;
  return number.toFixed(fraction);
}

// Chuyển text có \n về list từng dòng text.
const toListDownLine = (string) => {
    var str
    try {
      str = string.replace('\t', ' ');
    } catch (error) {
      str = string
    }
    var strList = str.split('\n')
    return strList
}

// Chuyển text từ có dấu sang ko dấu.
const ConvertVNtoEN = (string) => {

  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substring(1) + ']', 'g');
    var char = AccentsMap[i][0];
    string = string.replace(re, char);
  }
  var resultStr = ""
  for (var i=0; i<string.length; i++) {
    if(string.charCodeAt(i)<200){
      resultStr = resultStr+string[i]
    }
  }
  return resultStr;
}

// chuyen text dai thanh text co ...
const fitLongTextbyDot = (string, widthBy) => {
  var sl = parseInt(widthBy/(SmartScreenBase.smPercenWidth*1.25))
  var str = ""
  if(string.length > sl)
    str = string.substring(0,sl) + "..."
  else
    str = string
  return str
}

// loại bỏ các ký tự đặc biệt phổ biến
const removeSpecialWord = (string) => {
  return string.replace('?','').replace('.','').replace(',','').replace('!','')
}

// Random text phân cách bởi dấu /
const randomXuocText = (string) => {
  console.log("=====randomXuocText0",string)
  if(!string) {return ""}
  //var str = string.replace('\n', '').replaceAll('\t', '');
  var strList = string.split('/')
  console.log("=====randomXuocText1",strList)
  for(var i=0;i<strList.length;i++){
    var index = Math.floor(Math.random() * strList.length)
    var a = strList[index]
    strList[index] = strList[i]
    strList[i] = a
  }
  var resStr = ""
  for(var i=0;i<strList.length;i++){
    resStr = resStr + strList[i] + (strList.length > (i+1) ? "/ " : "")
  }
  console.log("=====randomXuocText2",strList)
  // console.log("=====randomXuocText",reslist)
  return resStr
}

// cắt text trong {} 
const filterTextInNgoac = (string) => {
  var kq = string
  var count = string.split('{')
  for (var i=0; i<count.length-1; i++) {
    var sttmo = kq.search('{')
    var sttdong = kq.search('}')
      var dau = kq.substring(0, sttmo)
      var giua = "#=@"+kq.substring(sttmo+1, sttdong)
      var cuoi = "@=#"+kq.substring(sttdong+1, kq.length)
      var xlgiua = giua.toString().replace(' ','').replace(' ','').replace(' ','')
      kq = dau+xlgiua+cuoi
      // LogBase.log("=====filterTextInNgoac 1",sttmo, sttdong)
      // LogBase.log("=====filterTextInNgoac 2",dau)
      // LogBase.log("=====filterTextInNgoac 3",giua)
      // LogBase.log("=====filterTextInNgoac 4",cuoi)
      // LogBase.log("=====filterTextInNgoac 5",kq)
  }
  for (var i=0; i<count.length-1; i++) {
    kq = kq.replace("#=@",'{').replace("@=#",'}')
  }
  // LogBase.log("=====filterTextInNgoac 6",kq)
  return kq
}

// So sánh phẩy trên máy tính vs điện thoại 8216,8217,2018,2019
const compareComma = (str) => {
  var phayList = [8216,8217,2018,2019,39]
  var fixList = []
  var result = str
  for(var i=0; i<result.length; i++ ){
    if(phayList.find((ele) => ele == result[i].charCodeAt(0))){
      fixList.unshift(i)
    }
  };
  fixList.forEach(mono => {
    result = result.substring(0, mono) + result.substring(mono+1, result.length)
  });
  console.log("=====fixList",fixList)
  return result
}

// JSON parse control
const jsonParse = (json) => {
  try {
    return JSON.parse(json)
  } catch (error) {
    console.log("=====jsonParse",error)
    return null
  }
}

// Viết hoa chữ cái đầu
const upCaseFirstChar = (str) => {
  var resu = str
  if(str && str.length == 1){
    resu = resu.toUpperCase()
  }else if(str && str.length > 1){
    resu = resu.substring(0,1).toUpperCase() + resu.substring(1,(resu.length))
  }
  return resu
}

// Thêm , vào số tiền
const moneyForm = (str) => {
  if(!str) return ""
  var resu = str.toString().trim()
  if(resu.length > 3 && resu.length < 7){
    resu = resu.substring(0,resu.length-3) + "." + resu.substring(resu.length-3,resu.length)
  }else if(resu.length > 6 && resu.length < 10){
    resu = resu.substring(0,resu.length-6) + "." + resu.substring(resu.length-6,resu.length-3) + "." + resu.substring(resu.length-3,resu.length)
  }
  return resu
}

// Làm tròn 2 chữ số
const roundTwo = (str) => {
  if(!str) return ""
  var kq = Math.round(str*100)
  var resu = kq/100
  return resu
}

// Làm tròn 1 chữ số
const roundOne = (str) => {
  if(!str) return "0"
  var kq = parseFloat(Math.round(str*10))
  var resu = kq/10
  return resu
}

export default {
  validWord,
  shuffleArray,
  getRandomInt,
  getRandomElFromArr,
  parseStringToDate,
  removeAccents,
  validWordNoLower,
  getLink,
  isVideoLink,
  toListDownLine,
  ConvertVNtoEN,
  randomXuocText,
  filterTextInNgoac,
  compareComma,
  jsonParse,
  removeSpecialWord,
  upCaseFirstChar,
  moneyForm,
  roundTwo,
  roundOne,
  checkTypeRS,
  fitLongTextbyDot,
  convertUrlMedia
};
