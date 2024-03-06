class LogBase{

    static isDebug = true;

    static log(name, body){
       if(LogBase.isDebug)
            console.log("====="+name,body);
    }

    // static log(body){
    //    if(LogBase.isDebug)
    //         console.log("=====",body);
    // }

    static logLong(name, body){
       if(LogBase.isDebug){
        console.log("==-==-==-==-==-==-==-==");
        console.log("====="+name,body);
       }
    }
}
export default LogBase;