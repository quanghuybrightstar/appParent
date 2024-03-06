import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image, Alert, ImageBackground,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput,
} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import styles from './SettingCourseStyle';

SmartScreenBase.baseSetup();

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            isCheckCompleteAll: false,
            isCheckComplete: false,
            isClockOpen: true,
            settingThePassingScore: false,
            statusTest: 'free',
            statusUnit: 'free',
            unLockingTestCondition: [
                {
                    id: 1,
                    title: 'Hoàn thành tất cả Unit \ntrước đó',
                    status: 'schedule'
                },
                {
                    id: 2,
                    title: 'Luôn mở khóa',
                    status: 'free',
                    checked: true
                },
            ],
            unLockingUnitCondition: [
                {
                    id: 1,
                    title: 'Mở theo thời gian cài đặt',
                    status: 'schedule'
                },
                {
                    id: 2,
                    title: 'Mở khi hoàn thành Unit \ntrước đó',
                    status: 'order'
                },
                {
                    id: 3,
                    title: 'Luôn mở khóa',
                    status: 'free',
                    checked: true
                },
            ],
        };
    }
    componentDidMount =async () => {
        const data = JSON.parse(this.props.navigation.getParam('itemSetting'));
      await this.setState({
            score: data.score,
            // statusUnit: data.config_theory,
            // statusTest: data.config_test
        })
        if (data.score > 0) {
            this.setState({ settingThePassingScore: true })
        }
        this._checkValueTop(data.config_theory);
        this._checkValueBottom(data.config_test)
    }
    _checkValueTop = (item) =>{
        const { unLockingTestCondition } = this.state;
        this.setState({
            unLockingTestCondition: unLockingTestCondition.map(cond => {
                if (cond.status === item) {
                    cond.checked = true;
                    this.setState({ statusTest: item })
                } else {
                    delete cond.checked;
                }
                return cond;
            }),
        });
    }
    _checkValueBottom = (item) =>{
        const { unLockingUnitCondition } = this.state;
        this.setState({
            unLockingUnitCondition: unLockingUnitCondition.map(cond => {
                if (cond.status === item) {
                    cond.checked = true;
                    this.setState({ statusUnit: item})
                } else {
                    delete cond.checked;
                }
                return cond;
            }),
        });
    }
    _onChooseTestCondition = (item) => {
        const { unLockingTestCondition } = this.state;
        this.setState({
            unLockingTestCondition: unLockingTestCondition.map(cond => {
                if (cond === item) {
                    cond.checked = true;
                    this.setState({ statusTest: item.status })
                } else {
                    delete cond.checked;
                }
                return cond;
            }),
        });
    };

    _onChooseUnitCondition = (item) => {
        const { unLockingUnitCondition } = this.state;
        this.setState({
            unLockingUnitCondition: unLockingUnitCondition.map(cond => {
                if (cond === item) {
                    cond.checked = true;
                    this.setState({ statusUnit: item.status })
                } else {
                    delete cond.checked;
                }
                return cond;
            }),
        });
    };

    increaseScore = () => {
        const { score } = this.state;
        if ((parseInt(score)) < 100) {
            this.setState({
                score: parseInt(score) + 1,
            });
        }
    };

    decreaseScore = () => {
        const { score } = this.state;
        if (parseInt(score) > 0) {
            this.setState({
                score: parseInt(score) - 1,
            });
        }
    };

    _onChangeScore = (score) => {
        this.setState({ score });
    };

    _goBack = () => {
        this.props.navigation.goBack();
    };
    _saveData = () => {
        let oj = {}
        oj.score = this.state.score;
        oj.config_theory = this.state.statusTest;
        oj.config_test = this.state.statusUnit
        this.props.navigation.navigate('EditCourseScreen', { config: oj });
    }
    render() {
        const { unLockingTestCondition, unLockingUnitCondition, score, settingThePassingScore } = this.state;
        return (
            <ImageBackground source={{ uri: 'imagebackground' }} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>

                <View style={styles.viewHeader}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: SmartScreenBase.smPercenWidth * 12,
                    }}>
                        <TouchableOpacity
                            style={styles.buttonBack}
                            onPress={this._goBack}
                        >
                            <Image style={styles.iconBack}
                                resizeMode={'contain'}
                                source={{ uri: 'imageback' }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.titleHeader}>Cài đặt giáo trình</Text>
                    </View>
                </View>

                <View style={styles.viewBody}>
                    <ScrollView>
                        <View style={{
                            backgroundColor: '#ffffff90', borderRadius: SmartScreenBase.smPercenWidth * 5,
                            padding: SmartScreenBase.smPercenWidth * 3,
                            marginBottom: SmartScreenBase.smPercenHeight * 2,
                        }}>
                            <View style={{
                                borderBottomWidth: 1,
                                borderColor: '#bdbdbd',
                            }}>
                                <Text style={styles.textTitleViewTest}>Bài kiểm tra</Text>
                                <View style={styles.viewConditionTest}>
                                    <View style={styles.viewIconLock}>
                                        <Image
                                            source={{ uri: 'gv_25' }}
                                            style={styles.iconLock}
                                            resizeMode={'contain'}
                                        />
                                    </View>
                                    <View style={styles.viewChooseCondition}>
                                        <Text style={styles.textCondition}>Điều kiện mở khóa</Text>
                                        {
                                            unLockingTestCondition.map(item => {
                                                return (
                                                    <RadioItem
                                                        item={item}
                                                        onPress={() => this._onChooseTestCondition(item)}
                                                    />
                                                );
                                            })
                                        }
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                borderBottomWidth: settingThePassingScore ? 1 : 0,
                                borderColor: settingThePassingScore ? '#bdbdbd' : '#ffffff90',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingVertical: SmartScreenBase.smPercenHeight * 2,
                            }}>
                                <View style={[styles.viewIconLock, { justifyContent: 'center' }]}>
                                    <Image
                                        source={{ uri: 'gv_24' }}
                                        style={styles.iconSetting}
                                        resizeMode={'contain'}
                                    />
                                </View>
                                <View style={styles.viewSettingHighScore}>
                                    <Text style={styles.textCondition}>Cài đặt điểm đạt</Text>
                                    <TouchableWithoutFeedback
                                        onPress={() => this.setState({ settingThePassingScore: !settingThePassingScore })}
                                    >
                                        <Image
                                            source={{ uri: settingThePassingScore ? 'student_setting_image2' : 'student_setting_image1' }}
                                            style={styles.iconChooseSettingScore}
                                            resizeMode={'contain'}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>

                            {
                                settingThePassingScore &&
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    paddingVertical: SmartScreenBase.smPercenHeight * 2,
                                }}>
                                    <View style={[styles.viewIconLock, { justifyContent: 'center' }]}>
                                        <Image
                                            source={{ uri: 'gv_22' }}
                                            style={styles.iconPassingScore}
                                            resizeMode={'contain'}
                                        />
                                    </View>
                                    <View style={styles.viewSettingHighScore}>
                                        <Text style={styles.textCondition}>Điểm đạt</Text>
                                        <View style={styles.viewSelectScore}>
                                            <View style={styles.viewValueScore}>
                                                <Text style={{
                                                    color: '#ff9e41',
                                                    paddingHorizontal: SmartScreenBase.smPercenWidth,
                                                    fontSize: SmartScreenBase.smPercenWidth * 4,
                                                }}>{score}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'space-between' }}>
                                                <TouchableOpacity
                                                    style={styles.buttonIncrease}
                                                    onPress={this.increaseScore}
                                                >
                                                    <Image
                                                        style={styles.iconIncrease}
                                                        resizeMode={'contain'}
                                                        source={{ uri: 'imageback' }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.buttonDecrease}
                                                    onPress={this.decreaseScore}
                                                >
                                                    <Image style={styles.iconDecrease}
                                                        resizeMode={'contain'}
                                                        source={{ uri: 'imageback' }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>

                        <View style={styles.viewTest}>
                            <Text style={styles.textTitleViewTest}>Unit</Text>
                            <View style={styles.viewConditionUnit}>
                                <View style={styles.viewIconLock}>
                                    <Image
                                        source={{ uri: 'gv_25' }}
                                        style={styles.iconLock}
                                        resizeMode={'contain'}
                                    />
                                </View>
                                <View style={styles.viewChooseCondition}>
                                    <Text style={styles.textCondition}>Điều kiện mở khóa</Text>
                                    {
                                        unLockingUnitCondition.map(item => {
                                            return (
                                                <RadioItem
                                                    item={item}
                                                    onPress={() => this._onChooseUnitCondition(item)}
                                                />
                                            );
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity style={{
                            width: '80%',
                            height: SmartScreenBase.smPercenWidth * 12,
                            backgroundColor: '#00283A',
                            borderRadius: SmartScreenBase.smPercenWidth * 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onPress={this._saveData}
                        >
                            <Text style={[styles.textSave, { fontWeight: '600' }]}>Lưu thay đổi</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        );
    }
}

export default index;

class RadioItem extends Component {
    render() {
        const { item } = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={this.props.onPress}
            >
                <View
                    style={styles.viewItemRadio}>
                    <View style={styles.borderButtonRadio}>
                        {
                            item.checked &&
                            <View style={styles.backgroundButtonRadio} />
                        }
                    </View>
                    <View style={styles.viewTextRadio}>
                        <Text style={styles.textRadio}>{item.title}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
