import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  FilterActionLevel,
  FilterActionSkill,
} from '../../../../redux/actions/Filter';
import {Colors} from '../../../../styleApp/color';
import {ShortMainButton} from '../../../../componentBase/ShortMainButton';
import {TextBox} from '../../../../componentBase/TextBox';
import FontBase from '../../../../base/FontBase';
import LogBase from '../../../../base/LogBase';

const ModalFilter = (props) => {
  const dispatch = useDispatch();
  const {
    _showModalFilter,
    _applyFilter,
    setIsPressFilter,
    isPressFilter,
  } = props;

  const language = useSelector(state => state.LanguageStackReducer.language)

  //Kiểm tra disable nút áp dụng
  const [disabled, setDisabled] = useState(false);
  //Lưu dữ liệu filter
  const {listSkill, listLevel} = useSelector((state) => state.FilterReducer);

  const [dataSkill, setDataSkill] = useState([]);
  const [dataLevel, setDataLevel] = useState([]);

  useEffect(() => {
    console.log('dataSkill.useEffect', dataSkill);
    console.log('dataLevel.useEffect', dataLevel);
  }, [dataLevel, dataSkill]);

  useEffect(() => {
    setDataSkill([...listSkill]);
    setDataLevel([...listLevel]);
  }, []);

  //Khi ấn nút xoá filter
  const _deleteFilter = async () => {
    // let flag = false;
    // console.log('listLevel._deleteFilter', listLevel);
    // console.log('listSkill._deleteFilter', listSkill);
    // console.log('isPressFilter._deleteFilter', isPressFilter);
    // listLevel?.map((item) => {
    //   if (item.choose) {
    //     flag = true;
    //   }
    // });
    // listSkill?.map((item) => {
    //   if (item.choose) {
    //     flag = true;
    //   }
    // });
    // dispatch(
    //   FilterActionLevel([
    //     {name: 'Easy', choose: false},
    //     {name: 'Normal', choose: false},
    //     {name: 'Hard', choose: false},
    //   ]),
    // );
    // dispatch(
    //   FilterActionSkill([
    //     {name: 'Speaking', choose: false},
    //     {name: 'Writing', choose: false},
    //     {name: 'Project', choose: false},
    //   ]),
    // );
    // console.log('isPressFilter', isPressFilter);
    // // if (flag && isPressFilter) {
    //   _applyFilter(
    //     true,
    //     true,
    //     [
    //       {name: 'Easy', choose: false},
    //       {name: 'Normal', choose: false},
    //       {name: 'Hard', choose: false},
    //     ],
    //     [
    //       {name: 'Speaking', choose: false},
    //       {name: 'Writing', choose: false},
    //       {name: 'Project', choose: false},
    //     ],
    //   );
    //   // _showModalFilter();
    //   setIsPressFilter(true);
    // // } else {
    //   // _showModalFilter();
    // // }
    
    setDataLevel([
      {name: 'Easy', choose: false},
      {name: 'Normal', choose: false},
      {name: 'Hard', choose: false},
    ]);
    setDataSkill([
      {name: 'Speaking', choose: false},
      {name: 'Writing', choose: false},
      {name: 'Project', choose: false},
    ]);
  }

  //Khi ấn nút cancel modal
  const cancelModal = useCallback(() => {
    // console.log('isPressFilter', isPressFilter);
    // if (!isPressFilter) {
    //   dispatch(
    // FilterActionLevel([
    //   {name: 'Easy', choose: false},
    //   {name: 'Normal', choose: false},
    //   {name: 'Hard', choose: false},
    // ]),
    //   );
    //   dispatch(
    //     FilterActionSkill([
    //       {name: 'Speaking', choose: false},
    //       {name: 'Writing', choose: false},
    //       {name: 'Project', choose: false},
    //     ]),
    //   );
    // } else {
    //   console.log('dataLevel', dataLevel);
    //   console.log('dataSkill', dataSkill);
    //   dispatch(FilterActionLevel(dataLevel));
    //   dispatch(FilterActionSkill(dataSkill));
    // }
    _showModalFilter();
  }, [_showModalFilter]);

  //Kiểm tra disable nút áp dụng
  useEffect(() => {
    if (dataSkill.length) {
      setDisabled(false);
    } else if (dataLevel.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [dataLevel.length, dataSkill.length]);

  //Kiểm tra disable nút áp dụng
  useEffect(() => {
    let flag = true;
    dataSkill?.map((item) => {
      if (item?.choose) {
        flag = false;
      }
    });
    dataLevel?.map((item) => {
      if (item?.choose) {
        flag = false;
      }
    });
    setDisabled(flag);
  }, [dataLevel, dataSkill]);

  //Hiển thị giao diện đối với từng item trong list
  const _renderItem = (item, index) => {
    //chọn/huỷ filter
    function _handleItem() {
      // console.log('item', item);
      // console.log('index', index);
      // console.log('dataLevel._handleItem', dataLevel);
      // console.log('dataSkill._handleItem', dataSkill);
      // console.log('listSkill._handleItem', listSkill);
      if (
        item.name === 'Easy' ||
        item.name === 'Normal' ||
        item.name === 'Hard'
      ) {
        // const item1 = {
        //   ...item,
        //   choose: !item.choose,
        // }
        let copy = [...dataLevel];
        copy[index] = {
          ...copy[index],
          choose: !copy[index].choose,
        };
        console.log('copy.listLevel', copy);
        console.log('listLevel._handleItem', listLevel);
        setDataLevel(copy);
      } else if (
        item.name === 'Speaking' ||
        item.name === 'Writing' ||
        item.name === 'Project'
      ) {
        let copy = [...dataSkill];
        copy[index] = {
          ...copy[index],
          choose: !copy[index].choose,
        };
        console.log('dataSkill.listSkill', dataSkill);
        setDataSkill(copy);
      }
    }
    return (
      <TouchableWithoutFeedback onPress={_handleItem}>
        <View style={styles.viewItemModalFilter}>
          <View style={styles.viewIconBoxModalFilter}>
            <Image
              source={{uri: 'teacher_huongdanbaigiang_btn_box'}}
              style={styles.iconBoxModalFilter}
            />
            {item.choose && (
              <Image
                source={{uri: 'teacher_huongdanbaigiang_icon_tick'}}
                style={styles.iconTickModalFilter}
              />
            )}
          </View>
          <Text style={styles.textItemModalFilter}>
            {item.name !== 'Normal' ? item.name : 'Medium'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const checkIsFilter = () => {
    var isAll = true
    var levelCheck = dataLevel[0].choose
    dataLevel.forEach(element => {
      if(element.choose != levelCheck)
        isAll = false
    });
    var skillCheck = dataSkill[0].choose
    dataSkill.forEach(element => {
      if(element.choose != skillCheck)
        isAll = false
    });
    LogBase.log("=====checkIsAll",!(isAll && levelCheck == skillCheck))
    return !(isAll && levelCheck == skillCheck)
  }

  //Áp dụng các điều kiện để lọc dữ liệu
  const apply = useCallback(() => {
    LogBase.log('apply');
    LogBase.log('dataLevel', dataLevel);
    LogBase.log('dataSkill', dataSkill);
    dispatch(FilterActionLevel(dataLevel));
    dispatch(FilterActionSkill(dataSkill));
    _applyFilter(true, false, dataLevel, dataSkill, checkIsFilter());
    _showModalFilter();
    setIsPressFilter(true);
  }, [
    _applyFilter,
    _showModalFilter,
    dataLevel,
    dataSkill,
    dispatch,
    setIsPressFilter,
  ]);

  return (
    <Modal
      visible={true}
      backdropColor={Colors.White}
      backdropOpacity={0}
      animationType={'slide'}
      style={styles.container}
      transparent={true}>
      <View>
        <View style={styles.containerContent}>
        <View style={styles.txtButtonHead}>
          <ShortMainButton
            justDisabled={true}
            onPress={()=>{}}
            //style={styles.cleanFilter}
            type={disabled ? 1 : 0}
            style={styles.txtAll}
            text={"Tất cả"}
          />

        <TouchableOpacity onPress={cancelModal} style={styles.btnCancel}>
          <TextBox style={styles.txtCancel}>{language.CourseFilterModal.CloseBt}</TextBox>
        </TouchableOpacity>
        </View>
          {/* <View style={styles.viewButtonCancel}>
            <TouchableOpacity style={styles.buttonCancel} onPress={cancelModal}>
              <Text style={styles.textCancel}>Hủy</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.viewContent}>
            <View style={styles.viewLeftContentModalFilter}>
              <View>
                <Text style={styles.texTitleModalFilter}>Độ khó</Text>
                <View>
                  {dataLevel?.map((item, index) => _renderItem(item, index))}
                </View>
              </View>
            </View>
            <View style={styles.viewRightContentModalFilter}>
              <View>
                <Text style={styles.texTitleModalFilter}>Kỹ năng</Text>
                <View>
                  {dataSkill?.map((item, index) => {
                    return _renderItem(item, index);
                  })}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.viewButton}>
          <ShortMainButton
            isDisabled={disabled}
            onPress={_deleteFilter}
            textStyles={{fontFamily: FontBase.MyriadPro_Regular}}
            text={language.CourseFilterModal.DeleteFilterBt}
            widthType={'popup'}
            />
            <View style={{width: '5%'}} />
            <ShortMainButton
            // isDisabled={disabled}
            type={1}
            onPress={apply}
            textStyles={{fontFamily: FontBase.MyriadPro_Regular}}
            text={language.CourseFilterModal.FilterBt}
            widthType={'popup'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFilter;
