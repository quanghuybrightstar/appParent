import React, {useState} from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import styles from "./styles";
import Header from "../../../component/ComponentMasterUnit/Header";
import Content from "../../../component/ComponentMasterUnit/Content";
import ModalFilter from "./ModalFilter";

const HistoryMasterUnit = (props) => {
    const [data, setData] = useState([1,2,3,4]);
    const [visibleModalFilter, setVisibleModalFilter] = useState(false);
    const _showModalFilter = () => {
        setVisibleModalFilter(!visibleModalFilter);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.container} source={{uri: 'bgmap'}}>
                <Header title={'Lịch sử'} icon={'loctopick'} _onPress={_showModalFilter} navigation={props.navigation}/>
                <Content data={data}/>
                {visibleModalFilter && <ModalFilter _showModalFilter={_showModalFilter}/>}
            </ImageBackground>
        </SafeAreaView>
    )
};

export default HistoryMasterUnit;
