
import React from 'react'
import {View,Text,TouchableOpacity,ImageBackground,StyleSheet,FlatList} from 'react-native';
import HeaderGradient from '../../commons/HeaderGradient';
import { TabView } from 'react-native-tab-view';
import font from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import { AppHeader } from '../../componentBase/AppHeader';

const routes = [
    {id:0,key: 'hocKy1', title: 'HỌC KỲ I'},
    {id:1,key: 'hocKy2', title: 'HỌC KỲ II'},
    {id:2,key: 'caNam', title: 'CẢ NĂM'}
]

const getData=(ls,s,p)=>{
    return ls.filter(c=>c.type==s&&c.score_percent==p).map(c=>c.score).join(', ')
}

const TabButton=({item,active,onPress})=>{
    return <TouchableOpacity
        onPress={()=>onPress(item.id)}
        style={styles.tabBtn}
    >
        <Text style={{
            color:active?'#000':'gray',
            ...styles.tabBtnV
        }}>{item.title}</Text>
        <View style={{...styles.tabBtnTxt,backgroundColor:active?'orange':'#fff',}}></View>
    </TouchableOpacity>
}

const CaNam=({data})=>{
    console.log("=====CaNam",data)
    return <View style={styles.container}>
        <View style={styles.row}>
            <View style={styles.col}>
                <Text style={styles.lb}>TB Học kỳ I</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.lb}>TB Học kỳ II</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.lb}>TB Cả năm</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.col}>
                <Text style={styles.txt}>{data.avg_score_1 && data.avg_score_1>=0 && data.avg_score_1}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{data.avg_score_2 && data.avg_score_2>=0 && data.avg_score_2}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{data.avg_score && data.avg_score>=0 && data.avg_score}</Text>
            </View>
        </View>
    </View>
}

const HocKy=({data,tbc})=>{
    return <View style={styles.container}>
        <View style={styles.row}>
            <View style={styles.hd}>
                <Text style={styles.lb}></Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.lb}>Hệ số 1</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.lb}>Hệ số 2</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.lb}>Hệ số 3</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.hd}>
                <Text style={styles.lb}>KT miệng</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'oral','1')}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'oral','2')}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'oral','3')}</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.hd}>
                <Text style={styles.lb}>KT 15 phút</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'15','1')}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'15','2')}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'15','3')}</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.hd}>
                <Text style={styles.lb}>KT 45 phút</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'45','1')}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'45','2')}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'45','3')}</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.hd}>
                <Text style={styles.lb}>KT Học kỳ</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'semester','1')}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'semester','2')}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.txt}>{getData(data,'semester','3')}</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={[styles.hd,{flex:1}]}>
                <Text style={styles.lb}>Điểm TBC</Text>
            </View>
            <View style={[styles.col,{flex:3}]}>
                {
                    (tbc>0||data.length>0) ?<Text style={styles.txt}>{tbc}</Text>:
                    <Text style={styles.txt}></Text>
                }
            </View>
        </View>
    </View>
}

const AchievementOfflineDetailScreen=({navigation})=>{
    const item = navigation.getParam('item')
    //console.log(item)
    const [index, setIndex] = React.useState(0);
    const _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'hocKy1':
                return <HocKy data={item.detail_score[0].list_score} tbc={item.detail_score[0].avg_score} />;
            case 'hocKy2':
                return <HocKy data={item.detail_score[1].list_score} tbc={item.detail_score[1].avg_score} />;
            case 'caNam':
                return <CaNam data={item.detail_score[2]}/>;
        }
      };
    const _renderItem=({item})=>{
        return <TabButton onPress={setIndex} item={item} active={index==item.id}/>
    }
    const _renderTabBar = () => {
        return (
            <View style={styles.tabBar}>
                <FlatList
                    data={routes}
                    renderItem={_renderItem}
                    keyExtractor={(index) => index.toString()}
                    scrollEnabled={false}
                    numColumns={4}
                    style={{flex:1}}
                />
            </View>
        );
    };
    return <ImageBackground
        style={{flex:1}}
        source={{ uri: 'bgtuvung' }}>
            <AppHeader title={'Bảng điểm'} leftIconOnPress={() => navigation.goBack()}/>
            <View style={styles.content}>
                <TabView
                    swipeEnabled={false}
                    navigationState={{index, routes}}
                    renderScene={_renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{width: SmartScreenBase.smPercenWidth * 100}}
                    renderTabBar={_renderTabBar}
                />
            </View>
    </ImageBackground>
}

export default AchievementOfflineDetailScreen

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:'#dcdcdc',
        marginHorizontal:SmartScreenBase.smPercenWidth*4
    },
    lb:{
        fontFamily:font.MyriadPro_Bold,
        fontSize:SmartScreenBase.smFontSize*40,
        marginVertical:SmartScreenBase.smPercenHeight*2,
    },
    txt:{
        fontSize:SmartScreenBase.smFontSize*50,
        fontFamily:font.MyriadPro_Regular,
        margin:SmartScreenBase.smPercenWidth,
        textAlign:'center'
    },
    row:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc'
    },
    col:{
        flex:1,
        alignItems:'center',
        borderLeftWidth:1,
        borderLeftColor:'#dcdcdc',
        justifyContent:'center',
        paddingVertical:SmartScreenBase.smPercenHeight
    },
    hd:{
        flex:1,
        paddingLeft:SmartScreenBase.smPercenWidth
    },
    tabBtn:{
        flex:1,
        height:50,
        alignItems:'center',
        justifyContent:'flex-end',
        paddingBottom:5,
    },
    tabBtnV:{
        marginTop:SmartScreenBase.smPercenHeight,
        fontSize:SmartScreenBase.smFontSize*50,
        fontFamily:font.MyriadPro_Regular,
        marginBottom:10
    },
    tabBtnTxt:{
        height:3,
        width:'100%'
    },
    tabBar:{
        flexDirection:'row',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:SmartScreenBase.smPercenWidth*4
    },
    content:{
        flex:1,
        paddingVertical:SmartScreenBase.smPercenWidth*4
    }
})
