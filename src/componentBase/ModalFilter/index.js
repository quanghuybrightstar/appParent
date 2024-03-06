import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Animated, TextInput, Platform, FlatList, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux';
import moment from 'moment'
import { SelectDateModal } from '../SelectDateModal';
import { TextBox } from '../TextBox';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styleApp/color';
import SmartScreenBase from '../../base/SmartScreenBase';
import { FontSize, FontWeight } from '../../styleApp/font';
import { ShortMainButton } from '../ShortMainButton';
import { CurriculumTeacherJson } from '../../stringJSON';
import { SmallCheckBox } from '../SmallCheckBox';
import LogBase from '../../base/LogBase';
const { height, width } = Dimensions.get('window')

/**
 * ModalFilterComponent
 * @param {Object} props
 * @property {boolean} visible modal visible
 * @property {function} hideModal
 * @property {object} dataGrade list of grade
 * @property {boolean} showKeyword flag check show keyword
 * @property {boolean} showDate flag check show date
 * @property {boolean} showLevel flag check show level
 * @property {boolean} showGrade flag check show grade
 * @property {boolean} showType flag check show type
 * @property {function} onFilter filter function
 * @property {function} clearData clear data function
 * @property {obejct} params
 * @property {function} cancel cancel filter
 * @returns
 */
