import React, {useMemo} from 'react';
import {Text, View, Image, TouchableOpacity,Dimensions} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import DeliveredExamScreen from "../../screens/Parent/ConnectedAccount/DeliveredExamScreen/DeliveredExamScreen";

SmartScreenBase.baseSetup();
const Exercise = (props) => {
    const {item, type} = props;

    const _goToDeliveredExamScreen = () => {
        props.navigation.navigate('DeliveredExamScreen');
    };
    const _renderItem = () => {
        let title;
        switch (type) {
            case 1:
                title = 'Bài tập bạn giao';
                break;
            case 2:
                title = `Bài tập ${item.gender === 'female' ? 'cô' : 'thầy'} ${item.teacher_name || ''} giao`;
                break;
            case 3:
                title = item.curriculum_name;
                break;
            default:
                title = '';
                break;
        }
        return (
            <TouchableOpacity
                style={{
                    width: '100%', backgroundColor: '#fefefe', paddingVertical: SmartScreenBase.smPercenHeight * 1.5,
                    flexDirection: 'row', alignItems: 'center', borderRadius: SmartScreenBase.smPercenWidth * 2,
                    marginTop: SmartScreenBase.smPercenHeight * 1.5
                }}
                onPress={_goToDeliveredExamScreen}
            >
                <Image
                    resizeMode="contain"
                    source={{uri: 'text'}}
                    style={{
                        width: SmartScreenBase.smPercenWidth * 10, height: '80%',
                        marginHorizontal: SmartScreenBase.smPercenWidth * 5
                    }}
                />
                <View style={{
                    flex: 1, marginRight: SmartScreenBase.smPercenWidth * 2
                }}>
                    <Text style={{
                        fontSize: SmartScreenBase.smPercenWidth * 4, fontWeight: '700'
                    }}>{title}</Text>
                    <Text
                        style={{fontSize: SmartScreenBase.smPercenWidth * 4}}>{`Bài chưa làm: ${item.incomplete}`}</Text>
                    <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4}}>{`Bài quá hạn: ${item.expired}`}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return useMemo(() => _renderItem(), [item]);
};

export default Exercise;
