import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import ItemExercise from './ItemExercise';

class ItemExerciseLibrary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            DataLesson: [],
            dataList: [],
            select: false,
            type: [false, false, false, false, false],
            chooseList: [],
        };
    }

    componentWillMount(): void {
        let arr = [];
        for (let i = 0; i < this.props.dataList.length; i++) {
            let ob = new Object();
            ob.item = this.props.dataList[i];
            ob.status = false;
            arr.push(ob);
        }
        this.setState({dataList: arr});
        let dataLesson = this.props.dataList;
        let dataPs = this.props.Data;
        let dataT = [...this.state.DataLesson];
        dataLesson.forEach((element) => {
            if (dataPs.unit_id === element.unit_id) {
                let indexOf = dataT.indexOf(element.lesson_type);
                if (indexOf === -1) {
                    dataT.push(element.lesson_type);
                }
            }
        });
        this.setState({DataLesson:  dataT})
        this.props.Data_Lesson(dataT)

    }

    _renderItemItems = ({item, index}) => {
        return (
            <View>
                <View
                    style={{
                        width: '100%',
                        height: SmartScreenBase.smPercenWidth * 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                        borderBottomColor: '#FFFFFF',
                        borderBottomWidth: 0.5,
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                    }}>
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontWeight: '400',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>
                        {item === 'mini_test' ? 'Mini Test' : item}
                    </Text>
                    <TouchableOpacity
                        style={{
                            width: SmartScreenBase.smPercenWidth * 8,
                            height: SmartScreenBase.smPercenWidth * 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            let ar = this.state.type.slice('');
                            ar[index] = !ar[index];
                            this.setState({type: ar});
                        }}>
                        <Image
                            style={{
                                width: SmartScreenBase.smPercenWidth * 5,
                                height: SmartScreenBase.smPercenWidth * 5,
                            }}
                            resizeMode={'contain'}
                            source={{uri: 'student_inbox_image11'}}
                        />
                    </TouchableOpacity>
                </View>
                {
                    this.state.type[index] === true ?
                        <View>
                            {
                                this.state.dataList.map((i, index1) =>
                                    i.item.lesson_type === item && i.item.unit_id === this.props.indexSelected ?
                                        <ItemExercise item={i} chooseExercise={(i) => this.props.chooseExercise(i)}/>
                                        : null,
                                )
                            }
                        </View>
                        : null
                }
            </View>
        );
    };

    _chooseUnit = (selected) => {
        if (selected) {
            this.props._HideMenu(-1);
        } else {

            this.props._HideMenu(this.props.Data.unit_id);
        }
    };

    render() {
        const item = this.props.Data;
        const indexSelected = this.props.indexSelected;
        let selected = item.unit_id === indexSelected ? true : false;
        return (
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }}>
                <View
                    style={{
                        width: '100%',
                        height: SmartScreenBase.smPercenWidth * 12,
                        backgroundColor: '#fff',
                        marginTop: SmartScreenBase.smPercenWidth * 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                        borderRadius: SmartScreenBase.smPercenWidth * 2,
                    }}>
                    <Text
                        style={{
                            color: '#000',
                            fontWeight: '400',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>
                        {item.unit_name}
                    </Text>
                    <TouchableOpacity
                        onPress={() => this._chooseUnit(selected)}>
                        {
                            selected
                                ?
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 7,
                                        height: SmartScreenBase.smPercenWidth * 7,
                                    }}
                                    resizeMode={'contain'}
                                    source={{uri: 'minus'}}
                                />
                                :
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 7,
                                        height: SmartScreenBase.smPercenWidth * 7,
                                    }}
                                    resizeMode={'contain'}
                                    source={{uri: 'plus'}}
                                />
                        }

                    </TouchableOpacity>
                </View>
                {
                    selected ? (
                        <View style={{backgroundColor: '#00000030'}}>
                            <FlatList
                                data={this.state.DataLesson}
                                renderItem={this._renderItemItems}
                                keyExtractor={(item, index) => {
                                    return item.toString() + index.toString();
                                }}
                                showsVerticalScrollIndicator={false}
                                extraData={this.state}
                            />
                        </View>
                    ) : null}
            </View>
        );
    }
}

export default ItemExerciseLibrary;
