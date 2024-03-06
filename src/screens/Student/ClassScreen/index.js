import React, {useEffect, useState} from "react";
import {ImageBackground} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import API from '../../../API/APIConstant';
import {LOAD_API_CLASSSCREEN} from '../../../ReduxStudent/actions/Student/types';
import ListClass from "./ListClass";
import Content from "./Content";
import RegisterClass from "./RegisterClass";
import styles from "./styles";
import LoadingScreen from "../../LoadingScreen";
import {AddIconButton} from '../../../componentBase/AddIconButton/AddIconButton'
import { AppHeader } from "../../../componentBase/AppHeader";
import LogBase from "../../../base/LogBase";

const ClassScreen = (props) => {
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const childSelected = useSelector(
        state => state.ManageChildrenReducer.childSelected,
    );
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        _getData()
    }, [dataLogin.jwt_token]);

    const checkUrlClasses = dataLogin?.role != 'parent' 
        ? API.my_classes + '?at_class=1' 
        : API.getListClassesChild + '?student_id=' + childSelected?.id 

    const _getData = async () => {
        setLoading(true);
        const url = API.baseurl + checkUrlClasses;
        const headers = {...API.header, 'jwt_token': dataLogin.jwt_token};
        try {
            LogBase.log("=====API",url)
            const res = await axios({method: 'get', url, headers});
            LogBase.log('=======resClassScreen', res)
            if (res.data.status) {
                setData(res.data.data);
                setCurrentId(res.data.data[0]?.id || res.data.data[0]?.class_id)
            } else {
                setData([]);
                setCurrentId('');
            }
            setLoading(false);
            await dispatch({type: LOAD_API_CLASSSCREEN, data: res.data.data});
        } catch (error) {
            console.log('get class student', error);
            setLoading(false);
            setData([]);
            setCurrentId('');
        }
    };

    const _onSnapCarousel = (sliderIndex) => {
        setCurrentId(data[sliderIndex]?.id || data[sliderIndex]?.class_id);
    };

    const _onStartScrollCarousel=()=>{
    }

    return (
        <ImageBackground style={styles.container} source={{uri: 'bgtuvung'}}>
            <AppHeader
                title={dataLogin.role != 'parent' ? 'Lớp học online của tôi' : 'Lớp học online của con'}
                leftIconOnPress={() => {
                            props.navigation.pop()
                }}
            />
            {
                loading ? <LoadingScreen/>:<>
                    {
                        data.length > 0 ?
                            <>
                                <ListClass
                                    data={data}
                                    _onSnapCarousel={_onSnapCarousel}
                                    _onStartScrollCarousel={_onStartScrollCarousel}
                                    currentIndex={data.indexOf(ele => ele.id === currentId)}
                                />
                                <Content navigation={props.navigation} id={currentId} dispatch={dispatch}/>
                                {dataLogin.role != 'parent' && <AddIconButton onPress={()=>{props.navigation.navigate('AddStudentScreen')}}/>}
                            </>
                            :
                            <RegisterClass navigation={props.navigation}/>
                    }
                </>
            }
        </ImageBackground>
    )
};

export default ClassScreen;
