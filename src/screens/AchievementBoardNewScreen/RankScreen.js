import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ImageBackground,
  Image,
  ActivityIndicator, FlatList
} from 'react-native';
import API from '../../API/APIConstant';
import apiBase from '../../base/APIBase';
import {useSelector} from 'react-redux';
import stringUtils from '../../utils/stringUtils';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { FlatList } from 'react-native-gesture-handler';
import LogBase from '../../base/LogBase';
import { Colors } from '../../styleApp/color';

const getLink = (l) => {
  if (!l || l.indexOf('http') == 0) return l;
  return `${API.domain}${l}`;
};
const TopRank = ({item, begin, end, bg2, bg3, width, vip, top}) => {
  return (
    <View style={styles.topRank}>
      <LinearGradient
        style={[
          styles.backgroundScore,
          !vip && {marginTop: SmartScreenBase.smPercenHeight,},
          {alignItems: 'center', justifyContent: 'center'}
        ]}
        colors={[begin, end]}
        start={{x: 0, y: 1}}
        end={{x: 0.5, y: 0.5}}>
        <Text style={styles.topRankTxt}>{item?.total_medal}</Text>
      </LinearGradient>
      {!!item && (
        <ImageBackground
          source={{uri: bg2}}
          style={{
            width: SmartScreenBase.smPercenWidth * width,
            height: SmartScreenBase.smPercenWidth * width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: (SmartScreenBase.smPercenWidth * width) / 2,
              height: (SmartScreenBase.smPercenWidth * width) / 2,
              borderRadius: SmartScreenBase.smPercenWidth * width,
              borderColor: bg3,
              borderWidth: 1,
            }}
            source={{uri: bg3}}>
            <Image
              source={{uri: getLink(item.avatar)}}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: SmartScreenBase.smPercenWidth * width,
              }}
            />
            <View style={[styles.numberContainer, {borderColor: Colors.VividOrange}]}>
              <Text style={styles.numberTxt}>{top}</Text>
            </View>
          </View>
        </ImageBackground>
      )}
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.topRankName}>
        {item.fullname}
      </Text>
    </View>
  );
};

const AnItem = ({item, index}) => {
  return (
    <View style={styles.anItem}>
      <Text style={styles.anItemRank}>{item.rank}</Text>
      <View style={styles.anItemAva}>
        <Image source={{uri: getLink(item.avatar)}} style={styles.anItemImg} />
      </View>
      <Text style={styles.anItemName}>{item.fullname}</Text>
      <Image source={{uri: 'huy_chuong'}} style={styles.anItemHc} />
      <Text style={styles.anItemSc}>{item.total_medal}</Text>
      <View style={styles.anItemCon}>
        {!!item.rank_change_status && (
          <Icon
            size={36}
            color={item.rank_change_status == 'down' ? 'red' : '#0c4b'}
            name={item.rank_change_status == 'down' ? 'angle-down' : 'angle-up'}
          />
        )}
      </View>
    </View>
  );
};

