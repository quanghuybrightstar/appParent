import moment from "moment";
import LogBase from "../base/LogBase"

// so sánh ngày
const compareDate = (date1, date2) => {
    try {
        LogBase.log("=====compareDate",date1,date2)
        var time1 = moment(date1).toDate().getTime();
        var time2 = moment(date2).toDate().getTime();
        LogBase.log("=====compareDate",time1,time2)
        if(time1 > time2){
            return 1 // lớn hơn
        }else if(time1 == time2){
            return 0 // bằng
        }else{
            return -1 // nhỏ hơn
        }
    } catch (error) {
        return -2 // lỗi
    }
  };

  const convertSecondToMinute = (sec) => {
    var minS = parseInt(sec / 60);
    var secS = sec - minS*60;
    var str = "";
    if(minS>0){ str = str + minS + " phút " }
    if(secS>=0){ str = str + secS + " giây" }
    LogBase.log("=====convertSecondToMinute "+sec+" | "+str)
    return str;
  };

  const convertSecondToMM_SS = (sec) => {
    var minS = parseInt(sec / 60);
    var secS = sec - minS*60;
    if(secS < 10) secS = "0"+secS
    if(minS < 10) minS = "0"+minS 
    var str = minS+":"+secS;
    LogBase.log("=====convertSecondToMM_SS "+sec+" | "+str)
    return str;
  };

  export default {
    compareDate,
    convertSecondToMinute,
    convertSecondToMM_SS
  };  