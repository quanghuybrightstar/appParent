class MarkData {

    static curMarkData = [];



    static curMarkListsData = {
        errList: [], fixList: [], cachesList: []
    };

    static curScoreList = [];

    static totalScore = 0;

    static changrMarkData(word , explain, selectionStart, selectionEnd , type , isDeleteWrongWord){
        var kqlist = MarkData.curMarkData;

        var sumLength = 0;
        var indexStart = 0;
        var indexEnd = 0;
        for (var i=0;i<MarkData.curMarkData.length;i++){
            if(!MarkData.curMarkData[i].text) {
                console.log('loi o index ', i)
                continue 
            }
            if(sumLength<selectionStart){
                sumLength = sumLength + MarkData.curMarkData[i].text.length + MarkData.curMarkData[i].fix_text?MarkData.curMarkData[i].fix_text.length : 0;
                console.log('sumLength '+i+":", sumLength)
            }else{
                indexStart = i;
                break
            }
        }

        sumLength = 0;
        for (var i=0;i<MarkData.curMarkData.length;i++){
            if(sumLength<selectionEnd){
                sumLength = sumLength + MarkData.curMarkData[i].text.length + MarkData.curMarkData[i].fix_text?MarkData.curMarkData[i].fix_text.length : 0;
                console.log('sumLength '+i+":", sumLength)
            }else{
                indexEnd = i;
                break
            }
        }

        if(indexStart == indexEnd){
            var mono = {
                text: MarkData.curMarkData[indexStart].text,
                origin: "mark",
                fix_text: word,
                explain: explain,
                isDelete: isDeleteWrongWord,
                isBehigh: type==0?true:false
            }
            kqlist[indexStart] = mono;
            console.log("++++++++++kqlist",kqlist)
            MarkData.curMarkData = kqlist;
        }
        console.log("++++++++==selectionStart",selectionStart)
        console.log("++++++++++selectionEnd",selectionEnd)
        console.log("+++++++++=indexStart",indexStart)
        console.log("++++++++++indexEnd",indexEnd)
        console.log("++++++++++MarkData.curMarkData",MarkData.curMarkData)

        var resultList = []
        for (var i=0;i<=indexEnd-indexStart;i++){
            
        }
    }
  }
  export default MarkData;