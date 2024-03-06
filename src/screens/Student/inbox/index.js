import * as React from 'react';
import { ImageBackground, SafeAreaView, View, TouchableOpacity } from 'react-native';
import TabViewEx from './TabViewInbox';
import ViewImage from '../../../component/ViewImage';
import SmartScreenBase from '../../../base/SmartScreenBase';
import HeaderScreen from '../../../component/HeaderScreen';
import MyData from '../../../component/MyData';
import Loading from '../../../component/LoadingScreen';
import * as action from '../../../ReduxStudent/actions/Student';
import { connect } from "react-redux";
import DataAPI from '../../../component/DataAPI';
import base64 from 'react-native-base64';
class InboxScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
    }
    componentDidMount(){
        this.props.loadapiinboxhv();
    }
    render() {
        MyData.Navigation = this.props.navigation;
        return (
            <SafeAreaView>
                <ImageBackground source={{ uri: 'imagebackground' }} style={{ width: '100%', height: '100%' }}>
                    <HeaderScreen title={'Inbox'} navigation={this.props.navigation} />
                        {this.props.data.isLoading == false?<TabViewEx navigation={this.props.navigation} />:<Loading />}
                    <View style={{
                        position: "absolute",
                        right: SmartScreenBase.smPercenWidth * 5,
                        bottom: SmartScreenBase.smPercenHeight * 5
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateInboxScreen',{screen:this})}>
                            <ViewImage Width={174} Height={172} Name={'student_inbox_image6'} />
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => ({
    data: state.LoadAPIInboxHV
});
export default connect(mapStateToProps, action)(InboxScreen);