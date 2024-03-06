import React from 'react'
import {View,StyleSheet,Text,ScrollView,TouchableOpacity, Platform} from 'react-native'
import Loading from '../../../component/LoadingScreen';
import HeaderGradient from '../../../commons/HeaderGradient';
import Button from '../../../commons/Button';
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import apiBase from '../../../base/APIBase';
import FontBase from '../../../base/FontBase';
import { AppHeader } from '../../../componentBase/AppHeader';

const num2digit=(n)=>{
    return n>9?String(n):('0'+n)
}
const Label=({lb,vl})=>{
    return <View style={styles.lbV}>
        <Text style={styles.lb}>{lb}</Text>
        <Text style={styles.vl}>{vl}</Text>
    </View>
}
const getScore=(n)=>{
    if(!n) return n;
    var t = String(n);
    var dot = t.indexOf('.')
    if(dot<0) return t;
    return t.substr(0,dot + 3);
}
const AQuest=({item,index,onPress})=>{
    return <TouchableOpacity
        onPress={()=>onPress(index)}
        style={styles.aQuest}
    >
        <View style={[
            styles.aQuestCon,
            {
                backgroundColor:item.score>0?'#8dc63f':'#d68087',
                borderColor:item.score>0?'#55b247':'#cd5c65'
            }
        ]}>
            <Text style={styles.aQuestTxt}>{num2digit(index+1)}</Text>
        </View>
    </TouchableOpacity>
}
const Screen = ({navigation})=>{
    const item = React.useMemo(()=>{
        return navigation.getParam('item');
    })
    const [isLoading,setIsLoading] = React.useState(true);
    const [data,setData] = React.useState(null)

    React.useEffect(()=>{
        const url = API.baseurl + API.mockTestHistoryDetail + item.user_exam_result_id;
        apiBase.postDataJson('get',url).then(r=>{
            setIsLoading(false)
            if(r.data.status){
                console.log("=====bb3",r.data)
                setData(r.data)
            }
        }).catch(e=>{
            console.log(e)
            setIsLoading(false)
        })
    },[])

    const _goToDetail=(index)=>{
        navigation.navigate('ResultStudy', {
            listQuestion: data?.data_question,
            userChoice: data?.list_question,
            index: index, 
            name:item.exam_name,
            userExamResId : item.user_exam_result_id
        });
    }
    const _doAgain=()=>{
        //navigation.popToTop({immediate:true})
        navigation.navigate('DetailsStudyForTest', {
            id:item.mock_test_id,
            purpose:'',
            name:item.name,
            doAgain:true,
            draw:navigation.getParam('draw')
        })
    }
    
    return <View style={styles.container}>
        <AppHeader title={'Kết quả làm bài'} leftIconOnPress={() => navigation.goBack()} />
        <View style={styles.content}>
            <View style={styles.comp1}>
                <Label lb={'Điểm số'} vl={`${!!data?.data_history.score?(getScore(data?.data_history.score)):'0'}`}/>
                <Label lb={'Câu đúng'} vl={data?.data_history.number_true||0}/>
                <Label lb={'Câu sai'} vl={data?.data_history.number_false||0}/>
            </View>
            <View style={styles.comp2}>
                <ScrollView style={styles.scroll}>
                    <View style={{flexDirection:'row',flexWrap:'wrap', paddingBottom: SmartScreenBase.smPercenWidth*4}}>
                        {
                            !!data&&data.list_question.map((e,i)=>{
                                return <AQuest onPress={_goToDetail} key={i} index={i} item={e}/>
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            <View style={styles.foot}>
                <Button txtStyle={styles.btn} onPress={_doAgain} title={'Làm lại'}/>
            </View>
        </View>
        {
            isLoading &&<Loading Screen='Main'/>
        }
    </View>
}

export default Screen;

const styles = StyleSheet.create({
    container:{flex: 1,backgroundColor:'#fff'},
    content:{
        padding:SmartScreenBase.smPercenWidth*5,
        flex:1,
    },
    comp1:{
        flexDirection:'row',
        marginTop:SmartScreenBase.smPercenHeight
    },
    comp2:{
        backgroundColor:'#dcdcdc',
        flex:1,
        borderRadius:SmartScreenBase.smPercenWidth*5,
        marginTop:SmartScreenBase.smPercenHeight*2,
        marginBottom:SmartScreenBase.smPercenHeight*5,
    },
    lbV:{
        flex:1,
        alignItems:'center'
    },
    lb:{
        fontSize:SmartScreenBase.smFontSize*50,
        fontFamily:FontBase.MyriadPro_Regular
    },
    vl:{
        fontFamily:FontBase.MyriadPro_Bold,
        fontSize:SmartScreenBase.smFontSize*50,
        marginTop:SmartScreenBase.smPercenHeight
    },
    aQuest:{ 
        width:'25%',
        height:SmartScreenBase.smPercenWidth*18,
        padding:SmartScreenBase.smPercenWidth,
        alignItems:'center',
    },
    aQuestCon:{
        height:SmartScreenBase.smPercenWidth*13,
        maxWidth:'100%',
        width:SmartScreenBase.smPercenWidth*16,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:SmartScreenBase.smPercenWidth*3,
        borderWidth:2
    },
    aQuestTxt:{
        fontFamily:FontBase.MyriadPro_Bold,
        fontSize:SmartScreenBase.smFontSize*45,
        color:'#3d3d3d',
        paddingTop:Platform.OS==='ios'?5:0
    },
    scroll:{
        flex:1,
        paddingHorizontal:SmartScreenBase.smPercenWidth*2,
        paddingVertical:SmartScreenBase.smPercenHeight*2,
    },
    foot:{
        alignItems:'center',
        paddingBottom:SmartScreenBase.smPercenHeight
    },
    btn:{
        fontFamily:FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 50,
        color: 'white',
    }
})