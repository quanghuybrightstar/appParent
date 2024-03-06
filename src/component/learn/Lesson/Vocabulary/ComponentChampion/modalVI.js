import React, { useState, useEffect } from 'react';
import { View, Modal, Text } from 'react-native';

const ModalVi = (props) => {
    console.log(props.title);
    return (
        <Modal transparent={true} animationType={'slide'} visible={props.visible}>
            <View style={{ flex: 1, backgroundColor: '#22222280', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }} onStartShouldSetResponder={()=>props.close()}>
                <View style={{ width: '100%', borderRadius: 15, height: '40%', padding: 10, backgroundColor: '#fff' }}>
                    <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: 'gray', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gray' }}>Nghĩa của câu</Text>
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{props.title.titleVc}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
};
export default ModalVi