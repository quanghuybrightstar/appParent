import React, {Component} from 'react';
import {SafeAreaView, ImageBackground, View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import HeaderScreen from '../../../component/HeaderScreen';
import StyleStudent from '../StyleStudent';
import SmartScreenBase from '../../../base/SmartScreenBase';
import ViewImage from '../../../component/ViewImage';
// import {FlatList} from 'react-native-gesture-handler';

export default class ExerciseUnit extends Component {
    DataTest = ['unithv_03', 'unithv_04', 'unithv_05', 'unithv_06', 'unithv_07', 'unithv_08', 'unithv_09', 'unithv_11', 'unithv_12'];
    DataImage = ['hv_freelearn_15', 'hv_freelearn_13', 'hv_freelearn_12', 'hv_freelearn_21', 'hv_freelearn_22', 'hv_freelearn_16', 'hv_freelearn_19', 'hv_freelearn_18',

    ];

    constructor(props) {
        super(props);
        this.DataExsercise = this.props.navigation.getParam('ListExercise');
        this.ListDocument = this.props.navigation.getParam('listDocument');
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ImageBackground source={{uri: 'hv_map_01'}}
                    imageStyle={StyleStudent.Sty_ImageBackground}
                    style={{flex: 1, paddingBottom: SmartScreenBase.smPercenHeight * 10}}>
                    <HeaderScreen navigation={this.props.navigation}
                        title={this.props.navigation.getParam('name_skill')}/>
                    <View style={{alignItems: 'center', flex: 1}}>
                        <View style={{marginTop: SmartScreenBase.smPercenHeight * 1.5}}>
                            <ViewImage Width={350} Height={359}
                                Name={this.DataTest[this.props.navigation.getParam('id')]}/>
                        </View>
                        <ScrollView>
                            {
                                this.ListDocument.map((item, index) => this._renderListDocument(item, index))
                            }
                            {
                                this.DataExsercise.map((item, index) => this.RenderItemExer(item, index))
                            }
                        </ScrollView>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }

    _renderListDocument = (item, index) => {
        return (
            <View style={{width: SmartScreenBase.smPercenWidth * 90, alignItems: 'flex-end'}}>
                <TouchableOpacity
                    onPress={() => this._startLecture(index)}
                    style={[StyleStudent.ViewComponent, {
                        width: SmartScreenBase.smPercenWidth * 80,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: SmartScreenBase.smPercenHeight * 10,
                        marginTop: SmartScreenBase.smPercenHeight * 2.3,
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 15,
                    }]}
                >
                    <View style={{position: 'absolute', left: -SmartScreenBase.smPercenWidth * 5}}>
                        <ViewImage Width={200} Height={200} Name={'unithv_10'}/>
                    </View>
                    <Text numberOfLines={2}
                        ellipsizeMode={'tail'}
                        style={StyleStudent.txt}>
                        {item.document_name || 'Bài giảng'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    _startLecture = (index) => {
        this.props.navigation.navigate('LectureScreen', {data: this.ListDocument[index]});
    };

    _startLesson = (item) => {
        let data = {};
        data.lesson_type = item.lesson_type;
        data.question_type = item.question_type;
        data.lesson_name = item.lesson_name;
        data.lesson_id = item.lesson_id;
        data.unit_id = this.props.navigation.getParam('unit_id');
        data.class_id = this.props.navigation.getParam('class_id');
        data.curriculum_id = this.props.navigation.getParam('curriculum_id');
        if (item.lesson_type === 'mini_test') {
        } else {
            this.props.navigation.navigate('ListLesson', {data: data});
        }
    };

    RenderItemExer = (item, index) => {
        return (
            <TouchableOpacity
                onPress={() => this._startLesson(item)}
            >
                <View style={{width: SmartScreenBase.smPercenWidth * 90, alignItems: 'flex-end'}}>
                    <View style={[StyleStudent.ViewComponent, {
                        width: SmartScreenBase.smPercenWidth * 80,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: SmartScreenBase.smPercenHeight * 10,
                        marginTop: SmartScreenBase.smPercenHeight * 2.3,

                    }]}>
                        <View style={{position: 'absolute', left: -SmartScreenBase.smPercenWidth * 5}}>
                            <ViewImage Width={200} Height={200}
                                // Name={this.DataImage[this.props.navigation.getParam('id')]}
                                Name={'unithv_10'}
                            />
                        </View>
                        <View style={{maxWidth: SmartScreenBase.smPercenWidth * 49}}>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode={'tail'}
                                style={StyleStudent.txt}>{item.lesson_type} {item.question_type != '' ? item.question_type : 'lỗi question type'} </Text>
                        </View>
                        <View style={{
                            position: 'absolute',
                            right: SmartScreenBase.smPercenWidth * 3,
                            flexDirection: 'row',
                        }}>
                            <View>
                                <ViewImage Width={60} Height={60} Name={'student_achievements_image1'}/>
                                {/* <View style={{
                                    position: "absolute",
                                    top: SmartScreenBase.smPercenWidth * 4, right: -SmartScreenBase.smBaseWidth,
                                    backgroundColor: "red",
                                    borderRadius: 10,
                                    width: 15, height: 15,
                                    alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ fontSize: SmartScreenBase.smPercenWidth * 3, color: "white" }}> 10</Text>
                                </View> */}
                            </View>
                            <View style={{width: SmartScreenBase.smPercenWidth * 2}}/>
                            <View>
                                <ViewImage Width={60} Height={60} Name={'student_achievements_image2'}/>
                                {/* <View style={{
                                    position: "absolute",
                                    top: SmartScreenBase.smPercenWidth * 4, right: -SmartScreenBase.smBaseWidth,
                                    backgroundColor: "red",
                                    borderRadius: 10,
                                    width: 15, height: 15,
                                    alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ fontSize: SmartScreenBase.smPercenWidth * 3, color: "white" }}>0</Text>
                                </View> */}
                            </View>
                        </View>
                        <View style={{
                            position: 'absolute',
                            top: -SmartScreenBase.smBaseWidth * 30,
                            right: SmartScreenBase.smPercenWidth * 2,
                        }}>
                            <ViewImage
                                Width={149}
                                Height={59}
                                Name={item.level == 'easy' ? 'unithv_15' : item.level == 'medium' ? 'unithv_14' : 'unithv_13'}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
}
