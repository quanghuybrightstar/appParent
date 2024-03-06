import React, {useState, useEffect} from 'react';
import {Modal, SafeAreaView, View, Text, TextInput, TouchableWithoutFeedback, Image, TouchableOpacity, FlatList, Keyboard}
    from 'react-native';
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import SmartScreenBase from '../../../base/SmartScreenBase';
import {ButtonMedium} from '../../../commons/Button';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';

const ModalCreateFile = (props) => {
    const {_cancelModalCreateFile, grades, title, _onChangeTitle, _onSave} = props;
    const [positionContainer, setPositionContainer] = useState(0);
    const [positionListGrade, setPositionListGrade] = useState(0);
    const [visibleListGrade, setVisibleListGrade] = useState(false);
    const [positionListSkill, setPositionListSkill] = useState(0);
    const [visibleListSkill, setVisibleListSkill] = useState(false);
    const [widthListGrade, setWidthListSkill] = useState(0);
    const [dataGrade, setDataGrade] = useState([]);

    const [dataSkill, setDataSkill] = useState([
        {title: 'Pronunciation', choose: true},
        {title: 'Vocabulary', choose: false},
        {title: 'Grammar', choose: false},
        {title: 'Reading', choose: false},
        {title: 'Listening', choose: false},
        {title: 'Speaking', choose: false},
        {title: 'Project', choose: false},
        {title: 'Writing', choose: false},
        {title: 'Test', choose: false},
    ]);

    useEffect(() => {
        const copy = [...grades];
        copy.map((item, index) => {
            if (index === 0) {
                item.choose = true;
            } else {
                item.choose = false;
            }
            return item;
        });
        setDataGrade(copy);
    }, []);

    const _onLayoutContainer = ({nativeEvent}) => {
        setPositionContainer(nativeEvent.layout.y);
    };

    const _onLayoutViewSelectGrade = ({nativeEvent}) => {
        setPositionListGrade(nativeEvent.layout.y);
        setWidthListSkill(nativeEvent.layout.width)
    };

    const _onLayoutViewSelectSkill = ({nativeEvent}) => {
        setPositionListSkill(nativeEvent.layout.y);
    };

    const _handleSelectGrade = (index) => {
        Keyboard.dismiss();
        if (index >= 0) {
            const copy = [...dataGrade];
            copy.map(ele => ele.choose = false);
            copy[index].choose = true;
            setDataGrade(copy);
        }
        setVisibleListGrade(!visibleListGrade);
        setVisibleListSkill(false);
    };

    const _handleSelectSkill = (index) => {
        Keyboard.dismiss();
        if (index >= 0) {
            const copy = [...dataSkill];
            copy.map(ele => ele.choose = false);
            copy[index].choose = true;
            setDataSkill(copy);
        }
        setVisibleListSkill(!visibleListSkill);
        setVisibleListGrade(false);
    };

    const _renderItemGrade = ({item, index}) => {
        return (
            <TouchableWithoutFeedback onPress={() => _handleSelectGrade(index)}>
                <View style={styles.viewItemListModalCreateFile}>
                    <Text style={styles.textItemListModalCreateFile}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    };

    const _renderItemSkill = ({item, index}) => {
        return (
            <TouchableWithoutFeedback onPress={() => _handleSelectSkill(index)}>
                <View style={styles.viewItemListModalCreateFile}>
                    <Text style={styles.textItemListModalCreateFile}>{item.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    };

    const _handleSave = () => {
        const grade = dataGrade.find(ele => ele.choose).id;
        const skill = dataSkill.find(ele => ele.choose).title;
        _onSave(grade, skill);
    };

    return (
        <Modal animationType="slide" transparent={true} visible={true}>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={()=>{console.log("=====tat bp") ,Keyboard.dismiss()}}>
            <SafeAreaView style={styles.containerModalCreateFile}>
                <View style={styles.containerContentModalCreateFile} onLayout={_onLayoutContainer}>
                    <Text style={styles.textTitleCreateFile}>Tạo file</Text>
                    <View style={styles.viewInputCreateFile}>
                        <TextInput
                            style={styles.textInputCreateFile}
                            placeholder={'Tên file'}
                            placeholderTextColor={"#777"}
                            value={title}
                            onChangeText={_onChangeTitle}
                            onFocus={() => {
                                setVisibleListSkill(false);
                                setVisibleListGrade(false);
                            }}
                        />
                    </View>
                    <Text style={styles.textTitleCreateFile}>Khối lớp</Text>
                    <TouchableWithoutFeedback onLayout={_onLayoutViewSelectGrade} onPress={() => _handleSelectGrade()}>
                        <LinearGradient colors={['#00e1a0', '#00b9b7']}
                                        start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                        style={styles.viewSelectModalCreateFile}
                        >
                            <Text
                                style={styles.titleSelectModalCreateFile}>{`${dataGrade.length && dataGrade.find(ele => ele.choose).name}`}</Text>
                            <Image
                                source={{uri: 'teacher_huongdanbaigiang_btn_choose'}}
                                style={styles.iconSelectModalCreateFile}
                            />
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                    <Text style={styles.textTitleCreateFile}>Kỹ năng</Text>
                    <TouchableWithoutFeedback onLayout={_onLayoutViewSelectSkill} onPress={() => _handleSelectSkill()}>
                        <LinearGradient colors={['#00e1a0', '#00b9b7']}
                                        start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                        style={styles.viewSelectModalCreateFile}
                        >
                            <Text
                                style={styles.titleSelectModalCreateFile}>{dataSkill.find(ele => ele.choose).title}</Text>
                            <Image
                                source={{uri: 'teacher_huongdanbaigiang_btn_choose'}}
                                style={styles.iconSelectModalCreateFile}
                            />
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                    <View style={styles.viewButtonModalCreateFile}>
                        <ShortMainButton text={"Hủy"} widthType={'smPopup'} heightType={'smPopup'} 
                            onPress={_cancelModalCreateFile}/>
                        <ShortMainButton text={"Tiếp"} widthType={'smPopup'} heightType={'smPopup'} type={1}
                            isDisabled={title.trim().length == 0} onPress={_handleSave}/>
                        {/* <ButtonMedium outline isSmall title='Hủy' onPress={_cancelModalCreateFile}/> */}
                        {/* <ButtonMedium isSmall title='Tiếp' onPress={_handleSave}/> */}
                    </View>
                </View>
                {visibleListGrade &&
                <View style={{
                    ...styles.viewListModalCreateFile,
                    top: positionContainer + positionListGrade,
                    width: widthListGrade,
                }}>
                    <TouchableWithoutFeedback onPress={() => _handleSelectGrade()}>
                        <LinearGradient colors={['#00e1a0', '#00b9b7']}
                                        start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                        style={{
                                            ...styles.viewSelectModalCreateFile,
                                            marginVertical: 0,
                                            marginBottom: SmartScreenBase.smPercenWidth
                                        }}
                        >
                            <Text
                                style={styles.titleSelectModalCreateFile}>{`${dataGrade.length && dataGrade.find(ele => ele.choose).name}`}</Text>
                            <Image
                                source={{uri: 'teacher_huongdanbaigiang_btn_choose'}}
                                style={{...styles.iconSelectModalCreateFile, transform: [{rotate: '180deg'}]}}
                            />
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                    <FlatList data={dataGrade}
                              keyExtractor={(index) => index.toString()}
                              renderItem={_renderItemGrade}
                    />
                </View>
                }
                {visibleListSkill &&
                <View style={{
                    ...styles.viewListModalCreateFile,
                    top: positionContainer + positionListSkill,
                    width: widthListGrade,
                }}>
                    <TouchableWithoutFeedback onPress={() => _handleSelectSkill()}>
                        <LinearGradient colors={['#00e1a0', '#00b9b7']}
                                        start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                                        style={{
                                            ...styles.viewSelectModalCreateFile,
                                            marginVertical: 0,
                                            marginBottom: SmartScreenBase.smPercenWidth
                                        }}
                        >
                            <Text
                                style={styles.titleSelectModalCreateFile}>{dataSkill.find(ele => ele.choose).title}</Text>
                            <Image
                                source={{uri: 'teacher_huongdanbaigiang_btn_choose'}}
                                style={{...styles.iconSelectModalCreateFile, transform: [{rotate: '180deg'}]}}
                            />
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                    <FlatList data={dataSkill}
                              keyExtractor={(index) => index.toString()}
                              renderItem={_renderItemSkill}
                    />
                </View>
                }
            </SafeAreaView>
            </TouchableWithoutFeedback>
        </Modal>
    )
};

export default ModalCreateFile