const RankScreen = () => {

  const [loading, setLoading] = React.useState(false);
  const dataLogin = useSelector((state) => state.AuthStackReducer.dataLogin);
  const [data, setData] = React.useState(null);
  const [offset, setOffset] = React.useState(0)
  const [limit, setLimit] = React.useState(10)
  // Check if screen is reach end
  const [isReachedEnd, setReachedEnd] = React.useState(false)
  // Check if all Data is loaded
  const [isEnd, setIsEnd] = React.useState(false)  

  React.useEffect(() => {
    const url = API.baseurl + '/api_student/ranking?type=total&size=10';
    apiBase
      .postDataJson('get', url)
      .then((r) => {
        // console.log(r);
        if (r.data.status) {
          LogBase.log("=====ranking",r.data)
          setData(r.data.data);
        }
      })
      .catch((e) => {});
  }, []);

  const getMore  = () => {
    if (isReachedEnd || loading || isEnd) return;
    setReachedEnd(true)
    const url = API.baseurl + API.getTopSym + `&limit=${limit}&offset=${offset + limit}`
    apiBase.postDataJson('get', url).then((r) => {
      setReachedEnd(false)
      console.log("=====res", limit, offset,r.data);
      if (r.data.status) {
        var addArray = r.data.data
        addArray.top_users = data.top_users.concat(r.data.data.top_users)
        if (r.data.data.top_users.length == 0) setIsEnd(true)
        setOffset(offset+limit)
        setData(addArray);
      }
    }).catch((e) => {
      console.log("=====e", e);
      setReachedEnd(false)
    });
  }

 /**
   * Debounce function
   */
  function debounceEvent(callback, time) {
    let interval;
    return () => {
      clearTimeout(interval);
      interval = setTimeout(() => {
        interval = null;

        // eslint-disable-next-line
        callback(arguments);
      }, time);
    };
  }

  const renderNoob = ({item, index}) => {
    if(index > 2){
      return(
        <AnItem item={item} />
      );
    }else{
      return
    }
  }

  const top3Render = (data) => {
    return(
      <View style={styles.scrollCon}>
      <View style={styles.topRankCon}>
        <TopRank
          begin="#87b9f6"
          end="#78b0f6"
          width={24}
          top={2}
          item={data?.top_users[1]}
          bg1="student_25"
          bg2="class_st03"
          bg3="#96b9ed"
        />
        <TopRank
          vip
          begin="#fad00c"
          end="#f8ae10"
          width={32}
          top={1}
          item={data?.top_users[0]}
          bg1="student_24"
          bg2="class_st02"
          bg3="#eaac3f"
        />
        <TopRank
          begin="#bcb9b4"
          end="#e0ddd8"
          width={24}
          top={3}
          item={data?.top_users[2]}
          bg1="student_23"
          bg2="class_st01"
          bg3="#cdc7bc"
        />
      </View>
    </View>
    );
  }

  return (
    <ImageBackground style={styles.container} source={{uri: 'bgtt_2'}}>
      {loading && <LoadingScreen2 />}

      <View style={styles.header}>
        <View style={styles.ava}>
          <Image source={{uri: dataLogin?.avatar ?? ''}} style={styles.imgAva} />
        </View>

        <View style={styles.avaTop}>
          <Text style={styles.fname}>{dataLogin?.fullname}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>Hạng</Text>
            <Text style={[styles.red,{fontSize: data?.current_rank?.user_rank ? SmartScreenBase.smFontSize*60 : SmartScreenBase.smFontSize*40}]}>{data?.current_rank?.user_rank || "Chưa có"}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {console.log("=====current_rank", data?.current_rank)}
            <Text style={styles.text}>Huân chương</Text>
            <Text style={styles.red}>{data?.current_rank?.total_medal || 0}</Text>
            <Image source={{uri: 'huy_chuong'}} style={styles.topHc} />
          </View>
        </View>

      </View>
      {!!data && !!data.top_users && (
        <>
          <View style={styles.content}>
            <FlatList
              keyExtractor={(item, index) => item.user_id + index.toString()}
              ListHeaderComponent={top3Render(data)}
              data={data.top_users}
              ListFooterComponent={() => (
                <View style={{ marginVertical: 15 }}>
                  {isReachedEnd && <ActivityIndicator/>}
                </View>
              )}
              onEndReached={debounceEvent(() => {
                getMore()
              }, 200)}
              renderItem={renderNoob}/>
          </View>
        </>
      )}
    </ImageBackground>
  );
};

