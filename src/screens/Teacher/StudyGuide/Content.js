import React from 'react';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import styleApp from '../../../styleApp/stylesApp';
import FontBase from '../../../base/FontBase';
import LogBase from '../../../base/LogBase';

const Content = (props) => {
    const {dataStudy, _handleResource, _handleDeleteItem, isStudent} = props;
    const _renderIconResource = (type, path) => {
        let uri;
        switch (type) {
        case 'writing':
            uri = 'teacher_huongdanbaigiang_icon_text';
            break;
        case 'audio':
            uri = 'teacher_huongdanbaigiang_icon_mp3';
            break;
        case 'video':
            uri = 'teacher_huongdanbaigiang_icon_video';
            break;
        case 'img':
            uri = 'teacher_huongdanbaigiang_icon_image';
            break;
        case 'document':
            const check = path.slice(path.length - 6, path.length);
            if (check.includes('doc') || check.includes('docx')){
                uri = 'teacher_huongdanbaigiang_icon_word';
            } else if (check.includes('xlsx')){
                uri = 'teacher_huongdanbaigiang_icon_exel';
            } else if (check.includes('ppt')){
                uri = 'teacher_huongdanbaigiang_icon_powerpoint';
            } else if (check.includes('pdf')){
                uri = 'teacher_huongdanbaigiang_icon_pdf';
            } else{
                uri = 'teacher_huongdanbaigiang_icon_word';
            }
            break;
        default:
            break;
        }
        return <Image source={{uri}} style={styles.iconType} resizeMode={'contain'}/>;
    };

    const _renderStringNumber = (number) => {
        return (number.toString().length === 0 ? '0' : '') + number;
    };

    const _renderItem = ({item, index}) => {
        const date = new Date(item.created_at.split(' ')[0]);
        return (
            <TouchableOpacity style={{
                ...styles.viewItem,
                marginBottom: index === dataStudy.length - 1 ? SmartScreenBase.smPercenWidth * 20 : 0,
            }} onPress={() => _handleResource(item)}>
                <View style={styles.viewContentItem}>
                    <Text numberofLines={2} style={styles.textNameFile}>{item.title}</Text>
                    <Text
                        style={styles.textCreatedOn}>{`Ngày tạo: ${_renderStringNumber(date.getDate())}/${_renderStringNumber(date.getMonth() + 1)}/${date.getFullYear()}`}</Text>
                    <Text style={styles.textSkill}>{`${item.grade_name ? item.grade_name+" >> " : ""}${item.skill}`}</Text>
                    {!isStudent && <TouchableOpacity style={styles.buttonDeleteItem} onPress={() => _handleDeleteItem(item.id)}>
                        <Image
                            source={{uri: 'teacher_huongdanbaigiang_btn_delete'}}
                            style={styles.iconDeleteItem}
                        />
                    </TouchableOpacity>}
                </View>
                <View style={styles.viewIconType}>
                    {_renderIconResource(item.type, item.path)}
                </View>
            </TouchableOpacity>
        );
    };

    const _itemSeparatorComponent = () => {
        return <View style={styles.viewItemSeparatorComponent}/>;
    };

    return (
        <View style={styles.content}>
            {LogBase.log("=====content")}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={dataStudy}
                renderItem={_renderItem}
                keyExtractor={(item,index) => index.toString()}
                scrollEnabled={true}
                ItemSeparatorComponent={_itemSeparatorComponent}
                ListEmptyComponent={()=>{
                    return <Text style={[{
                        margin:SmartScreenBase.smPercenWidth * 2,
                        fontFamily: FontBase.MyriadPro_Regular,
                        fontSize: SmartScreenBase.smFontSize * 50,
                        alignContent: 'center',
                        alignSelf: 'center'
                    }]}
                    >Không có file phù hợp!</Text>;
                }}
            />
        </View>
    );
};

export default Content;
