import React, {Component} from 'react';
import {
    SafeAreaView,
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,FlatList
} from 'react-native';
import ViewImage from '../../../component/ViewImage';
import StyleStudent from '../StyleStudent';
import SmartScreenBase from '../../../base/SmartScreenBase';
// import {FlatList} from 'react-native-gesture-handler';
import * as action from '../../../ReduxStudent/actions/Student';
import {connect} from 'react-redux';
import Loading from '../../../component/LoadingScreen';

class MapScreenStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectClass: 0,
            refresh: false,
            choiceCourse: false,
            select: '',
        };
        this.classId = '';
        this.curriculum_id = '';
    }

    componentDidMount() {
        this.classId = this.props.dataClass.Class[0].id;
        this.curriculum_id = this.props.dataClass.Class[0].curriculum_id;
    }

    render() {
        // console.log('this.props.dataClass.Class', this.props.dataClass.Class);
        return (
            <SafeAreaView>
                <ImageBackground source={{uri: 'map_07'}}
                                 imageStyle={StyleStudent.Sty_ImageBackground}
                                 style={[StyleStudent.Sty_ImageBackground, {marginBottom: 300}]}>

                    {this.props.data != null ? (
                        <View>
                            <FlatList
                                data={this.props.data}
                                keyExtractor={(item, index) => 'item' + index}
                                renderItem={this.RenderItemUnit}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    paddingBottom: SmartScreenBase.smPercenHeight * 30,
                                    paddingTop: SmartScreenBase.smPercenHeight * 15,
                                }}
                            />
                        </View>

                    ) : <Loading Screen={'Main'}/>}

                    <View style={{
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        width: SmartScreenBase.smPercenWidth * 100,
                        height: SmartScreenBase.smPercenHeight * 8,
                        position: 'absolute',
                    }}/>

                    <View style={{
                        position: 'absolute',
                        bottom: SmartScreenBase.smPercenHeight * 9.5,
                        left: -SmartScreenBase.smPercenWidth * 30,
                    }}>
                        <ViewImage Width={675} Height={501} Name={'map_02'}/>
                    </View>
                    <View style={{position: 'absolute', bottom: SmartScreenBase.smPercenHeight * 9.5, right: 0}}>
                        <ViewImage Width={600} Height={311} Name={'map_10'}/>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: SmartScreenBase.smPercenHeight * 9.5,
                        right: -SmartScreenBase.smPercenWidth * 30,
                    }}>
                        <ViewImage Width={2735} Height={246} Name={'map_03'}/>
                    </View>
                    <View style={{position: 'absolute', bottom: SmartScreenBase.smPercenHeight * 11.5, left: 30}}>
                        <ViewImage Width={231} Height={168} Name={'map_09'}/>
                    </View>
                    <View style={{position: 'absolute', bottom: SmartScreenBase.smPercenHeight * 9.5, right: 0}}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ListImprovement');
                            this.props.loadapiimprovement(this.props.dataClass.Class[this.state.selectClass].id);
                        }}>
                            <ViewImage Width={402} Height={399} Name={'map_12'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{position: 'absolute', top: 10, right: 20}}>

                        {this.state.choiceCourse == true ? (
                            <View>
                                <View style={{
                                    backgroundColor: 'white',
                                    width: SmartScreenBase.smPercenWidth * 45,
                                    maxHeight: SmartScreenBase.smPercenHeight * 25,
                                    borderRadius: SmartScreenBase.smPercenWidth * 4,
                                    overflow: 'hidden',
                                }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {this.props.dataClass.Class.map((item, index) => {
                                            return (
                                                <TouchableWithoutFeedback onPress={() => {
                                                    this.setState({
                                                        choiceCourse: !this.state.choiceCourse,
                                                        select: item.class_name,
                                                        selectClass: index,
                                                        classId: item.id,
                                                    });
                                                    this.props.LoadingUnitScreen(item.id, index);
                                                }}>
                                                    <View key={index} style={{
                                                        flex: 1,
                                                        borderBottomWidth: index == this.props.dataClass.Class.length - 1 ? 0 : 1,
                                                        borderColor: 'gray',
                                                        paddingVertical: SmartScreenBase.smPercenHeight,
                                                        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                                                    }}>
                                                        <Text ellipsizeMode='tail'
                                                              numberOfLines={1}
                                                              style={StyleStudent.txt}>{item.class_name}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            );
                                        })}
                                    </ScrollView>
                                </View>
                            </View>
                        ) : (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.setState({choiceCourse: !this.state.choiceCourse});
                                }}>
                                <View style={{justifyContent: 'center'}}>
                                    <ViewImage Width={421} Height={101} Name={'imagechoicemap'}/>
                                    <View style={{position: 'absolute', left: SmartScreenBase.smPercenWidth * 2.5}}>
                                        <Text ellipsizeMode='tail' numberOfLines={1}
                                              style={[StyleStudent.txt, {
                                                  color: 'white',
                                                  maxWidth: SmartScreenBase.smPercenWidth * 30,
                                                  textAlign: 'left',
                                              }]}>{this.state.select == '' ? this.props.dataClass.Class[0].class_name : this.state.select}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }

    RenderItemUnit = ({item, index}) => {
        return (
            <View style={{
                width: SmartScreenBase.smPercenWidth * 60,
                height: SmartScreenBase.smPercenWidth * (index % 2 == 0 ? 30 : 23),
                //opacity: item.is_current != 0 ? 1 : 0.4
            }}>
                <View style={{alignSelf: index % 2 != 0 ? 'flex-end' : 'flex-start'}}>
                    <TouchableOpacity
                        // disabled={item.is_current != 0 ? false : true}
                        style={{justifyContent: 'center'}}
                        onPress={() => {
                            this.props.navigation.navigate('SkillUnitStudent', {
                                name_unit: item.unit_name,
                                id: item.id,
                                class_id: this.classId,
                                curriculum_id: this.curriculum_id,
                            });
                        }}
                    >
                        <ViewImage Width={300} Height={300} Name={'mahv_02'}/>
                        <View style={{position: 'absolute', alignSelf: 'center'}}>
                            <Text style={[StyleStudent.text, {fontWeight: 'bold'}]}>Unit {index + 1}</Text>
                            <Text style={[StyleStudent.text, {color: 'white'}]}>{item.unit_name}</Text>
                        </View>
                    </TouchableOpacity>
                    {item.is_current == 0 ? (
                        <View style={{
                            position: 'absolute',
                            top: SmartScreenBase.smBaseWidth * 230,
                            right: SmartScreenBase.smBaseWidth * 20,
                        }}>
                            <ViewImage Width={59} Height={73} Name={'khoamap'}/>
                        </View>
                    ) : null}
                </View>

                {index != this.props.data.length - 1 ? (
                    <View style={{alignSelf: 'center', alignItems: 'center'}}>
                        {index % 2 == 0 ? (
                            <View style={{position: 'absolute', top: -SmartScreenBase.smPercenWidth * 3}}>
                                <ViewImage Width={264} Height={104} Name={'mahv_04'}/>
                            </View>
                        ) : (
                            <View style={{position: 'absolute', top: -SmartScreenBase.smPercenWidth * 6}}>
                                <ViewImage Width={251} Height={115} Name={'mahv_03'}/>
                            </View>
                        )}
                    </View>
                ) : null}
                {item.is_current == 1 ? (
                    <View style={{
                        position: 'absolute',
                        left: index % 2 == 0 ? SmartScreenBase.smPercenWidth * 20 : SmartScreenBase.smPercenWidth * 36,
                        bottom: index % 2 == 0 ? SmartScreenBase.smPercenWidth * 2 : SmartScreenBase.smBaseWidth * 250,
                    }}>
                        <ViewImage Width={140} Height={104} Name={'mahv_05'}/>
                    </View>
                ) : null}
                {item.status == 'finish' ? (
                    <View style={{
                        position: 'absolute',
                        left: index % 2 == 0 ? SmartScreenBase.smPercenWidth * 23 : SmartScreenBase.smPercenWidth * 36,
                        bottom: index % 2 == 0 ? SmartScreenBase.smPercenWidth * 2 : SmartScreenBase.smBaseWidth * 250,
                    }}>
                        <ViewImage Width={140} Height={104} Name={'mahv_06'}/>
                    </View>
                ) : null}
            </View>
        );
    };
}

const mapStateToProps = state => ({
    data: state.LoadAPILogin.DataUnit,
    dataClass: state.LoadAPILogin.ClassScreen,
});
export default connect(mapStateToProps, action)(MapScreenStudent);
