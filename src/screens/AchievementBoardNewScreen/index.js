import React from 'react'
import {View,StyleSheet,FlatList,Text,TouchableOpacity,Image} from 'react-native'
import { TabView } from 'react-native-tab-view';
import SmartScreenBase from '../../base/SmartScreenBase';
import font from '../../base/FontBase';
import AchiveOffline from './AchivementOfflineScreen';
import AchiveOnline from './AchivementOnlineScreen';
import GoldBoard from './RankScreen';
const routes = [
    {id:0,key: 'online', title: 'Thành tích Online',icon:'tt_online_1',acitveIcon:'tt_online_2'},
    {id:1,key: 'offline', title: 'Thành tích Offline',icon:'tt_offline_1',acitveIcon:'tt_offline_2'},
    {id:2,key: 'board', title: 'Bảng xếp hạng',icon:'tt_xephang_1',acitveIcon:'tt_xephang_2'}
]

const AdjustLabel = ({
    fontSize, text, style, numberOfLines
  }) => {
    const [currentFont, setCurrentFont] = React.useState(fontSize);
  
    return (
      <Text
        numberOfLines={ numberOfLines }
        adjustsFontSizeToFit
        style={ [style, { fontSize: currentFont }] }
        onTextLayout={ (e) => {
          const { lines } = e.nativeEvent;
          if (lines.length > numberOfLines) {
            setCurrentFont(currentFont - 1);
          }
        } }
      >
        { text }
      </Text>
    );
};

const TabButton=({item,active,onPress})=>{
    return <TouchableOpacity
    onPress={()=>onPress(item.id)}
    style={{
        flex:1,
        height:SmartScreenBase.smPercenHeight*13,
        alignItems:'center',
        paddingBottom:SmartScreenBase.smPercenHeight/2,
        position:'relative'
    }}
    >
        <Image 
        source={{uri:item[active?'acitveIcon':'icon']}} 
            style={{
                width:'46%',
                height:SmartScreenBase.smPercenHeight*4.5,
                resizeMode:'contain',
                marginTop:SmartScreenBase.smPercenHeight*4
            }}
            />
        <Text style={{
            fontSize:SmartScreenBase.smFontSize*38,
            fontFamily:font.MyriadPro_Regular,
            color:active?'#10b98e':'#fff',
            position:'absolute',
            left:0,
            right:0,
            top:SmartScreenBase.smPercenHeight*9.5,
            textAlign:'center'
        }}>{item.title}</Text>
    </TouchableOpacity>
}

const Screen=({navigation})=>{

    const [index, setIndex] = React.useState(0);
    const listener = React.useRef();

    React.useEffect(() => {
    }, []);

    const _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'online':
                return <AchiveOnline navigation={navigation}/>;
            case 'offline':
                return <AchiveOffline  navigation={navigation}/>;
            case 'board':
                return <GoldBoard navigation={navigation} />;
        }
      };
    const _renderItem=({item})=>{
        return <TabButton onPress={setIndex} item={item} active={index==item.id}/>
    }
    const _renderTabBar = () => {
        return (
            <View style={{
                flexDirection:'row',
                height:SmartScreenBase.smPercenHeight*13,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#1d656a'
            }}>
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

    return <View style={{flex:1}}>
        <TabView
            swipeEnabled={false}
            navigationState={{index, routes}}
            renderScene={_renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: SmartScreenBase.smPercenWidth * 100}}
            renderTabBar={_renderTabBar}
        />
    </View>
}

const styles = StyleSheet.create({

})

export default Screen;