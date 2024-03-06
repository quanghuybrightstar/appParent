import React from 'react';
import {View, FlatList, Text, Image} from 'react-native';
import styles from "./styles";
import Item from "./Item";

const Content = (props) => {
    const {data} = props;

    const _renderItem = ({item}) => {
        return (
            <Item item={item}/>
        )
    };

    return (
        <View style={styles.containerContent}>
            <FlatList
                data={data}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
};

export default Content;
