import React, { useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import Item from './Item';

const TabCompleted = ({data}) => {
    const renderItem = useCallback(({item})=><Item item={item} />, []);
    const keyExtractor = useCallback(((item, index) => (item?.id + '') || index.toString()));

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.containerContent}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default TabCompleted;
