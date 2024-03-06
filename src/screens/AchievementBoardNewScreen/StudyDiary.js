import React, { forwardRef,useImperativeHandle } from 'react';
import {View, Text,
    TouchableOpacity,
    Dimensions,Image,
    StyleSheet,
    TouchableWithoutFeedback,
    ActivityIndicator} from 'react-native';
import LineChartScreen from './Chart';
import API from '../../API/APIConstant';
import apiBase from '../../base/APIBase';
import {useSelector} from 'react-redux';
import stringUtils from '../../utils/stringUtils';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';
import LogBase from '../../base/LogBase';

const { width, height } = Dimensions.get('window');

const _getTime = (date) => {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        second = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + second;
};
const _getMonday = (d) =>{
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
};
const _converTime = (value) => {
    let data = value.slice(8) + '/' + value.slice(5, 7);
    return data;
};
const _getMonth = (v)=>{
    return `${v.substr(5,2)}/${v.substr(0,4)}`;
};
const getWeekOfMonth = (v)=>{
    var ds = v.split('-');
    var d = new Date(parseInt(ds[0]),parseInt(ds[1]) - 1,parseInt(ds[2]));
    d.setDate(d.getDate() + 6);
    return `T${Math.ceil(d.getDate() / 7)}/${d.getMonth() + 1}`;
};
const Button = ({active,onPress,title})=>{
    return <TouchableOpacity
        style={{
            borderBottomWidth: active ? 2 : 0,
            borderBottomColor: active ? 'orange' : undefined,
            flex:1,
        }}
        onPress={onPress}>
        <Text
            style={{
                ...styles.btn2,
                fontFamily: active ? FontBase.MyriadPro_Bold : FontBase.MyriadPro_Regular,
                color: active ? 'black' : 'gray',
            }}>
            {title}
        </Text>
    </TouchableOpacity>;
};
const BtnFilter = ({title,onPress})=>{
    return <TouchableOpacity
        style={styles.fiCon}
        onPress={onPress}>
        <Text style={styles.fiTxt}>{title}</Text>
    </TouchableOpacity>;
};
const Dot = ({active})=>{
    return <View style={{
        ...styles.dotC,
        backgroundColor:active ? '#00b9b7' : '#dcdcdc',
    }} />;
};
const Component = forwardRef((props, ref ) => {
    const [type,setType] = React.useState('data_chart_diamond');
    const [color, setColor] = React.useState('#B09EFF');
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [dataChart,setDataChart] = React.useState([]);
    const [showFilter,setShowFilter] = React.useState(false);
    const [filter,setFilter] = React.useState(0);
    const [filterWidth,setFilterWidth] = React.useState(0);
    const [loading,setLoading] = React.useState(false);

    React.useEffect(()=>{
        setColor(type == 'data_chart_diamond' ? '#B09EFF' :
            type == 'data_chart_duration' ? '#3497FD' : '#47a49d');
    },[type]);

    React.useEffect(()=>{
        callData()
    },[filter]);

    useImperativeHandle(ref, () => ({
        callData
      }));

    const callData = ()=>{
        console.log("=====Call data")
        const now = new Date();
        const dDate = _getTime(now);
        var from = new Date();
        if (filter == 0){
            from.setDate(from.getDate() - 4);
        } else if (filter == 1){
            const begin = _getMonday(now);
            from.setDate(begin.getDate() - 28);
        } else if (filter == 2){
            from.setDate(1);
            from.setMonth(from.getMonth() - 4);
        }

        from.setDate(from.getDate() - 1);
        const dFrom = _getTime(from);
        getData(dDate,dFrom);
    };

    const onChangeFilter = (t)=>{
        setFilter(t);
        setShowFilter(false);
    };

    const sumDataEachWeek = (mdata)=>{
        LogBase.log("=====sumDataEachWeek",mdata)
        var sumGT = 0
        var firstDay = mdata[0].time
        var mChangeData = {
            data: [],
            labels: []
        }
        mdata.forEach((element, index) => {
            sumGT = parseInt(parseInt(sumGT) + parseInt(element.value))
            if((index+1) % 7 == 0 || index == mdata.length-1){
                mChangeData.data.push(sumGT)
                mChangeData.labels.push(getWeekOfMonth(firstDay))
                sumGT = 0
                if(mdata.length > index+1){
                    firstDay = mdata[index+1].time
                }
                    
            }
        });
        LogBase.log("=====sumDataEachWeek kq", mChangeData)
        return mChangeData
    };

    const sumDataEachMonth = (mdata)=>{
        LogBase.log("=====sumDataEachMonth 1",mdata.slice(0,30))
        LogBase.log("=====sumDataEachMonth 2",mdata.slice(30,60))
        LogBase.log("=====sumDataEachMonth 3",mdata.slice(60,90))
        var sumGT = 0
        var firstDay = mdata[0].time
        var mChangeData = {
            data: [],
            labels: []
        }
        mdata.forEach((element, index) => {
            sumGT = parseInt(parseInt(sumGT) + parseInt(element.value))
            LogBase.log("=====sumGT "+index,sumGT)
            if((index+1) % 30 == 0){
                mChangeData.data.push(sumGT)
                mChangeData.labels.push(_getMonth(firstDay))
                sumGT = 0
                if(mdata.length > index+1){
                    firstDay = mdata[index+1].time
                }
            }
        });
        LogBase.log("=====sumDataEachMonth kq", mChangeData)
        return mChangeData
    };

    const getData = (dDate,dFrom)=>{
        setLoading(true);
        const url = `${API.baseurl}${API.learning_history}${dataLogin.id}&from_time=${dFrom}&to_time=${dDate}`;
        LogBase.log("=====call:",url)
        apiBase.postDataJson('get',url).then(r=>{
            LogBase.log("=====res:",r.data.data_detail.data_chart_diamond)
            if (r.data.status){
                const data = r.data.data_detail;
                const res = {};
                for (let d of Object.keys(data)){
                    res[d] = {
                        data:[],
                        labels:[],
                    };
                    data[d].reverse();
                    if (filter == 0){//filter by day
                        data[d].forEach(e=>{
                            res[d].data.push(e.value);
                            res[d].labels.push(_converTime(e.time));
                        });
                    } else if (filter == 1){//filter by week
                        res[d] = sumDataEachWeek(data[d])
                            // res[d].labels.push(getWeekOfMonth(remains[0].time));
                    } else {//filter by month
                        // if (data[d].length > 0){
                        //     var lb = '';
                        //     var total = 0;
                        //     data[d].forEach(e=>{
                        //         if (!lb){
                        //             lb = _getMonth(e.time);
                        //             total = 0;
                        //         }
                        //         const mlb = _getMonth(e.time);
                        //         if (mlb === lb){
                        //             total = parseInt(total+e.value);
                        //         } else {
                        //             res[d].data.push(total);
                        //             res[d].labels.push(lb);

                        //             lb = _getMonth(e.time);
                        //             total = e.value;
                        //         }
                        //     });
                        //     res[d].data.push(total);
                        //     res[d].labels.push(lb);
                        // }
                        LogBase.log("=====d :",d)
                        res[d] = sumDataEachMonth(data[d])
                    }
                }
                setDataChart(res);
                LogBase.log("=====DataChart",res)
            }
            setLoading(false);
        }).catch(e=>{
            console.log(e);
            setLoading(false);
        });
    };

    const convertData = (mData, mType) => {
        LogBase.log("=====convertData not yet", mData)
        if(mType == 'data_chart_lesson') return mData[mType]?.data || [0,0,0,0]
        if(mType == 'data_chart_diamond') return mData[mType]?.data || [0,0,0,0]
        if(mType == 'data_chart_duration') {
            var mlist = []
            mData[mType]?.data.forEach(element => {
                mlist.push(Math.round(element/60) || 0)
            });
            return mlist
        }
    }

    return (
        <View style={styles.con}>
            <TouchableWithoutFeedback onPress={()=>setShowFilter(false)}>
                <View style={styles.container}>
                    <LinearGradient style={styles.header}
                        colors={['#00e1ae','#00b9b7']}
                        start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                    >
                        <View style={styles.header2}>
                            <Text style={styles.lb}>
                  NHẬT KÝ HỌC TẬP
                            </Text>
                            <TouchableOpacity
                                onLayout={(event)=>{
                                    setFilterWidth(event.nativeEvent.layout.width);
                                }}
                                onPress={()=>setShowFilter(f=>!f)} style={styles.btn}>
                                <Image source={{uri: 'loc'}}
                                    style={styles.img}
                                />
                                <Text style={styles.btnFil}>
                                    {filter == 0 ? 'Lọc theo ngày' : filter == 1 ? 'Lọc theo tuần' : 'Lọc theo tháng'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    <View style={styles.headerBtn}>
                        <Button title={'Số bài hoàn thành'}
                            active={type == 'data_chart_lesson'}
                            onPress={()=>setType('data_chart_lesson')}/>
                        <Button title={'Số kim cương'}
                            active={type == 'data_chart_diamond'}
                            onPress={()=>setType('data_chart_diamond')}/>
                        <Button title={'Thời gian học tập'}
                            active={type == 'data_chart_duration'}
                            onPress={()=>setType('data_chart_duration')}/>
                    </View>
                    <LineChartScreen
                        data={convertData(dataChart, type)}
                        index={type}
                        color={color}
                        label={dataChart[type]?.labels || ['1','2','3','4']}
                        showLabel={type == 'data_chart_duration'}
                    />
                    {
                        showFilter && <View style={[
                            styles.filter,{
                                width:filterWidth + 6,
                            },
                        ]}>
                            <BtnFilter onPress={()=>onChangeFilter(0)} title={'Lọc theo ngày'}/>
                            <BtnFilter onPress={()=>onChangeFilter(1)} title={'Lọc theo tuần'}/>
                            <BtnFilter  onPress={()=>onChangeFilter(2)} title={'Lọc theo tháng'}/>
                        </View>
                    }
                    <View style={styles.dot}>
                        <Dot active={type == 'data_chart_lesson'} />
                        <Dot active={type == 'data_chart_diamond'} />
                        <Dot active={type == 'data_chart_duration'} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {
                loading && <View style={styles.loading}>
                    <ActivityIndicator color="#fff"/>
                </View>
            }
        </View>
    );
});

const styles = StyleSheet.create({
    con:{
        width,
        paddingHorizontal: 10,
        position:'relative',
    },
    container:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 25,
    },
    btnFil:{
        marginLeft: 5,
        color: '#5493b8',
        fontSize: 14,
        fontFamily:FontBase.MyriadPro_Regular,
    },
    lb:{
        color: '#fff',
        fontSize:SmartScreenBase.smFontSize * 50,
        fontFamily:FontBase.MyriadPro_Bold,
        marginLeft:SmartScreenBase.smPercenWidth,
    },
    header:{
        width: '100%',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        // height: width / 7.5,
        marginBottom: 10,
        borderRadius:SmartScreenBase.smPercenWidth * 5,
        paddingHorizontal:SmartScreenBase.smPercenWidth * 4,
        paddingVertical:SmartScreenBase.smPercenWidth * 2,
    },
    header2:{
        flexDirection:'row',
        justifyContent: 'space-between',
        flex:1,
        alignItems:'center',
    },
    btn:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
        height: width / 12,
        position:'relative',
    },
    img:{
        height: width / 15,
        width: width / 15,
        resizeMode: 'contain',
    },
    headerBtn:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        height: 50,
        alignItems: 'center',
    },
    filter:{
        position:'absolute',
        right:22,
        top:16,
        backgroundColor:'#fff',
        borderRadius: 20,
        padding:10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loading:{
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        top:0,
        left:10,
        right:10,
        bottom:0,
        borderRadius: 25,
        alignItems:'center',
        justifyContent:'center',
    },
    dot:{
        flexDirection:'row',
        width:SmartScreenBase.smPercenWidth * 30,
        marginTop:SmartScreenBase.smPercenHeight,
        justifyContent:'space-between',
    },
    dotC:{
        width:SmartScreenBase.smBaseWidth * 40,
        height:SmartScreenBase.smBaseWidth * 40,
        borderRadius:SmartScreenBase.smBaseWidth * 20,
    },
    fiTxt:{
        fontSize:SmartScreenBase.smFontSize * 45,
        color:'#00b9b7',
        fontFamily:FontBase.MyriadPro_Regular,
    },
    fiCon:{
        paddingVertical:5,
        alignItems:'center',
    },
    btn2:{
        fontSize: SmartScreenBase.smFontSize * 40,
        width:'100%',
        textAlign:'center',
    },
});

export default Component;