export default RankScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
    paddingTop: SmartScreenBase.smPercenHeight * 2,
  },
  header: {
    flexDirection: 'row',
    padding: SmartScreenBase.smBaseWidth * 30,
    backgroundColor: '#ffff',
    borderRadius: SmartScreenBase.smBaseWidth * 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    marginVertical: SmartScreenBase.smPercenHeight * 2,
    flexDirection: 'row',
    backgroundColor: '#ffff',
    borderRadius: SmartScreenBase.smBaseWidth * 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  text: {
    fontSize: SmartScreenBase.smFontSize * 40,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  red: {
    color: 'red',
    fontSize: SmartScreenBase.smFontSize * 55,
    fontFamily: FontBase.MyriadPro_Bold,
    marginHorizontal: SmartScreenBase.smPercenWidth * 2,
  },
  backgroundScore: {
    minWidth: SmartScreenBase.smPercenWidth * 18,
    minHeight: SmartScreenBase.smPercenWidth * 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
    marginBottom: SmartScreenBase.smPercenHeight * 2,
    borderRadius: 4,
  },
  topRank: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginBottom: SmartScreenBase.smPercenHeight * 2,
  },
  topRankTxt: {
    fontFamily: FontBase.MyriadPro_Bold,
    // paddingTop: Platform.OS === 'ios' ? 5 : 0,
    fontSize: SmartScreenBase.smFontSize * 45,
  },
  topRankName: {
    width: '100%',
    textAlign: 'center',
    fontFamily: FontBase.MyriadPro_Bold,
    fontSize: SmartScreenBase.smFontSize * 40,
    marginTop: SmartScreenBase.smPercenHeight,
    alignSelf: 'flex-end',
  },
  anItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SmartScreenBase.smPercenWidth,
    marginTop: SmartScreenBase.smPercenHeight,
  },
  anItemRank: {
    width: SmartScreenBase.smPercenWidth * 8,
    fontFamily: FontBase.MyriadPro_Bold,
    fontSize: SmartScreenBase.smFontSize * 47,
    textAlign: 'center',
  },
  anItemAva: {
    width: SmartScreenBase.smPercenWidth * 16,
    height: SmartScreenBase.smPercenWidth * 16,
    borderRadius: SmartScreenBase.smPercenWidth * 16,
    borderWidth: 1,
    borderColor: '#e3b879',
  },
  anItemImg: {
    width: '100%',
    height: '100%',
    borderRadius: SmartScreenBase.smPercenWidth * 16,
  },
  anItemName: {
    flex: 1,
    fontFamily: FontBase.MyriadPro_Bold,
    fontSize: SmartScreenBase.smFontSize * 40,
    paddingLeft: SmartScreenBase.smPercenWidth * 2,
  },
  anItemHc: {width: 30, height: 30, resizeMode: 'contain'},
  anItemSc: {
    width: SmartScreenBase.smPercenWidth * 10,
    fontFamily: FontBase.MyriadPro_Bold,
    fontSize: SmartScreenBase.smFontSize * 50,
    paddingLeft: SmartScreenBase.smPercenWidth,
    paddingTop: Platform.OS === 'ios' ? 5 : 0,
  },
  anItemCon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SmartScreenBase.smPercenWidth * 10,
  },
  ava: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: SmartScreenBase.smPercenWidth * 10,
    width: SmartScreenBase.smPercenWidth * 20,
    height: SmartScreenBase.smPercenWidth * 20,
  },
  imgAva: {
    borderRadius: SmartScreenBase.smPercenWidth * 10,
    width: '100%',
    height: '100%',
  },
  avaTop: {paddingLeft: SmartScreenBase.smPercenWidth, flex: 1},
  fname: {
    fontFamily: FontBase.MyriadPro_Bold,
    color: 'black',
    fontSize: SmartScreenBase.smFontSize * 50,
  },
  topHc: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginTop: Platform.OS === 'ios' ? -10 : 0,
  },
  topRankCon:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 4,
    borderBottomColor: '#dcdcdc',
  },
  scroll:{
    borderRadius: SmartScreenBase.smPercenWidth * 10,
  },
  scrollCon:{
    // backgroundColor: '#fff',
    paddingVertical: SmartScreenBase.smPercenHeight * 2,
  },
  numberContainer: {
    position: 'absolute',
    width: SmartScreenBase.smPercenWidth * 7,
    height: SmartScreenBase.smPercenWidth * 7,
    bottom: -SmartScreenBase.smPercenWidth * 9,
    justifyContent: 'center',
    alignItems:'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFFEE',
    borderRadius: SmartScreenBase.smPercenWidth * 3.2,
    borderWidth: 1,
},
numberTxt: {
    textAlign: 'center',
    top: 1,
    fontSize: SmartScreenBase.smPercenHeight * 2.2,
    fontFamily: FontBase.MyriadPro_Bold,
},
});
