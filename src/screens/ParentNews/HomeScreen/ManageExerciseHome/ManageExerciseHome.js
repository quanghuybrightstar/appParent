import {AppHeader} from '../../../../componentBase/AppHeader';
import {View, Text, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
import {RefreshControl} from 'react-native-gesture-handler';
import {TextBox} from '../../../../componentBase/TextBox';
import styles from './ManageExerciseHome.style';
import {ParentText} from '../../../../stringJSON/ParentTextJson';
import {BoxExerciseInfor} from '../../../../component/BoxExerciseInfor/BoxExerciseInfor';
import {manageExerciseHomeLogic} from './ManageExerciseHome.logic';
import {FullScreenLoadingIndicator} from '../../../../componentBase/indicator';
import FontBase from '../../../../base/FontBase';

export const ManageExerciseHome = props => {
  let {dataExercise, loading} = manageExerciseHomeLogic(props);

  const renderItemBox = ({item}) => {
    return (
      <BoxExerciseInfor
        data={item}
        handleNavigateDetail={() =>
          props.navigation.navigate('ManageExerciseAClass', {
            id: item?.class_id,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title={ParentText.Home.ManageExercise}
        leftIconOnPress={() => {
          props.navigation.pop();
        }}
      />
      <View style={styles.contentExercise}>
        <FlatList
          data={dataExercise}
          keyExtractor={(item, index) => {
            return item?.class_id.toString() + index.toString();
          }}
          refreshControl={<RefreshControl refreshing={loading} />}
          renderItem={item => renderItemBox(item)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <View
              style={{
                marginBottom: SmartScreenBase.smPercenHeight * 10,
              }}></View>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingTop: SmartScreenBase.smPercenHeight * 5,
              }}>
              {!loading ? (
                <Text
                  style={{
                    fontFamily: FontBase.MyriadPro_Regular,
                    fontSize: SmartScreenBase.smFontSize * 50,
                    color: Colors.NearBlack,
                  }}>
                  Con chưa được giáo viên giao bài tập nào
                </Text>
              ) : null}
            </View>
          )}
        />
      </View>

      <FullScreenLoadingIndicator visible={loading} />
    </View>
  );
};
