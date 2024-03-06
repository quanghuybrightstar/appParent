import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import styles from './styles';
import SmartScreenBase from '../../../base/SmartScreenBase';
import StyleStudent from '../StyleStudent';
import ViewImage from '../../../component/ViewImage';
import Loading from '../../../component/LoadingScreen';
import * as action from '../../../ReduxStudent/actions/Student';
import { connect } from 'react-redux';
import moment from 'moment';
import MyData from '../../../component/MyData';
import ViewImageShadow from '../../../component/ViewImageShadow';
import LoginFirstComponentStudent from '../../../component/LoginFirstComponent/Student';
const BaseWidth = Dimensions.get('screen').width / 100;

class homescreen extends Component {

    constructor(props) {
        super();
        this.state = {
            index: 0,
            ChooseLesson: 0,
            isloading: false,
            ResponeData: null,
            IDchoice: 0,
            dataSet: null
        };
        this.props = props;
        this.LimitUnit = 15;
        MyData.Navigation = this.props;
    }

    async componentDidMount() {
        console.log("---------hhhhhhhh");
        this.props.loadapilogin();
        this.props.loadapiprofilehv();
    }

    _onPressScroll(item, key) {
        this.setState({ index: key });
        this.state.IDchoice = key;
        this.refs.scroll.scrollTo({ x: BaseWidth * 100 * key, y: 0 });
        this.refs.Scroll_Under.scrollTo({ x: BaseWidth * 30 * key, y: 0 });
    }

    size = BaseWidth * 30;

    exercise_type(type) {
        switch (type) {
            case 'grammar':
                return 'hv_freelearn_14';
            case 'reading':
                return 'hv_freelearn_21';
            case 'vocabulary':
                return 'hv_freelearn_15';
            case 'pronunciation':
                return 'hv_freelearn_13';
            case 'speaking':
                return 'hv_freelearn_22';
            case 'listening':
                return 'hv_freelearn_16';
            case 'writing':
                return 'hv_freelearn_19';
            default:
                return null;
        }
    }

    render() {
        console.log('this.props.data', this.props.data);
        return (
            <SafeAreaView>
                <ImageBackground imageStyle={StyleStudent.Sty_ImageBackground}
                    style={StyleStudent.Sty_ImageBackground}
                    source={{ uri: 'imagebackgroundhome' }}>
                    <StatusBar backgroundColor="lightgray" barStyle="light-content" animated={true} />
                    {
                        this.props.data !== null && !this.props.data.data.list_curriculum.length
                            ?
                            <LoginFirstComponentStudent />
                            :
                            null
                    }
                    {this.props.data !== null ? (
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: SmartScreenBase.smPercenWidth * 100,
                            }}>
                                <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 3 }}>
                                    <ViewImage Width={369} Height={236} Name={'student_home_image12'} />
                                </View>
                                {/* <View style={{
                                    marginRight: SmartScreenBase.smPercenWidth * 5,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <ViewImage Width={42} Height={44} Name={'student_home_image1'} />
                                    <Text style={{
                                        marginHorizontal: SmartScreenBase.smPercenWidth,
                                        fontWeight: 'bold', fontSize: SmartScreenBase.smPercenWidth * 4,
                                    }}>390</Text>
                                    <ViewImage Width={95} Height={95} Name={'student_home_image2'} />
                                </View> */}
                            </View>
                            <View style={{ height: SmartScreenBase.smPercenHeight * 50 }}>
                                <ScrollView scrollEnabled={false} ref="scroll" showsHorizontalScrollIndicator={false}
                                    horizontal
                                >
                                    {
                                        this.props.data.data.list_teacher.concat(this.props.data.data.list_curriculum).map((ob, key) => {
                                            return (
                                                this._renderUnit(ob, key)
                                            );
                                        })
                                    }
                                </ScrollView>
                            </View>
                            <View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                    overScrollMode="never"
                                    directionalLockEnabled={true}
                                    ref="Scroll_Under"
                                >
                                    {
                                        this.props.data.data.list_teacher.concat(this.props.data.data.list_curriculum).map((item, key) => {
                                            if (this.state.index === key) {
                                                this.size = 280;
                                            } else {
                                                this.size = 270;
                                            }
                                            return (
                                                <View key={key} style={{
                                                    height: SmartScreenBase.smPercenHeight * 27,
                                                    backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center',
                                                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this._onPressScroll(item, key);
                                                        }}
                                                    >
                                                        <View
                                                            style={[styles.Sty_Content_Teach, { backgroundColor: this.state.index == key ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.25)' }]}>
                                                            <View style={{
                                                                marginTop: SmartScreenBase.smPercenHeight * 12,
                                                                alignItems: 'center',
                                                            }}>
                                                                <Text style={[
                                                                    StyleStudent.FontText,
                                                                    {
                                                                        color: 'white',
                                                                        textAlign: 'center',
                                                                        maxWidth: SmartScreenBase.smPercenWidth * 25,
                                                                    }]}>
                                                                    {item.curriculum_name ? item.curriculum_name : item.username}
                                                                </Text>
                                                            </View>
                                                            <View style={{
                                                                position: 'absolute',
                                                                top: -SmartScreenBase.smPercenHeight * (this.state.index == key ? 3 : 2),
                                                                borderRadius: SmartScreenBase.smPercenWidth * 150,
                                                                borderWidth: this.state.index == key ? 3 : 0,
                                                                borderColor: "yellow"
                                                            }}>
                                                                <ViewImageShadow Width={this.size} Height={this.size}
                                                                    BorderRadius={150}
                                                                    Name={this.props.data.base_url + item.avatar} />
                                                            </View>
                                                        </View>

                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    ) : (<Loading Screen={'Main'} />)}
                </ImageBackground>
            </SafeAreaView>
        );
    }
    DataRender(item) {
        let data = [];
        let id = 0;
        if (item.id != undefined) {
            id = item.id;
        } else {
            id = item.curriculum_id;
        }
        for (let i = 0; i < this.props.data.data.list_home_work.length; i++) {
            if (id == this.props.data.data.list_home_work[i].user_send_id || id == this.props.data.data.list_home_work[i].curriculum_id) {
                data.push(this.props.data.data.list_home_work[i]);
            }
        }
        return data;
    }
    _renderUnit(item, id) {
        let data = this.props.data.data.list_home_work;
        let ListExercise = [];
        ListExercise = this.DataRender(item);
        return (
            <View key={id} style={styles.contentUnit}>
                {ListExercise.length != 0 ? (
                    <TouchableOpacity
                        onPress={() => this._startLesson(ListExercise[0])}
                    >
                        <View style={[styles.contentFirst]}>
                            <ViewImage Width={200} Height={200}
                                Name={this.exercise_type(ListExercise[0].exercise_type)} />
                            <Text style={[StyleStudent.txt_title, { width: SmartScreenBase.smPercenWidth * 80, textAlign: "center" }]}>{ListExercise[0].exercise_name}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <ViewImage Width={50} Height={50} Name={'student_home_image5'} />
                                <Text
                                    style={[StyleStudent.text, { marginHorizontal: SmartScreenBase.smPercenWidth * 2 }]}>
                                    {moment(ListExercise[0].created_at).format('DD/MM/YYYY')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ) : null}

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                }}>

                    <ViewImage Width={1081} Height={80} Name={'student_home_image13'} />
                </View>
                <View>
                    <ScrollView horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{
                            height: SmartScreenBase.smPercenHeight * 27,
                        }}
                        contentContainerStyle={{ paddingLeft: SmartScreenBase.smPercenWidth * 2 }}
                    >
                        {ListExercise.map((ob, key) => {
                            if (key < this.LimitUnit) {
                                return this._renderItem(ob, key);
                            }

                        })}
                    </ScrollView>
                </View>
            </View>
        );
    }

