import React, {PureComponent} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image, Alert,
} from 'react-native';
import Header from '../../../../component/Header';

import SmartScreenBase from "../../../../base/SmartScreenBase";

const {width, height} = Dimensions.get('window');
import styles from './Catagory.Style';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import API from "../../../../API/APIConstant";
import {ActionLogin} from "../../../../redux/actions/ActionLogin";
import ChooseStudentAction from "../../../../redux/actions/ChooseStudentAction";

class Catagory extends PureComponent {
    constructor(props) {
        super(props);
    }

    renderItem = ({item, index}) => {
        return (
            <View style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#00000030',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {
                    item.avatar ?
                        <View style={{
                            marginHorizontal: SmartScreenBase.smPercenWidth * 2,
                            borderWidth: SmartScreenBase.smPercenHeight * 0.5,
                            borderColor: '#e9af38',
                            backgroundColor: '#fff',
                            width: SmartScreenBase.smPercenHeight * 16,
                            height: SmartScreenBase.smPercenHeight * 16,
                            borderRadius: SmartScreenBase.smPercenHeight * 100,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Image
                                source={{uri: API.urlAvatar + '/' + item.avatar}}
                                resizeMode={'cover'}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: SmartScreenBase.smPercenHeight * 100
                                }}
                            />
                        </View>
                        : <Image
                            source={{uri: item.gender === 'female' ? 'avt' : 'gv_liststudent_11'}}
                            resizeMode={'cover'}
                            style={{
                                marginHorizontal: SmartScreenBase.smPercenWidth * 2,
                                width: SmartScreenBase.smPercenHeight * 16,
                                height: SmartScreenBase.smPercenHeight * 16,
                                borderRadius: SmartScreenBase.smPercenHeight * 100
                            }}
                        />
                }
                <View style={{flex: 1, paddingHorizontal: SmartScreenBase.smPercenHeight * 2, height: '100%', justifyContent: 'space-around', paddingVertical: SmartScreenBase.smPercenHeight}}>
                    <Text style={{color: '#fff', fontWeight: '700', fontSize: SmartScreenBase.smPercenHeight * 3}}>{item.fullname}</Text>
                    <Text style={{color: '#fff', fontSize: SmartScreenBase.smPercenHeight * 2}}>
                        {`${item.email}\n${item.phone}`}
                    </Text>
                </View>
            </View>
        );
    };

    _logOut = () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn có muốn đăng xuất tài khoản không?',
            [
                {text: 'Hủy', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'Đồng ý', onPress: async () => {
                        this.props.dispatch(ActionLogin({}));
                        this.props.navigation.navigate('LoginApp');
                    }
                },
            ],
            {cancelable: false}
        );
    };

    _goToStartScreen = () => {
        
    };

    _onScrollCarousel = (slideIndex) => {
        this.props.dispatch(ChooseStudentAction(this.props.listStudent[slideIndex]));
    };
    _moveLikeScreen = () =>{
        this.props.navigation.navigate('SaveListScreen')
    }
    render() {
        const index = this.props.listStudent.findIndex(item => item.id === this.props.currentStudent.id);
        return (
            <ImageBackground
                source={{uri: 'imagebackground'}}
                style={{flex: 1}}>
                <Header showBack={false} title= {'Xem thông tin học viên'}/>
                {/*<Header title={'Xem thông tin học viên'}/>*/}

                <View style={styles.wrapCart}>
                    <Carousel
                        ref={c => {
                            this._carousel = c;
                        }}
                        data={this.props.listStudent}
                        renderItem={this.renderItem}
                        firstItem={index}
                        sliderWidth={width}
                        itemWidth={width * 0.85}
                        containerCustomStyle={{height: '85%'}}
                        onSnapToItem={this._onScrollCarousel}
                    />
                </View>
                <View style={styles.wrapText1}>
                    <ScrollView style={styles.wrapAccountNumber}>
                        <TouchableOpacity style={styles.text1}>
                            <View style={styles.wrapCopy}>
                                <Image
                                    style={styles.wrapCopy2}
                                    source={{uri: 'phu-huynh-50'}}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('LibraryScreen')}
                                              style={styles.wrapView}>
                                <Text style={{fontSize: 20, color: '#000'}}>
                                    Thư viện của tôi
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.text1}>
                            <View style={styles.wrapCopy}>
                                <Image
                                    style={styles.wrapCopy2}
                                    source={{uri: 'phu-huynh-51'}}
                                />
                            </View>
                            <View style={styles.wrapView}>
                                <Text style={{fontSize: 20, color: '#000'}}>
                                    Xem thành tích học viên
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('License');
                            }}
                            style={styles.text1}>
                            <View style={styles.wrapCopy}>
                                <Image
                                    style={styles.wrapCopy2}
                                    source={{uri: 'phu-huynh-52'}}
                                />
                            </View>
                            <View style={styles.wrapView}>
                                <Text style={{fontSize: 20, color: '#000'}}>License</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('SettingParent');
                            }}
                            style={styles.text1}>
                            <View style={styles.wrapCopy}>
                                <Image
                                    style={styles.wrapCopy2}
                                    source={{uri: 'phu-huynh-53'}}
                                />
                            </View>
                            <View style={styles.wrapView}>
                                <Text style={{fontSize: 20, color: '#000'}}>Cài đặt</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.text1} onPress={()=>this.props.navigation.navigate('ProfileScreen')}>
                            <View style={styles.wrapCopy}>
                                <Image
                                    style={styles.wrapCopy2}
                                    source={{uri: 'phu-huynh-54'}}
                                />
                            </View>
                            <View style={styles.wrapView}>
                                <Text style={{fontSize: 20, color: '#000'}}>Hồ sơ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._goToStartScreen}
                            style={styles.text1}>
                            <View style={styles.wrapCopy}>
                                <Image
                                    style={styles.wrapCopy2}
                                    source={{uri: 'phu-huynh-55'}}
                                />
                            </View>
                            <View style={styles.wrapView}>
                                <Text style={{fontSize: 20, color: '#000'}}>
                                    Liên kết tài khoản
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.text1} onPress={this._moveLikeScreen}>
                            <View style={styles.wrapCopy}>
                                <Image
                                    style={styles.wrapCopy2}
                                    source={{uri: 'timdo'}}
                                />
                            </View>
                            <View style={styles.wrapView}>
                                <Text style={{fontSize: 20, color: '#000'}}>
                                    Danh sách yêu thích
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{...styles.text1,marginBottom:80}} onPress={this._logOut}>
                            <View style={styles.wrapCopy}>
                                <Image
                                    style={styles.wrapCopy2}
                                    source={{uri: 'phu-huynh-56'}}
                                />
                            </View>
                            <View style={styles.wrapView}>
                                <Text style={{fontSize: 20, color: '#000'}}>
                                    Thoát tài khoản
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listStudent: state.ListStudentReducer.dataStudent,
        currentStudent: state.ListStudentReducer.currentStudent
    }
};

export default connect(mapStateToProps)(Catagory);
