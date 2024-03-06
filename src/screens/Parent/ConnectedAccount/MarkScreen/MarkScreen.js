import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground,
    Platform, FlatList,
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');
const {width, height} = Dimensions.get('screen');
import MarkedScreen from '../MarkedScreen/MarkedScreen';
import NotMarkExam from '../NotMarkExam/NotMarkExam';
import ApprovedScreen from '../ApprovedScreen/ApprovedScreen';
import StyleTeacher from '../../../../component/ModalAlam/StyleTeacher';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ModalFilterMarking from '../../../../component/ModalFilterMarking';
import {connect} from 'react-redux';
import LoginFirstComponentParent from '../../../../component/LoginFirstComponent/Parent';
import Header from '../../../../component/Header';

const data = [
    {
        id: 0,
        lesson: 'Reading 1',
        class: 'Tiếng anh lớp 12',
        unit: '5',
        start_time: '17/02/2020',
        number: 0,
        total: 30,
    },
    {
        id: 1,
        lesson: 'Reading 2',
        class: 'Tiếng anh lớp 12',
        unit: '5',
        start_time: '17/02/2020',
        number: 10,
        total: 30,
    },
    {
        id: 2,
        lesson: 'Reading 3',
        class: 'Tiếng anh lớp 12',
        unit: '5',
        start_time: '17/02/2020',
        number: 20,
        total: 30,
    },
    {
        id: 3,
        lesson: 'Reading 4',
        class: 'Tiếng anh lớp 12',
        unit: '5',
        start_time: '17/02/2020',
        number: 30,
        total: 30,
    },
];

class MarkScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataMarked: [],
            dataNotMarked: [],
            dataApprove: [],
        };
    }

    componentDidMount(): void {
        this.setState({
            dataMarked: data.concat(data),
            dataNotMark: data,
            dataApprove: data,
        });
    }

    _goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        const {dataMarked, dataNotMark, dataApprove} = this.state;
        return (
            !this.props.dataStudent.length
                ?
                <LoginFirstComponentParent />
                :
            <ImageBackground
                source={{uri:'imagebackground'}}
                style={{flex: 1}}>
                {/*<View*/}
                {/*    style={[*/}
                {/*        StyleTeacher.ViewHeader,*/}
                {/*        {justifyContent: 'space-between', alignItems: 'center'},*/}
                {/*    ]}>*/}
                {/*    <View*/}
                {/*        style={{*/}
                {/*            marginLeft: SmartScreenBase.smPercenWidth * 2,*/}
                {/*            flexDirection: 'row',*/}
                {/*            alignItems: 'center',*/}
                {/*            justifyContent: 'center',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <TouchableOpacity*/}
                {/*            onPress={this._goBack}*/}
                {/*            style={{*/}
                {/*                width: SmartScreenBase.smPercenWidth * 5,*/}
                {/*                height: SmartScreenBase.smPercenWidth * 5,*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <Image*/}
                {/*                style={{*/}
                {/*                    width: '100%',*/}
                {/*                    height: '100%',*/}
                {/*                }}*/}
                {/*                resizeMode={'contain'}*/}
                {/*                source={{uri: 'imageback'}}*/}
                {/*            />*/}
                {/*        </TouchableOpacity>*/}
                {/*        <Text*/}
                {/*            style={[*/}
                {/*                StyleTeacher.txt_Title,*/}
                {/*                {color: 'white', marginLeft: SmartScreenBase.smPercenWidth * 5},*/}
                {/*            ]}>*/}
                {/*            Chấm bài*/}
                {/*        </Text>*/}
                {/*    </View>*/}
                {/*    /!*<TouchableOpacity onPress={() => this.ModalFilter._openModal()}>*!/*/}
                {/*    /!*    <View style={{marginRight: SmartScreenBase.smPercenWidth * 2}}>*!/*/}
                {/*    /!*        <Text style={[StyleTeacher.txt_Title, {color: 'white'}]}>*!/*/}
                {/*    /!*            Lọc*!/*/}
                {/*    /!*        </Text>*!/*/}
                {/*    /!*    </View>*!/*/}
                {/*    /!*</TouchableOpacity>*!/*/}
                {/*</View>*/}
                <Header showBack={false} title= {'Chấm bài'} goBack={() => props.navigation.goBack()}/>
                <View style={{alignItems: 'center', flex: 1}}>
                    <ScrollableTabView
                        tabBarTextStyle={{fontSize: SmartScreenBase.smPercenWidth * 3.5}}
                        style={{justifyContent: 'center', width: '95%'}}
                        tabBarActiveTextColor={'#fff'}
                        tabBarInactiveTextColor={'#ffffff70'}
                        tabBarUnderlineStyle={{backgroundColor: 'yellow'}}
                    >
                        <MarkedScreen tabLabel="ĐÃ CHẤM" Data={dataMarked}/>
                        <NotMarkExam tabLabel="CHƯA CHẤM" Data={dataNotMark}/>
                        <ApprovedScreen tabLabel="PHÊ DUYỆT" Data={dataApprove}/>
                    </ScrollableTabView>
                    <ModalFilterMarking ref={refs => (this.ModalFilter = refs)}/>
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        dataStudent: state.ListStudentReducer.dataStudent
    };
}

export default connect(mapStateToProps)(MarkScreen);
