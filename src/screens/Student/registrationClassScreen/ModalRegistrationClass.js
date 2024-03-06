import React, { memo } from 'react';
import { View, Text, Modal, Image, TouchableOpacity, Dimensions } from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Button from '../../../commons/Button';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import styles from './style';
import {BANNER_LOP1} from '../../../assets/index';
const {width, height} = Dimensions.get('window');

const MODAL_RADIUS = SmartScreenBase.smBaseWidth * 40;
const MODAL_WIDTH = SmartScreenBase.smPercenWidth * 80;

const ModalRegistrationClass = ({
    visible,
    notification,
    addInformation,
    closedRegistration,
    setStudentInformation,
    startTime,
    addClass,
}) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            {
                notification === true &&
                    <View style={{
                        height: height,
                        width: width,
                        backgroundColor: '#00000065',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: MODAL_WIDTH,
                            backgroundColor: '#FFFFFF',
                            borderRadius: MODAL_RADIUS,
                        }}>
                            <Image
                                imageStyle={{
                                    width: MODAL_WIDTH,
                                    height: SmartScreenBase.smPercenWidth * 30,
                                }}
                                style={{
                                    borderTopLeftRadius: MODAL_RADIUS,
                                    borderTopRightRadius: MODAL_RADIUS,
                                    width: MODAL_WIDTH,
                                    height: SmartScreenBase.smPercenWidth * 30,
                                    resizeMode: 'stretch',
                                }}
                                source={BANNER_LOP1}
                            />

                            <View style={{
                                minHeight: SmartScreenBase.smPercenHeight * 8,
                                width: MODAL_WIDTH,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>

                                <Text style={styles.classTitleTxt}>
                                    {addInformation.class_name}
                                </Text>
                            </View>

                            <View style={styles.contentBox}>
                                <Image style={styles.iconImg}
                                    resizeMode={'contain'}
                                    source={{uri: 'avt'}}/>
                                <Text style={styles.contentTxt}>{addInformation.teacher_name}</Text>
                            </View>
                            <View style={styles.contentBox}>
                                <Image style={styles.iconImg}
                                    resizeMode={'contain'}
                                    source={{uri: 'gv_44'}}/>
                                <Text style={styles.contentTxt}>{addInformation.organization_name}</Text>
                            </View>
                            {/* <View style={styles.contentBox}>
                                <Image style={styles.iconImg}
                                    resizeMode={'contain'}
                                    source={{uri: 'gv_45'}}/>
                                <Text
                                    style={styles.contentTxt}>
                                    {startTime}
                                </Text>
                            </View> */}
                            <View style={styles.contentBox}>
                                <Image style={styles.iconImg}
                                    resizeMode={'contain'}
                                    source={{uri: 'gv_46'}}/>
                                <Text style={styles.contentTxt}>{addInformation.number_student}</Text>

                            </View>
                            {/* <View style={styles.contentBox}>
                                <Image style={styles.iconImg}
                                    resizeMode={'contain'}
                                    source={{uri: 'gv_46'}}/>
                                <Text style={styles.contentTxt}>{addInformation.number_student}</Text>

                            </View> */}
                            <View style={styles.actionGroupContainer}>
                                <ShortMainButton widthType={'mini'} text="Hủy" onPress={() => { setStudentInformation('');}} />
                                <ShortMainButton type={1} widthType={'mini'} text="Đăng ký" onPress={() => {addClass();}} />
                            </View>
                        </View>
                    </View>
            }
        </Modal>
    );
};

export default memo(ModalRegistrationClass);


// :
// notification === false ?
//     <View style={{
//         height: height,
//         width: width,
//         backgroundColor: '#00000065',
//         justifyContent: 'center',
//         alignItems: 'center',
//     }}>
//         <View style={{
//             width: MODAL_WIDTH,
//             backgroundColor: '#FFFFFF',
//             borderRadius: MODAL_RADIUS,
//             justifyContent: 'center',
//             alignItems: 'center',
//             paddingVertical: SmartScreenBase.smBaseHeight * 30,
//             paddingHorizontal: SmartScreenBase.smBaseWidth * 40,
//         }}>
//             <Text style={styles.alertMessageTxt} >
//             Bạn đã gửi yêu cầu xin vào lớp này.
//             </Text>
//             <Text style={styles.alertMessageTxt}>
//                 Vui lòng chờ Giáo viên phụ trách của lớp xét duyệt.
//             </Text>

//             <View style={{marginTop: SmartScreenBase.smBaseHeight * 30}}>
//                 <ShortMainButton type={1} widthType={'mini'} text="Đóng" onPress={() => closedRegistration()} />
//             </View>
//         </View>
//     </View>
//     :
//     null