    _startLesson(item) {
        let data = {};
        data['lesson_type'] = item.exercise_type;
        data['question_type'] = item.question_type;
        data['lesson_name'] = item.name;
        data['lesson_id'] = item.exercise_id;
        data['lesson_homework'] = true;
        if (item.exercise_type === 'mini_test') {
        } else {
            this.props.navigation.navigate('ListLesson', { data: data });
        }
    }

    _renderItem(item, index) {
        if (index != 0) {
            return (
                <TouchableOpacity key={index} style={{
                    alignItems: 'center',
                    height: SmartScreenBase.smPercenHeight * 27,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0)',
                }}
                    onPress={() => this._startLesson(item)}
                >
                    <View style={[styles.contentScro,
                    { width: SmartScreenBase.smPercenWidth * 40 }]}>
                        <View style={{ marginTop: SmartScreenBase.smPercenHeight * 4, alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center', paddingHorizontal: 1 }}>
                                <Text ellipsizeMode="clip"
                                    style={[StyleStudent.text, {
                                        fontWeight: '900',
                                        fontSize: SmartScreenBase.smPercenWidth * 3.2,
                                        height: SmartScreenBase.smPercenHeight * 4,
                                    }]}>
                                    {item.exercise_name}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                            }}>
                                <ViewImage Width={39} Height={40} Name={'student_home_image5'} />
                                <Text style={[StyleStudent.text, {
                                    marginHorizontal: SmartScreenBase.smPercenWidth,
                                    fontSize: SmartScreenBase.smPercenWidth * 3,
                                }]}> {moment(item.created_at).format('DD/MM/YYYY')}</Text>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', top: -SmartScreenBase.smPercenWidth * 5 }}>
                            <ViewImage Width={130} Height={130} Name={this.exercise_type(item.exercise_type)} />
                        </View>
                    </View>

                </TouchableOpacity>
            );
        }
    }
}

const mapStateToProps = state => ({
    data: state.data.LoadAPILogin.HomeScreen,
});
export default connect(mapStateToProps, action)(homescreen);
