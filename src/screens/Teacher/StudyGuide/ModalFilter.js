import React, {useEffect, useState} from 'react';
import {Modal, SafeAreaView, View, Text, TouchableWithoutFeedback, TouchableOpacity, Image} from 'react-native';
import styles from "./styles";
import styleApp from '../../../styleApp/stylesApp';
import Button from '../../../commons/Button';
import {ShortMainButton} from '../../../componentBase/ShortMainButton'
import {useDispatch, useSelector} from 'react-redux';
import FontBase from '../../../base/FontBase';
import { TextBox } from '../../../componentBase/TextBox';

const ModalFilter = (props) => {
    const {visible,_cancelModalFilter, dataGrade, dataType, dataSkill, _handleItem, _handleFilter,
         _handleDeleteFilter} = props;
    const language = useSelector(state => state.LanguageStackReducer.language)
    const [disabled, setDisabled] = useState(true);
    //cache data before edit

    useEffect(() => {
        checkDisable()
    },[dataGrade, dataType, dataSkill])

    const _renderItem = (item, index, data) => {
        return (
            <TouchableWithoutFeedback
                key={index}
                onPress={() => {_handleItem(index, data), checkDisable()}}>
                <View style={styles.viewItemModalFilter}>
                    <View style={styles.viewIconBoxModalFilter}>
                        <Image source={{uri: 'teacher_huongdanbaigiang_btn_box'}}
                               style={styles.iconBoxModalFilter}
                        />
                        {item.choose &&
                        <Image source={{uri: 'teacher_huongdanbaigiang_icon_tick'}}
                               style={styles.iconTickModalFilter}
                        />
                        }
                    </View>
                    <Text style={styles.textItemModalFilter}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    };

    const onClose = () => {

        _cancelModalFilter();
    }
    const checkDisable = () => {

        var isDis = true

        dataType.forEach(element => {
            if(element.choose){
                isDis =  false
            }
        });

        dataGrade.forEach(element => {
            if(element.choose){
                isDis = false
            }
        });

        dataSkill.forEach(element => {
            if(element.choose){
                isDis = false
            }
        });
        console.log("=====isDis",dataType,dataGrade,dataSkill)
        console.log("=====isDis kq",isDis)
        setDisabled(isDis)
    }

    return (
        <Modal animationType="slide" transparent={true} visible={visible} 
            onModalShow={()=>{checkDisable()}}>
            <SafeAreaView style={styles.containerModalFilter}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={{flex: 1}}/>
                </TouchableWithoutFeedback>
                <View style={styles.containerContentModalFilter}>
                    {/* <TouchableOpacity style={styles.btnClose} onPress={_cancelModalFilter}>
                            <Text style={styleApp.txt_Title}>Hủy</Text>
                    </TouchableOpacity> */}
                    <View style={styles.txtButtonHead}>
                    <ShortMainButton
                        justDisabled={true}
                        onPress={()=>{}}
                        //style={styles.cleanFilter}
                        type={disabled ? 1 : 0}
                        style={styles.txtAll}
                        text={"Tất cả"}
                    />

                    <TouchableOpacity onPress={onClose} style={styles.btnCancel}>
                    <TextBox style={styles.txtCancel}>{language.CourseFilterModal.CloseBt}</TextBox>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.viewContentModalFilter}>
                        <View style={styles.viewLeftContentModalFilter}>
                            <Text style={styles.texTitleModalFilter}>Tệp tin</Text>
                            {
                                dataType.map((item, index) => _renderItem(item, index, dataType))
                            }
                            <Text style={styles.texTitleModalFilter}>Khối lớp</Text>
                            {
                                dataGrade.map((item, index) => _renderItem(item, index, dataGrade))
                            }
                        </View>
                        <View style={styles.viewLeftContentModalFilter}>
                            <Text style={styles.texTitleModalFilter}>Kỹ năng</Text>
                            {
                                dataSkill.map((item, index) => _renderItem(item, index, dataSkill))
                            }
                        </View>
                    </View>
                    <View style={styles.viewButton}>
                        {/* <TouchableOpacity style={styles.buttonModalFilter} onPress={_handleDeleteFilter}>
                            <Text style={styles.textButtonModalFilter}>Xóa lọc</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonModalFilter} onPress={_handleFilter}>
                            <Text style={styles.textButtonModalFilter}>Lọc</Text>
                        </TouchableOpacity> */}
                        <ShortMainButton
                            isDisabled={disabled}
                            onPress={()=>{setDisabled(false) ;_handleDeleteFilter()}}
                            textStyles={{fontFamily: FontBase.MyriadPro_Regular}}
                            text={language.CourseFilterModal.DeleteFilterBt}
                            widthType={'popup'}
                        />
                        <ShortMainButton
                            // isDisabled={disabled}
                            type={1}
                            onPress={_handleFilter}
                            textStyles={{fontFamily: FontBase.MyriadPro_Regular}}
                            text={language.CourseFilterModal.FilterBt}
                            widthType={'popup'}
                        />
                        {/* <Button outline isShort onPress={_handleDeleteFilter} title={'Xóa lọc'}/> */}
                        {/* <Button isShort onPress={_handleFilter}  title={'Lọc'}/> */}
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
};

export default ModalFilter;
