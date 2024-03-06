
import * as React from 'react'
import { Platform, StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import SmartScreenBase from '../../../../base/SmartScreenBase'
import { TextBox } from '../../../../componentBase/TextBox'
import { Colors } from '../../../../styleApp/color'
import { FontSize, FontWeight } from '../../../../styleApp/font'
import stylesApp from '../../../../styleApp/stylesApp'
import { RoundAvatar } from '../../../../componentBase/RoundAvatar'
import API from '../../../../API/APIConstant'
import APIBase from '../../../../base/APIBase'
import { useEffect, useState } from 'react'
import moment from 'moment'
import MyData from '../../../../component/MyData'

/**
 * Student list of Teacher study reoport
 * @param {object} props navigation props
 * @returns {Component}
 */
export const StudentList = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    let id = props.navigation.getParam('id')
    let [mem, setMem] = useState([])
    const [baseUrl, setBaseUrl] = useState('')
    const [curDayBC, setCurDayBC] = useState(props.curDay)

    /**
     * Get list member of class
     */
    const getMember = async () => {
        let url = API.baseurl + API.GetClassMember + "?class_id=" + id
        try {
            let res = await APIBase.tokenAPI('get', url)
            console.log('🚀 ~ file: StudentList.js ~ line 25 ~ getMember ~ res', res)
            if (!!res && !!res.data && !!res.data.data) {
                setBaseUrl(res.data.base_url)
                setMem(res.data.data)
            }
        } catch (error) {
            console.log("----error", error);
        }
    }

    useEffect(() => {
        getMember()
    }, [])

    useEffect(() => {
        setCurDayBC(props.curDay)
    }, [props.curDay])

    /**
     * render student item
     * @param {object} props Flatlist item props
     * @property {object} item 
     * @property {number} index
     * @returns {Component}
     */
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    MyData.classID = props.navigation.getParam('id')
                    props.navigation.navigate("DetailReportTeacherScreen", { item: item, curDay: props.curDay })
                }}
            >
                <TextBox style={styles.itemNo}>
                    {index + 1}
                </TextBox>
                <RoundAvatar
                    avatar={`${baseUrl}${item.avatar}`}
                    gender={item.gender}
                    width={SmartScreenBase.smBaseWidth * 150}
                    height={SmartScreenBase.smBaseWidth * 150}
                />
                <TextBox style={styles.name}>
                    {item.fullname}
                </TextBox>
            </TouchableOpacity>
        )
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={[Colors._C5F3F1, Colors._F3FFFF, Colors._F3FFFF]}
            start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.spacing} />
            <View style={styles.content}>
                <FlatList
                    bounces={false}
                    indicatorStyle={'black'}
                    style={styles.flex1}
                    data={mem}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.spacing} />}
                />
            </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    flex1: { flex: 1 },
    container: {
        flex: 1,
    },
    spacing: {
        marginTop: SmartScreenBase.smPercenWidth * 4,
    },
    outerView: {
        padding: SmartScreenBase.smPercenWidth * 2,
        marginHorizontal: SmartScreenBase.smPercenWidth * 3,
    },
    content: {
        backgroundColor: 'white',
        marginHorizontal: SmartScreenBase.smPercenWidth * 3,
        marginBottom: SmartScreenBase.smBaseWidth * 50,
        paddingVertical: SmartScreenBase.smPercenWidth * 5,
        ...stylesApp.shadow,
        flex: 1,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemNo: {
        fontSize: FontSize.size55Font,
        ...FontWeight.SemiBold,
        // marginHorizontal: SmartScreenBase.smPercenWidth * 5,
        width: SmartScreenBase.smBaseWidth * 120,
        paddingLeft: SmartScreenBase.smBaseWidth * 40,
    },
    name: {
        flex: 1,
        paddingRight: SmartScreenBase.smPercenWidth * 5,
        fontSize: FontSize.size45Font,
        marginLeft: SmartScreenBase.smPercenWidth * 5
    }
});