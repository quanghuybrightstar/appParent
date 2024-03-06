import React from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { ListTutorialJson } from '../../../../stringJSON/AssignManagentJson';
import { FontSize } from '../../../../styleApp/font';
import { ListTutorialMethod } from './ListTutorial.logic';
import { styles } from './ListTutorial.style';
import moment from 'moment';
import { Colors } from '../../../../styleApp/color';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton'
import { CommonJson } from '../../../../stringJSON';
import { ModalFilterCommon } from '../../../../componentBase/ModalFilter';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';

/**
 * Tutorial list screen
 * @param {Object} props props from redux and navigation
 * @returns {Component}
 */
export const ListTutorial = (props) => {
  const language = useSelector(state => state.LanguageStackReducer.language)
  let { loading, isReachedEnd, debounceEvent, dataTutorial, theFirst, CheckImage, onLoad, valueUrl, onfilter, dataSelect, onSelect, AddToturial,
    loadMore, routerGradle } = ListTutorialMethod(props)
  const [visible, setVisible] = React.useState(false)

  /**
   * Render Tutorial
   * @param {Object} param0 Tutorial
   * @returns {Component}
   */
  const renderItem = ({ item }) => {
    return (
      <View style={styles.viewItem}>
        <View style={styles.vieItem}>
          <View style={styles.horizontal}>
            <TextBox numberOfLines={null} style={styles.txtName}>{item.title}</TextBox>
            <SmallCheckBox
              onPress={() => onSelect(item)}
              isNotify={!!dataSelect && dataSelect.findIndex(i => i.id === item.id) !== -1}
              size={SmartScreenBase.smBaseWidth * 50}
            />
          </View>
          <TextBox style={styles.txtDate}>{ListTutorialJson.createat}: {moment(item.created_at).format('DD/MM/YYYY')}</TextBox>
          <TextBox style={styles.txtSkill}>{`${item.grade_name} >> ${item.skill}`}</TextBox>
        </View>
        <Image source={{ uri: CheckImage(item) }} style={styles.imgType} />
      </View>
    )
  }
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={ListTutorialJson.Header}
        leftIconOnPress={() => {
          props.navigation.pop()
        }}
        styleTitle={styles.txtHeader}
        rightIcon={!theFirst ? (onfilter ? 'filter1' : 'filter2') : null}
        styleHeaderRight={{ tintColor: Colors.White }}
        rightIconOnPress={() => setVisible(true)}

      />
      <LinearGradient
        style={styles.flex1}
        colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        {!loading ?
        <>
          {!theFirst ?
            <View style={styles.flex1}>
              <FlatList
                indicatorStyle={'black'}
                contentContainerStyle={{ paddingHorizontal: SmartScreenBase.smBaseWidth * 30, paddingBottom: 10 }}
                data={dataTutorial}
                renderItem={renderItem}
                onEndReached={debounceEvent(() => {
                  loadMore(valueUrl)
                }, 200)}
                ListFooterComponent={() => (
                  <View style={{ marginVertical: 15 }}>
                    {isReachedEnd && <ActivityIndicator />}
                  </View>
                )}
                keyExtractor={item => item.id + ''}
                ListEmptyComponent={<>
                  <View style={styles.viewEmpty}>
                    <TextBox>{'Không có kết quả nào phù hợp'}</TextBox>
                  </View>
                </>}
              />
              <View style={styles.footer}>
                <ShortMainButton
                  type={1}
                  style={styles.btnAssign}
                  text={ListTutorialJson.Addnew}
                  onPress={() => props.navigation.navigate('StudyGuide', {isGiaoBai: true, id: props.navigation.getParam('id')})}
                  textStyles={styles.txtAssign}
                  widthType={'mini'}
                />
                <ShortMainButton
                  type={1}
                  isDisabled={dataSelect.length > 0 ? false : true}
                  style={styles.btnAssign}
                  text={ListTutorialJson.add}
                  onPress={AddToturial}
                  textStyles={styles.txtAssign}
                  widthType={'mini'}
                />
              </View>
            </View>
            :
            <>
              <View style={styles.flex1}>
                <Image source={{ uri: 'banner_list_tutorial' }} resizeMode='contain' style={styles.banner} />
                <TextBox numberOfLines={null} style={styles.content1}>{ListTutorialJson.dontContent}</TextBox>
                <TextBox numberOfLines={null} style={styles.content1}>{ListTutorialJson.select} <TextBox style={[styles.content1, styles.fontWeight]}>{ListTutorialJson.Addnew} </TextBox> <TextBox style={styles.content2} >{ListTutorialJson.content1}</TextBox></TextBox>
              </View>
              <View style={styles.alignSeft}>
                <ShortMainButton
                  type={1}
                  onPress={() => props.navigation.navigate('StudyGuide', {isGiaoBai: true, id: props.navigation.getParam('id')})}
                  style={[styles.btnAssign, styles.btnEmpty]}
                  textStyles={styles.txtAssign}
                  text={ListTutorialJson.Addnew}
                  widthType={'full'}
                />
              </View>
            </>
        }
      </> : <FullScreenLoadingIndicator visible={loading}/>
      }

      </LinearGradient>
      <ModalFilterCommon
        visible={visible}
        hideModal={() => setVisible(false)}
        dataGrade={routerGradle}
        showGrade={true}
        showType={true}
        onFilter={(param) => onLoad(param)}
        cancel={true}
      />
    </>
  )
}