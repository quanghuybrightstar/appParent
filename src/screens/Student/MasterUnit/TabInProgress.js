import React, { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, Image } from 'react-native';
import { StatusUnit } from '.';
import Item from './Item';
import useLogic from './logic';
import { getListMasterUnit } from './master_unit_services';
import styles from './styles';
import {EMPTY_MASTER_UNIT_PROGRESS, EMPTY_MASTER_UNIT_COMPLETED} from '../../../../src/assets/index';
import SmartScreenBase from '../../../base/SmartScreenBase';
import LogBase from '../../../base/LogBase';

const TabInProgress = forwardRef((props, ref ) => {
    const [data, setData] = useState([]);
    const [refreshing, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);

    const renderItem = useCallback(({item})=><Item onPressItem={props._moveLesson} item={item} navigation={props.navigation} class_id={props.classId}/>, []);
    const keyExtractor = useCallback(((item, index) => (item?.id + index) || index.toString()));

    useEffect(()=> {
        setData([]);
        setLoading(false);
        setLastPage(1);
        _onRefresh();
    },[]);

    // useEffect(()=> {
    //     if(props.isUpdate && props.isUpdate > 0){
    //         _onRefresh();
    //     }
    // },[props.isUpdate]);

    // React.useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('didFocus', () => {
    //         setData([]);
    //         setLoading(false);
    //         setRefresh(true)
    //         setLastPage(1);
    //         _onRefresh();
    //     });
    // }, [props.navigation]);


    const fetchData = async (page, isRefresh = false) => {
        LogBase.log("=====fetchData")
        // if(props.status == 0){
        //     props.callUpdate()
        // }

        if (isRefresh) {
            setRefresh(true);
        } else {
            setLoading(true);
        }
        const response = await getListMasterUnit(props.classId, props.status, page);
        console.log("=====ResMas1",response.data)
        if (response.status === true){
            console.log("=====ResMas",response.data)
            if (!isRefresh) {
                setData([...data, ...response.data]);
            } else {
                setData(response.data);
            }
            setLastPage(response.lastPage);
        }
        if (isRefresh) {
            setRefresh(false);
        } else {
            setLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        _onRefresh,
    }));

    const _onRefresh = () => {
        console.log("=====_onRefresh")
        setPage(1);
        fetchData(1, true);
    };

    const handleLoadMore = () => {
        if (!loading && page < lastPage) {
            let pageGet = page + 1;
            setPage(pageGet);// increase page by 1
            fetchData(pageGet); // method for API call
        }
    };

    const _renderEmpty = () => {
        if (loading || refreshing ){
            return null;
        }
        if (props.status === StatusUnit.Progress){
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: SmartScreenBase.smPercenHeight * 10}}>
                    <Image
                        source={EMPTY_MASTER_UNIT_PROGRESS}
                        style={{
                            width: SmartScreenBase.smPercenWidth * 31,
                            height: SmartScreenBase.smPercenHeight * 17,
                        }}
                        resizeMode="contain"
                    />
                    <Text style={styles.emptyTitle}>Danh sách bài trống</Text>
                    <Text style={styles.emptyContent}>Bạn chưa có bài Master unit nào cần hoàn thành.</Text>
                </View>
            );
        }
        if (props.status === StatusUnit.Completed){
            return (
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center', paddingBottom: SmartScreenBase.smPercenHeight * 10 }}>
                    <Image
                        source={EMPTY_MASTER_UNIT_COMPLETED}
                        style={{
                            width: SmartScreenBase.smPercenWidth * 42,
                            height:SmartScreenBase.smPercenHeight * 18,
                        }}
                        resizeMode="contain"
                    />
                    <Text style={styles.emptyTitle}>Danh sách bài trống</Text>
                    <Text style={styles.emptyContent}>Bạn chưa hoàn thành bài Master unit nào.</Text>
                </View>
            );
        }
    };

    return (
        <FlatList
            data={data}
            contentContainerStyle={styles.containerContent}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={_renderEmpty()}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                    // title="Pull to refresh"
                    tintColor="#00A69C"
                    // titleColor="#000"
                />
            }
            style={{marginTop: 8, marginBottom: 20}}
            ListFooterComponent={loading ? (<ActivityIndicator color="#000" />) : null }
            onEndReached={handleLoadMore}
        />
    );
})

export default TabInProgress;