export const ModalFilterCommon = (props) => {
  let { visible, hideModal, dataGrade,
    showKeyword, showDate, showLevel, showGrade,
    showType, onFilter, clearData, params, cancel } = props
  //list of chosen level
  const [level, setLevel] = useState(params ? params.level : [])
  //list of chosen skill
  const [skill, setSkill] = useState(params ? params.skill : [])
  //list of chosen class
  const [classes, setClasses] = useState(params ? params.classes : [])
  //keyword searching
  const [keyword, setKeyword] = useState(params ? params.keyword : '')
  //Error message
  const [errorDate, setErrorDate] = useState('')
  //List of chosen type
  const [type, setType] = useState([])
  //cache data before edit
  const [history, setHistory] = useState()
  //lsit of level
  const dataLevel = [{tittle: 'easy', key: 'easy'},
                      {tittle: 'medium', key: 'normal'},
                      {tittle: 'hard', key: 'hard'}]
  //list of skill
  const dataSkill = ['pronunciation', 'vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing', 'mini_test', 'project']
  //list of type
  const dataType = [
    { title: 'Video', key: 'video' },
    { title: 'Âm thanh', key: 'audio' },
    { title: 'Văn bản', key: 'writing' },
    { title: 'Ảnh', key: 'img' },
  ]
  //start date modal visible
  let [modalVisible, setModalVisible] = useState(false)
  //end date modal visible
  let [modalEndDate, setModalEndDate] = useState(false)
  //startdate value
  let [startDate, setStartDate] = useState(null)//moment().toDate())
  // end date value
  let [endDate, setEndDate] = useState(null) //moment(startDate).add(2, 'day').toDate())
  // show keyBoard
  let [isShowKeyBoard, setIsShowKeyBoard] = useState(false)
  const language = useSelector(state => state.LanguageStackReducer.language)
  const listener = React.useRef();
  //size of layout
  const [size, setSize] = useState({
    height: 0,
    width: 0
  })

  // useEffect(() => {
  //   if(!listener.current){
  //     listener.current = Keyboard.addListener('keyboardDidShow', (e) => _showKeyBoad(e));
  //     listener.current = Keyboard.addListener('keyboardDidHide', () => _HideKeyBoad());
  //   }
  //   return () => {
  //     listener.current.remove()
  //  }
  // },[])

  useEffect(() => {
    if(visible){
      var hisData = {
        level: level,
        skill: skill,
        classes: classes,
        keyword: keyword.trim(),
        type: type,
        startDate: startDate,
        endDate: endDate
      }
      console.log("=====hisData",hisData)
      setHistory(hisData)
    }
  }, [visible])

  useEffect(() => {
    if (startDate !== null && endDate !== null && moment(startDate).format('X') > moment(endDate).format('X')) {
      setErrorDate('Ngày kết thúc không được nhỏ hơn ngày bắt đầu.')
    } else {
      setErrorDate('')
    }
  }, [startDate, endDate])

  const _showKeyBoad = (e) => {
    // setIsShowKeyBoard(true)
    console.log("=====go")
  };
  const _HideKeyBoad = () => {
    // setIsShowKeyBoard(false)
    console.log("=====stop")
  };

  /**
     * Add or filter item to selected list
     */
  const checkbox = (item, value) => {
    if (value === 'Level') {
      let temp = Array.from(level)
      if (temp.includes(`"${item}"`)) {
        temp = temp.filter(b => b !== `"${item}"`)
      } else if (!temp.includes(`"${item}"`)) {
        temp.push(`"${item}"`)
      }
      setLevel(temp)
    }
    else if (value === 'Classes') {
      let temp = Array.from(classes)
      if (temp.includes(`"${item.count}"`)) {
        temp = temp.filter(b => b !== `"${item.count}"`)
      } else if (!temp.includes(`"${item.count}"`)) {
        temp.push(`"${item.count}"`)
      }
      setClasses(temp)
    }
    else if (value === 'Skill') {
      let temp = Array.from(skill)
      if (temp.includes(`"${item}"`)) {
        temp = temp.filter(b => b !== `"${item}"`)
      } else if (!temp.includes(`"${item}"`)) {
        temp.push(`"${item}"`)
      }
      setSkill(temp)
      console.log("chon skill :"+skill)
    }
    else if (value === 'Type') {
      let temp = Array.from(type)
      if (temp.includes(`"${item.key}"`)) {
        temp = temp.filter(b => b !== `"${item.key}"`)
      } else if (!temp.includes(`"${item.key}"`)) {
        temp.push(`"${item.key}"`)
      }
      setType(temp)
    }
  }

  /**
   * Render item type of item
   * @param {object} param0 Type
   * @returns {Component}
   */
  const renderItemType = ({ item }) => {
    return (
      <View key={`type-${item.title}`} style={styles.viewItem}>
        <View style={styles.marginRight}>
          <SmallCheckBox
            onPress={() => checkbox(item, 'Type')}
            isNotify={type.includes(`"${item.key}"`)}
            size={SmartScreenBase.smBaseWidth * 50}
          />
        </View>
        <TextBox style={styles.txtItem}>{item.title}</TextBox>
      </View>
    )
  }

  /**
   *  Function render item for level
   */
  const renderItemLevel = ({ item }) => {
    return (
      <View key={`level-${item}`} style={styles.viewItem}>
        <View style={styles.marginRight}>
          <SmallCheckBox
            onPress={() => checkbox(item.key, 'Level')}
            isNotify={level.includes(`"${item.key}"`)}
            size={SmartScreenBase.smBaseWidth * 50}
          />
        </View>
        <TextBox style={styles.txtItem}>{item.tittle}</TextBox>
      </View>
    )
  }

  /**
   *  Function render item for classes
   */
  const renderItemClasses = ({ item }) => {
    return (
      <View key={`class-${item.title}`} style={styles.viewItem}>
        <View style={styles.marginRight}>
          <SmallCheckBox
            onPress={() => checkbox(item, 'Classes')}
            isNotify={classes.includes(`"${item.count}"`)}
            size={SmartScreenBase.smBaseWidth * 50}
          />
        </View>
        <TextBox style={styles.txtItem}>{item.title}</TextBox>
      </View>
    )
  }

  /**
   *  Function render item for skill lists
   */
  const renderItemSkill = ({ item }) => {
    return (
      <View key={`skill-${item}`} style={styles.viewItem}>
        <View style={styles.marginRight}>
          <SmallCheckBox
            onPress={() => checkbox(item, 'Skill')}
            isNotify={skill.includes(`"${item}"`)}
            size={SmartScreenBase.smBaseWidth * 50}
          />
        </View>
        <TextBox style={styles.txtItem}>{item === 'mini_test' ? 'test' : item}</TextBox>
      </View>
    )
  }

  /**
   * Check is Filter
   * @returns {boolean}
   */
  const checkFilter = () => {

    if((startDate && !endDate) || (!startDate && endDate)){
      return true;
    }
    else if (errorDate) {
      return false;
    }

    else if (showKeyword && keyword.trim().length > 0) {
      return true;
    }

    else if (skill.length > 0 || level.length > 0
        || type.length > 0 || classes.length > 0 || (!!startDate && !!endDate) && errorDate === '') {
        return true
      }
      else
        return false
  }

  /**
   * Clean Filter
   */
  const onClean = () => {
    console.log('date', null)
      setKeyword('')
      setClasses([])
      setSkill([])
      setLevel([])
      setStartDate(null)//moment().toDate())
      setType([])
      setEndDate(null)//moment().add(2, 'day'))
    //   hideModal()
    //   onFilter('')
    // }
  }

  /**
   * Cancel filter
   */
  const onCancel = () => {
      // onFilter('')
      setKeyword(history.keyword.trim())
      setClasses(history.classes)
      setSkill(history.skill)
      setLevel(history.level)
      setStartDate(history.startDate)//moment().toDate())
      setType(history.type)
      setEndDate(history.endDate)//moment().add(2, 'day'))
      hideModal()
  }

  const convertTestSkill = () => {
    console.log("=====skill ",skill)
    var hasTest = false
    var mListSk = []
    var deleMono = -1
    skill.forEach((element, ind) => {
      if(element != "exam")
        mListSk.push(element)
    });

    skill.forEach(element => {
      console.log("=====ss ",element, `"${dataSkill[7]}"`)
      if(element == `"${dataSkill[7]}"`) 
        hasTest = true
    });
    if(hasTest) 
      mListSk.push('"exam"')
    LogBase.log("=====skillList ",mListSk)
    return mListSk
  } 

  /**
   * Apply filter
   */
  const onApply = () => {
    let param = {
      keyword: keyword.trim(),
      skill: convertTestSkill(),
      classes: classes,
      level: level,
      type: type
    }
    if (!!startDate) {
      param.start_time = moment(startDate).format('YYYY-MM-DD')
    }
    if (!!endDate) {
      param.end_time = moment(endDate).format('YYYY-MM-DD')
    }
    console.log("=====KQ",param)
    onFilter(param)
    if (clearData) {
      setKeyword('')
      setClasses([])
      setSkill([])
      setLevel([])
      hideModal()
    } else {
      hideModal()
    }

  }

  const renderBody = () => {
      return(
        <View style={[styles.modal]} onLayout={(e) => {
          setSize(e.nativeEvent.layout)
        }} onStartShouldSetResponder={() => Keyboard.dismiss()}>
          <View style={styles.txtButtonHead}>
            <ShortMainButton
              justDisabled={true}
              onPress={()=>{}}
              //style={styles.cleanFilter}
              type={!checkFilter() ? 1 : 0}
              style={styles.txtAll}
              text={"Tất cả"}
            />
  
          <TouchableOpacity onPress={onCancel} style={styles.btnCancel}>
            <TextBox style={styles.txtCancel}>{language.CourseFilterModal.CloseBt}</TextBox>
          </TouchableOpacity>
          </View>
          {showKeyword && <>
            <TextBox style={styles.txtFilter}>{language.CourseFilterModal.TittleFilter}</TextBox>
            <View style={styles.viewIp}>
              <TextInput
                placeholder={CurriculumTeacherJson.placeholderFilter}
                style={Platform.OS === 'ios' ?
                  styles.ipIos : styles.ipAndroid}
                placeholderTextColor={Colors.Black}
                onChangeText={(value) => {
                  setKeyword(value)
                }}
                onBlur={() => {
                  setKeyword(keyword.trim())
                }}
                value={keyword}
              />
            </View>
          </>
          }
          {showDate && <>
            <View style={[styles.row]}>
              <View style={styles.width45}>
                <TextBox style={styles.txtStartDate}>{language.FilterModal.FromDate}</TextBox>
              </View>
              <View style={styles.width45}>
                <TextBox style={styles.txtStartDate}>{language.FilterModal.ToDate}</TextBox>
              </View>
            </View>
            <LinearGradient
              style={[styles.row, styles.borderRadius30]}
              colors={[Colors._98F1D7, Colors._7AE1D4]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <TouchableOpacity onPress={() => {
                setModalVisible(true)
              }}>
                <LinearGradient
                  style={styles.viewDate}
                  colors={[Colors.LightGreen, Colors.BaseGreen,]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <TextBox style={styles.date}>{!startDate ? 'DD/MM/YYYY' : moment(startDate).format('DD/MM/YYYY')}</TextBox>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setModalEndDate(true)
              }} style={styles.viewDate}>
                <TextBox style={styles.date}>{!endDate ? 'DD/MM/YYYY' : moment(endDate).format('DD/MM/YYYY')}</TextBox>
              </TouchableOpacity>
            </LinearGradient>
            {!!errorDate && <TextBox style={styles.txtErr}>{errorDate}</TextBox>}
          </>}
  
          <View style={styles.viewCheck}>
            <View>
              {showLevel &&
                <>
                  <TextBox style={styles.txtHeader}>{language.CourseFilterModal.TittleLevel}</TextBox>
                  {dataLevel.map((item) => renderItemLevel({ item }))}
                </>}
              {showType &&
                <>
                  <TextBox style={styles.txtHeader}>{language.CourseFilterModal.TittleLevel}</TextBox>
                  {dataType.map((item) => renderItemType({ item }))}
                </>
              }
              {showGrade && <>
                <TextBox style={[styles.txtHeader, styles.marginTop10]}>{language.CourseFilterModal.TittleGrade}</TextBox>
                {!!dataGrade && dataGrade.map((item) => renderItemClasses({ item }))}
              </>}
            </View>
            {!showDate ? <View>
              {<TextBox style={styles.txtHeader}>{language.CourseFilterModal.TittleSkill}</TextBox>}
              {dataSkill.map((item) => renderItemSkill({ item }))}
            </View>
              :
              <View style={styles.marginTop10}>
                <FlatList
                  indicatorStyle={'black'}
                  data={dataSkill}
                  renderItem={renderItemSkill}
                  keyExtractor={index => index.toString()}
                  numColumns={2}
                  scrollEnabled={false}
                />
              </View>
            }
          </View>
  
          <View style={[styles.footer, styles.horizontal]}>
            <ShortMainButton
              isDisabled={!checkFilter()}
              onPress={onClean}
              //style={styles.cleanFilter}
              textStyles={styles.txtClean}
              text={language.CourseFilterModal.DeleteFilterBt}
              widthType={'popup'}
            />
            <ShortMainButton
              type={1}
              isDisabled={errorDate.length > 0}
              onPress={onApply}
              //style={styles.btnAssign}
              textStyles={styles.txtAssign}
              text={language.CourseFilterModal.FilterBt}
              widthType={'popup'}
            />
          </View>
        </View>
      )
    };

  return (
    <Modal isVisible={visible}
      style={styles.viewModal}
    >
      {Platform.OS == 'android' ? <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true} extraScrollHeight={55} bounces={false}>
        {/* <View style={[{
            height: height - size.height - (Platform.OS === 'ios' ? 0 : 0),
            flex: 1
          }, styles.viewHeader]} /> */}
        <View style={styles.borderView}/>
        {renderBody()}
      </KeyboardAwareScrollView> 
      : 
      <>
        <View style={styles.borderView}/>
        {renderBody()}
      </>}

      <SelectDateModal rangeDate={startDate} isVisible={modalVisible}
        onSave={(date) => {
          if (!!date) {
            setStartDate(date)
          }

        }}
        requestClose={() => {
          setModalVisible(false)
        }} />
      <SelectDateModal rangeDate={endDate} isVisible={modalEndDate}
        onSave={(date) => {
          if (!!date) {
            setEndDate(date)
          }
        }}
        minimunDate={startDate}
        requestClose={() => {
          setModalEndDate(false)
        }} />
      {/* {isShowKeyBoard ? <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}><View style={styles.clickViewSty}></View></TouchableWithoutFeedback> : null} */}
    </Modal >
  )

}
const styles = StyleSheet.create({
  txtErr: {
    color: Colors.Red,
    marginTop: SmartScreenBase.smBaseHeight * 30,
    ...FontWeight.LightItalic,
    alignSelf: 'center',
    marginBottom: -SmartScreenBase.smBaseHeight * 30,
  },
  ipAndroid: {
    ...FontWeight.LightItalic,
    height: 50,
    color: Colors.Black,
    paddingHorizontal: 10,
  },
  ipIos: {
    ...FontWeight.LightItalic,
    marginVertical: 15,
    color: Colors.Black,
    marginHorizontal: 20,
  },
  viewModal: {
    margin: 0,
    justifyContent: 'flex-start',
    backgroundColor: Colors._00000070
  },
  borderView: {
    height: Platform.OS == 'ios' ? SmartScreenBase.smPercenHeight * 20 : SmartScreenBase.smPercenHeight * 100,
  },
  marginTop10: { marginTop: 10, },
  borderRadius30: { borderRadius: SmartScreenBase.smBaseWidth * 30 },
  width45: { width: SmartScreenBase.smPercenWidth * 45 },
  viewHeader: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  modal: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    // height: SmartScreenBase.smPercenHeight * 40,
    width: SmartScreenBase.smPercenWidth * 100,
    paddingVertical: SmartScreenBase.smBaseHeight * 20,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 40
  },
  btnCancel: {
    alignItems: 'flex-end'
  },
  txtCancel: {
    fontSize: FontSize.size55Font,
    ...FontWeight.Bold,
  },
  txtFilter: {
    fontSize: FontSize.size55Font,
    ...FontWeight.Bold
  },
  viewIp: {
    borderWidth: 1,
    width: SmartScreenBase.smPercenWidth*93,
    borderColor: Colors.LightGray,
    borderRadius: 20,
    marginTop: 10
  },
  iconCheck: {
    width: SmartScreenBase.smBaseWidth * 52,
    height: SmartScreenBase.smBaseWidth * 54,
    marginRight: SmartScreenBase.smBaseWidth * 40
  },
  marginRight: {
    marginRight: SmartScreenBase.smBaseWidth * 40
  },
  viewCheck: {
    marginTop: SmartScreenBase.smBaseHeight * 30,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SmartScreenBase.smPercenWidth * 5
  },
  txtHeader: {
    fontSize: FontSize.size55Font,
    ...FontWeight.Bold,
    marginBottom: 5
  },
  viewItem: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: SmartScreenBase.smPercenWidth * 45
  },
  txtItem: {
    textTransform: 'capitalize',
  },
  btnAssign: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SmartScreenBase.smBaseWidth * 65,
    marginBottom: SmartScreenBase.smPercenHeight * 2,
    width: SmartScreenBase.smPercenWidth * 45
  },
  txtAssign: {
    // color: Colors.White,
    // fontSize: FontSize.size55Font,
    ...FontWeight.Regular,

  },
  txtClean: {
    // color: Colors._00B9B6,
    // fontSize: FontSize.size55Font,
    ...FontWeight.Regular,
  },
  txtAll: {
    borderRadius: SmartScreenBase.smPercenWidth*2,
    width: SmartScreenBase.smPercenWidth*27,
    height: SmartScreenBase.smPercenWidth*9,
  },
  txtButtonHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SmartScreenBase.smPercenWidth*3
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  cleanFilter: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SmartScreenBase.smBaseWidth * 65,
    marginBottom: SmartScreenBase.smPercenHeight * 2,
    width: SmartScreenBase.smPercenWidth * 45,
    borderWidth: 1,
    borderColor: Colors._00B9B6,
  },
  txtStartDate: {
    fontSize: FontSize.size55Font,
    alignSelf: 'center',
    ...FontWeight.Bold,
  },
  viewDate: {
    paddingVertical: SmartScreenBase.smBaseHeight * 35,
    width: SmartScreenBase.smPercenWidth * 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SmartScreenBase.smBaseWidth * 30
  },
  iconRight: {
    width: SmartScreenBase.smBaseWidth * 52,
    height: SmartScreenBase.smBaseWidth * 52,
  },
  date: {
    fontSize: FontSize.size55Font
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SmartScreenBase.smBaseHeight * 5
  },
  clickViewSty: {
    width: SmartScreenBase.smPercenWidth * 100,
    height: SmartScreenBase.smPercenHeight * 60,
  }
})
