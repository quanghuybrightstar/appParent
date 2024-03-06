import React, {PureComponent} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions,
    ScrollView, Alert,
} from 'react-native';

import styles from './Catagory.Style';
import Carousel from 'react-native-snap-carousel';

const {width, height} = Dimensions.get('window');
import SmartScreenBase from '../../../base/SmartScreenBase';
import axios from 'axios';
import {connect} from 'react-redux';
import {ActionDataClass} from '../../../redux/actions/ActionDataClass';
import {ActionLogin} from '../../../redux/actions/ActionLogin';
import APIBase from '../../../base/APIBase';

class FunctionTeacherScreen extends PureComponent {
    constructor(props) {
        super(props),
            this.state = {
                Diary: [],
            };
    }

    componentDidMount = () => {
        this._getDataQuestion();
    };
    _getDataQuestion = async () => {
        let array = this.props.dataItem;
        array.forEach((element, index) => {
            if (element.id === this.props.dataClass.id_Class) {
                let saveData = array[0];
                array[index] = saveData;
                array[0] = element;
            }
        });
        this.setState({Diary: array});
    };

    _convertDay = (day) => {
        let convert = day.slice(0, 10);
        return convert;
    };
    _convertData = async (item) => {
        const array = [...this.state.Diary];

        let oj = {
            id_Class: array[item].id,
            className: array[item].class_name,
        };
        await this.props.dispatch(ActionDataClass(oj));
    };

    _renderItem = ({item, index}) => {
        return (
            <View style={styles.ViewBodyHeader}>
                <View style={styles.ViewImageHeader}>
                    <Image style={styles.ImageHeader}
                           resizeMode={'contain'}
                           source={{uri: 'ngv_64'}}/>
                </View>
                <View style={styles.ViewClass}>
                    <Text style={styles.TextClassName} numberOfLines={1}>{item.class_name}</Text>
                    <Text
                        style={styles.TextTime}>{this._convertDay(item.start_time)} - {this._convertDay(item.end_time)}</Text>
                    <Text style={styles.TextClass}>{item.organization_name}</Text>
                </View>
            </View>
        );
    };
    _onLogout = async () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn có muốn đăng xuất tài khoản không?',
            [
                {text: 'Hủy', style: 'cancel'},
                {
                    text: 'Đồng ý', onPress: async () => {
                        await this.props.dispatch(ActionLogin({}));
                        await this.props.navigation.navigate('LoginApp');
                    }
                },
            ],
            {cancelable: false}
        );
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={styles.container}>
                <View style={{...styles.ViewHeader}}>
                    <Carousel
                        ref={ref => this.carousel = ref}
                        data={this.state.Diary}
                        sliderWidth={SmartScreenBase.smPercenWidth * 97}
                        itemWidth={SmartScreenBase.smPercenWidth * 85}
                        renderItem={this._renderItem}
                        onSnapToItem={this._convertData}
                    />
                    {/* <View style={styles.ViewSlideRight}>
                        <View style={styles.Slide} />
                    </View> */}
                </View>
                <ScrollView>
                    <View style={styles.ViewWapBody}>
                        <TouchableOpacity style={styles.ButtonItem} onPress={() => {
                            this.props.navigation.navigate('AchievementBoardScreen', {status: true});
                        }}>
                            <View style={styles.ViewImageMenu}>
                                <Image style={styles.ImageMenu}
                                       resizeMode={'contain'}
                                       source={{uri: 'student_setting_image6'}}/>
                            </View>
                            <View style={styles.ViewTextMenu}>
                                <Text style={styles.TextMenu}>Bảng Thành Tích</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonItem} onPress={() => {
                            this.props.navigation.navigate('LibraryScreen', {status: true});
                        }}>
                            <View style={styles.ViewImageMenu}>
                                <Image style={styles.ImageMenu}
                                       resizeMode={'contain'}
                                       source={{uri: 'gv_21'}}/>
                            </View>
                            <View style={styles.ViewTextMenu}>
                                <Text style={styles.TextMenu}>Thư viện của tôi</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonItem}
                                          onPress={() => {
                                              this.props.navigation.navigate('CourseManagerScreen');
                                          }}>
                            <View style={styles.ViewImageMenu}>
                                <Image style={styles.ImageMenu}
                                       resizeMode={'contain'}
                                       source={{uri: 'gv_20'}}/>
                            </View>
                            <View style={styles.ViewTextMenu}>
                                <Text style={styles.TextMenu}>Quản lý khóa học</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonItem}
                                          onPress={() => {
                                              this.props.navigation.navigate('ManageClassOffline');
                                          }}>
                            <View style={styles.ViewImageMenu}>
                                <Image style={styles.ImageMenu}
                                       resizeMode={'contain'}
                                       source={{uri: 'gv_22'}}/>
                            </View>
                            <View style={styles.ViewTextMenu}>
                                <Text style={styles.TextMenu}>Quản lý lớp offline</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonItem}
                                          onPress={() => {
                                              this.props.navigation.navigate('StudyGuide');
                                          }}>
                            <View style={styles.ViewImageMenu}>
                                <Image style={styles.ImageMenu}
                                       resizeMode={'contain'}
                                       source={{uri: 'dinhkem'}}/>
                            </View>
                            <View style={styles.ViewTextMenu}>
                                <Text style={styles.TextMenu}>Hướng dẫn học tập 1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonItem}>
                            <View style={styles.ViewImageMenu}>
                                <Image style={styles.ImageMenu}
                                       resizeMode={'contain'}
                                       source={{uri: 'gv_23'}}/>
                            </View>
                            <View style={styles.ViewTextMenu}>
                                <Text style={styles.TextMenu}>Licence</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonItem}
                                          onPress={() => this.props.navigation.navigate('SettingParent', {type: 'teacher'})}>
                            <View style={styles.ViewImageMenu}>
                                <Image style={styles.ImageMenu}
                                       resizeMode={'contain'}
                                       source={{uri: 'gv_24'}}/>
                            </View>
                            <View style={styles.ViewTextMenu}>
                                <Text style={styles.TextMenu}>Cài đặt</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonItem}
                                          onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                            <View style={styles.ViewImageMenu}>
                                <Image style={styles.ImageMenu}
                                       resizeMode={'contain'}
                                       source={{uri: 'gv_25'}}/>
                            </View>
                            <View style={styles.ViewTextMenu}>
                                <Text style={styles.TextMenu}>Hồ sơ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonItem}
                                          onPress={() => this.props.navigation.navigate('SaveListScreen')}>
                            <View style={styles.ViewImageMenu}>
                                <Image style={styles.ImageMenu}
                                       resizeMode={'contain'}
                                       source={{uri: 'timdo'}}/>
                            </View>
                            <View style={styles.ViewTextMenu}>
                                <Text style={styles.TextMenu}>Danh sách yêu thích</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonItem} onPress={this._onLogout}>
                            <View style={styles.ViewImageMenu}>
                                <Image style={styles.ImageMenu}
                                       resizeMode={'contain'}
                                       source={{uri: 'gv_27'}}/>
                            </View>
                            <View style={styles.ViewTextMenu}>
                                <Text style={styles.TextMenu}>Thoát tài khoản</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        dataClass: state.AuthStackReducer.dataClass,
        dataLogin: state.AuthStackReducer.dataLogin,
        dataItem: state.AuthStackReducer.itemClass,
    };
}

export default connect(mapStateToProps)(FunctionTeacherScreen);
