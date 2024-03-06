import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import API from '../../API/APIConstant';
import {useSelector} from 'react-redux';
import axios from 'axios';
import APIBase from '../../base/APIBase';
import LogBase from '../../base/LogBase';

const ItemExercise = (props) => {

    const {item} = props;

    const {AuthStackReducer} = useSelector(state => state);

    const [select, setSelect] = useState(false);

    useEffect(() => {
        if (item.item.wishlist) {
            setSelect(true);
        } else {
            setSelect(false);
        }
    }, []);

    const _wishList = async () => {
        setSelect(!select);
        const url = select ? API.baseurl + API.removeWishList : API.baseurl + API.addWishList;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            let data = {};
            LogBase.log("=====AuthStackReducer",tem.item)
            data['lesson_id'] = item.item.lesson_id;
            data['user_id'] = AuthStackReducer.dataLogin.id;
            // data['lesson_type'] = ;
            const res = await APIBase.postDataJson(select ? 'delete' : 'post', url, data);
            let dataR = res.data;
            if (dataR.status) {
                console.log("dataR.status", dataR.status)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity
            style={{
                width: '100%',
                height: SmartScreenBase.smPercenWidth * 12,
                backgroundColor: '#00000030',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            }}
            onPress={() => props.chooseExercise(item)}
        >
            <Text
                style={{
                    color: '#FFFFFF',
                    fontWeight: '400',
                    fontSize: SmartScreenBase.smPercenWidth * 4,
                }}>
                {`${item.item.lesson_type} ${item.item.question_type}`}
            </Text>
            <TouchableOpacity
                style={{
                    width: SmartScreenBase.smPercenWidth * 8,
                    height: SmartScreenBase.smPercenWidth * 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => _wishList()}
            >
                {
                    !select
                        ?
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                            color: '#fff',
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'timtrang'}}/> :
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                            color: '#fff',
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'timdo'}}/>
                }
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default ItemExercise;
