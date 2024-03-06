import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 2
    },
    image: {
        width: '100%',
        height: '90%',
        resizeMode: 'contain'
    }
});

export default styles;
