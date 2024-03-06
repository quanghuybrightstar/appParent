import React, {Component} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ViewInput from '../../../items/ViewInput';
import TypeExercise from '../Component/TypeExercise';
import stylesApp from '../../../styleApp/stylesApp';
import StyleLesson from '../StyleLesson';
import ButtonCheck from '../../../items/ButtonCheck';
import {connect} from 'react-redux';
import FileSound from '../FileSound';
import FileSound4 from "../FileSound4";
let DataObject1 = new Object();
let dataNew = [];

class GrammarD7 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkResuilt: null,
            ShowCheck: false,
            NumberTrue: 0,
            data: [
                {
                    question:
                        'Yesterday, my dad (come) _______ back to your village after he (finish) _______ all the work',
                    answer: ['CAME', 'had finished'],
                },
                {
                    question:
                        'Yesterday, my dad (come) _______ back to your village after he (finish) _______ all the work',
                    answer: ['came', 'had finished'],
                },
                {
                    question:
                        'Yesterday, my dad (come) _______ back to your village after he (finish) _______ all the work',
                    answer: ['came', 'had finished'],
                },
                {
                    question:
                        'Yesterday, my dad (come) _______ back to your village after he (finish) _______ all the work',
                    answer: ['came', 'had finished'],
                },
            ],
            ListNumberIndex: [],
            ListTextAnswer: [],
        };
        //this.state.ListNumberIndex = [];
        this.state.ListTextAnswer = [];
    }

    componentWillMount(): void {
        //this.setState({data: []});
        debugger;
        var ListNumberIndex = [];
        var ListTextAnswer = [];
        dataNew = [];
        let response = {};
        response['data'] = this.props.dataContent;
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            DataObject1 = new Object();
            var ListText = response.data.data_question[
                i
                ].list_option[0].question_content.split('{');
            var ListText1 = ListText[1].split('}');
            var ques = ListText[0] + '_______';
            DataObject1.question = ques;
            DataObject1.answer = ListText1[0];
            dataNew.push(DataObject1);
        }

        //this.setState({data: dataNew});
        //console.log(dataNew);
        for (let index = 0; index < dataNew.length; index++) {
            let arrText = dataNew[index].question.split(' ');
            let arr = new Array();
            let TextArr = new Array();
            for (let i = 0; i < arrText.length; i++) {
                if (arrText[i] == '_______') {
                    arr.push(i);
                    TextArr.push('');
                }
            }
            ListNumberIndex.push(arr);
            ListTextAnswer.push(TextArr);
            this.setState({ListNumberIndex: ListNumberIndex});
            this.setState({ListTextAnswer: ListTextAnswer});
        }
    }

    _OnTextChange(text, index, keyIndex) {
        debugger;
       // console.log(text, index, keyIndex);
        this.state.ListTextAnswer[index][keyIndex] = text;
        let check = 0;
        let total = 0;
        for (let i = 0; i < this.state.ListTextAnswer.length; i++) {
            for (let j = 0; j < this.state.ListTextAnswer[i].length; j++) {
                if (this.state.ListTextAnswer[i][j] == '') {
                    console.log('key', index);
                    check += 1;
                }
                total += 1;
            }
        }
        //console.log('ssssss', check, total);
        this.setState({ShowCheck: true});
    }

    NumberCheck = 0;

    _OnPressCheckResuilt() {
        if (this.state.checkResuilt == null) {
            let check = 0;
            for (let index = 0; index < this.state.data.length; index++) {
                if (
                    this.state.data[index].answer.toString().toLowerCase() ==
                    this.state.ListTextAnswer[index].toString().toLowerCase()
                ) {
                    check += 1;
                }
            }
            //console.log('check', check);
            if (check == this.state.data.length) {
                this.setState({
                    checkResuilt: true,
                });
            } else {
                this.NumberCheck += 1;
                this.setState({
                    checkResuilt: false,
                });
            }
            this.state.NumberTrue = check;
        } else if (this.state.checkResuilt == false) {
            if (this.NumberCheck < 2) {
                for (let index = 0; index < this.state.data.length; index++) {
                    for (let ind = 0; ind < this.state.data[index].answer.length; ind++) {
                        this.state.ListTextAnswer[index][ind] == '';
                    }
                }
                this.setState({
                    checkResuilt: null,
                    ShowCheck: false,
                });
            } else {
                alert('done');
            }
        } else {
            alert('done');
        }
    }

    render() {
        return (
            <View
                style={{
                    height: SmartScreenBase.smPercenHeight * 87,
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                <View>
                    {this.state.checkResuilt == null
                        ? this._ShowQuestion()
                        : this._ShowAnswer()}
                </View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: SmartScreenBase.smPercenHeight * 5,
                        alignSelf: 'center',
                    }}>
                    {this.state.ShowCheck == true ? (
                        <TouchableOpacity
                            onPress={() => {
                                this._OnPressCheckResuilt();
                            }}>
                            <ButtonCheck
                                TextButton={
                                    this.state.checkResuilt == null
                                        ? 'Kiểm tra'
                                        : this.state.checkResuilt == false && this.NumberCheck < 2
                                        ? 'Làm lại'
                                        : 'TIẾP TỤC'
                                }
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>
                {
                    this.state.checkResuilt == false && this.NumberCheck < 2 ?
                        <FileSound4 showImage={"false"}/>
                        :
                        null
                }
            </View>
        );
    }

    _ShowQuestion() {
        return (
            <View>
                <View>
                    <TypeExercise title={'Fill the blank with the correct form'}/>
                </View>
                <View
                    style={{
                        alignSelf: 'center',
                        height: SmartScreenBase.smPercenHeight * 65,
                        marginTop: SmartScreenBase.smPercenHeight * 5,
                    }}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this.RenderItemQuestion}
                    />
                </View>
            </View>
        );
    }

    RenderItemQuestion = ({item, index}) => {
        debugger;
        let arr = item.question.split(' ');
       // console.log(this.state.ListNumberIndex[index]);

        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                    },
                ]}>
                {arr.map((e, key) => {
                    return (
                        <View style={{}}>
                            {e == '_______' ? (
                                <View style={{zIndex: 10}}>
                                    <ViewInput
                                        value={e}
                                        screen={this}
                                        index={index}
                                        //keyIndex={this.state.ListNumberIndex[index].indexOf(key)}
                                        style={[
                                            stylesApp.txt,
                                            {
                                                marginVertical: 0,
                                                paddingVertical: 0,
                                                borderBottomWidth: 1,
                                                width: SmartScreenBase.smPercenWidth * 20,
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                            },
                                        ]}
                                    />
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        alert('ahihi');
                                    }}
                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                    <Text>{e} </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                })}
            </View>
        );
    };

    _ShowAnswer() {
        return (
            <View style={{alignItems: 'center', alignSelf: 'center'}}>
                {this.NumberCheck >= 2 || this.state.checkResuilt == true ? (
                    <FileSound showImage={this.state.NumberTrue === this.state.data.length ?'true': 'false'}/>
                ) : (
                    <View style={{height: SmartScreenBase.smPercenHeight}}/>
                )}
                <Text
                    style={{
                        marginTop: SmartScreenBase.smPercenHeight,
                        color: 'white',
                        fontWeight: '600',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                    }}>
                    BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.length}
                </Text>
                <View
                    style={{
                        width: SmartScreenBase.smPercenWidth * 100,
                        alignItems: 'center',
                    }}>
                    <View style={{position: 'absolute', top: 0}}>
                        <Image
                            source={{uri: 'student_home_image13'}}
                            style={[
                                StyleLesson.Sty_ImageList,
                                {transform: [{rotate: '180deg'}]},
                            ]}
                        />
                    </View>
                    <View style={{height: SmartScreenBase.smPercenHeight * 70}}>
                        <FlatList
                            data={this.state.data}
                            extraData={this.state.refresh}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={this.RenderItemResuilt.bind(this)}
                            contentContainerStyle={{alignItems: 'center'}}
                        />
                    </View>
                </View>
            </View>
        );
    }

    RenderItemResuilt = ({item, index}) => {
        let arr = item.question.split(' ');
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        marginBottom:
                            index == this.state.data.length - 1
                                ? SmartScreenBase.smPercenHeight * 15
                                : 0,
                        borderColor: this._BorderColorAnswer(index),
                        marginTop:
                            this.state.checkResuilt == false && this.NumberCheck < 2
                                ? SmartScreenBase.smBaseWidth * 120
                                : SmartScreenBase.smPercenHeight * 5,
                    },
                ]}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {arr.map((e, key) => {
                        return (
                            <View>
                                {e == '_______' ? (
                                    <View
                                        style={{
                                            zIndex: 10,
                                            borderBottomWidth: 1,
                                            paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                                            alignItems: 'center',
                                        }}>
                                        <Text
                                            style={
                                                (stylesApp.txt,
                                                    {
                                                        fontWeight: '600',
                                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                                        color: this._ColorAnswer(index, key),
                                                    })
                                            }>
                                            {
                                                this.state.ListTextAnswer[index][
                                                    this.state.ListNumberIndex[index].indexOf(key)
                                                    ]
                                            }
                                        </Text>
                                    </View>
                                ) : (
                                    <Text style={[stylesApp.txt, {zIndex: 0}]}> {e}</Text>
                                )}
                            </View>
                        );
                    })}
                </View>
                {this.NumberCheck > 3 || this.state.checkResuilt == true ? (
                    <View
                        style={{
                            marginTop: SmartScreenBase.smPercenHeight,
                            marginBottom: SmartScreenBase.smPercenHeight,
                        }}>
                        <Text style={stylesApp.txt}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: SmartScreenBase.smPercenWidth * 4,
                                }}>
                                SCRIPT:
                            </Text>
                            <Text>yes !</Text>
                        </Text>
                    </View>
                ) : (
                    <View
                        style={{
                            alignSelf: 'center',
                            position: 'absolute',
                            top: -SmartScreenBase.smBaseWidth * 90,
                        }}>
                        <Image
                            source={{
                                uri:
                                    this.state.ListTextAnswer[index].toString().toLowerCase() ==
                                    this.state.data[index].answer.toString().toLowerCase()
                                        ? 'grammar1_4'
                                        : 'grammar1_3',
                            }}
                            style={StyleLesson.Sty_Image_Small_Answer}
                        />
                    </View>
                )}
            </View>
        );
    };

    _ColorAnswer(index, key) {
        if (
            this.state.ListTextAnswer[index][
                this.state.ListNumberIndex[index].indexOf(key)
                ] ==
            this.state.data[index].answer[
                this.state.ListNumberIndex[index].indexOf(key)
                ]
        ) {
            return 'black';
        } else {
            return 'red';
        }
    }

    _BorderColorAnswer(index) {
        if (
            this.state.ListTextAnswer[index].toString().toLowerCase() ==
            this.state.data[index].answer.toString().toLowerCase()
        ) {
            return 'rgba(198,229,14,0.95)';
        } else {
            return 'rgba(232,66,90,0.95)';
        }
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.readingD11Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(GrammarD7);
