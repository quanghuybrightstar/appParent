import React, { memo, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import InfinityList from '../../../component/base/InfinityList/InfinityList';

import stylesApp from '../../../styleApp/stylesApp';
import ItemContent from './ItemContent';
import logic from './ViewContent.logic'
import styles from "./styles";


const ViewContent = (props) => {
    const { classId } = props;

    const renderItem = useCallback(({item})=> <ItemContent item={item}/>, [])
    const keyExtractor = useCallback((item) => `${item.user_id}`, [])
    const fetchStudentsRankBoard = useCallback((page, limit) => logic.fetchStudentsRankBoard(page, limit, classId), [classId]);


    return (
        <View style={[styles.containerViewContent, stylesApp.shadow]}>
        <InfinityList
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            fetchData={fetchStudentsRankBoard}
            renderItem={renderItem}
        />
        </View>
    )
};

export default memo(ViewContent);
