import * as React from 'react';
import {View, Alert, ImageBackground, FlatList} from 'react-native';
import SmartScreenBase from "../../../base/SmartScreenBase";
import ItemAttach from '../../../component/ItemAttach/index'
import API from '../../../API/APIConstant';
import axios from 'axios';
import Header from '../../../component/Header/Header';

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [
                {
                    id: 0,
                    name: "Reading 1",
                    class: "Tiếng anh lớp 12 - Unit 3 - Reading",
                    import: "Phân biệt /s/ và /es/",
                    end_time: "20/10/2020",
                    start_time: "10/10/2020",
                    isChecked: false,
                    time: '1p'
                },
                {
                    id: 1,
                    name: "Reading 1",
                    class: "Tiếng anh lớp 12 - Unit 3 - Reading",
                    import: "Phân biệt /s/ và /es/",
                    end_time: "20/10/2020",
                    start_time: "10/10/2020",
                    isChecked: false,
                    time: '1p'
                },
                {
                    id: 2,
                    name: "Reading 1",
                    class: "Tiếng anh lớp 12 - Unit 3 - Reading",
                    import: "Phân biệt /s/ và /es/",
                    end_time: "20/10/2020",
                    start_time: "10/10/2020",
                    isChecked: false,
                    time: '1p'
                },
                {
                    id: 3,
                    name: "Reading 1",
                    class: "Tiếng anh lớp 12 - Unit 3 - Reading",
                    import: "Phân biệt /s/ và /es/",
                    end_time: "20/10/2020",
                    start_time: "10/10/2020",
                    isChecked: false,
                    time: '1p'
                },

            ],
        }
    }
    _onChoiceItem = (item) =>{
        this.setState({
            ...this.state,
            Data: this.state.Data.map(e => {
                if (e.id !== item.id) {
                    return e;
                }
                return {...e, Change: true};
            })
        });
    };
    async componentDidMount (): void {
        await this._getExercises();
    }

    _getExercises = async () => {
        const url = API.baseurl + API.getFile;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        await axios({method: 'get', url: url, headers: header})
            .then((response) => {
                console.log(response.data.resources);
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === "Network Error") {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
                this.setState({isLoading: false});
            });
    };
    _onCancelChoiceItem = (item) =>{
        this.setState({
            ...this.state,
            Data: this.state.Data.map(e => {
                if (e.id !== item.id) {
                    return e;
                }
                return {...e, Change: false};
            })
        });
    }
    _renderItem = ({item, index}) => {
        return (
            <ItemAttach Data={item} _onChoiceItem={(item)=>this._onChoiceItem(item)} _onCancelChoiceItem={(item)=>this._onCancelChoiceItem(item)}/>
        )
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: "stretch"
            }}>
                <Header navigation={this.props.navigation} title={'Đính kèm nội dung'}/>
                <View style={{
                    flex: 12,
                    paddingTop: SmartScreenBase.smPercenWidth * 5,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5
                }}>
                    <FlatList data={this.state.Data} renderItem={this._renderItem}
                              keyExtractor={(item, index) => {
                                  return item.toString() + index.toString();
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
                </View>
            </ImageBackground>

        );
    }

}

