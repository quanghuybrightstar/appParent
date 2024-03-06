import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { WIDTH_DESIGN } from '../../../../utils/configs';
import { paddingPageHorizontal } from './Page2Register';

function Hexagon(props) {
    const { colorStroke = '#979797'} = props
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={(SmartScreenBase.screenWidth - (paddingPageHorizontal * 100 * 2) - 48) / 4}
            height={(SmartScreenBase.screenWidth - (paddingPageHorizontal * 100 * 2) - 48) / 4}
            viewBox="0 0 218.716 210.46"
            {...props}
        >
            <Path
                data-name="Path 2136"
                d="M179.763 64.581l-70.407-40.65-70.406 40.65v81.296l70.408 40.65 70.405-40.648z"
                fill="none"
                stroke={colorStroke}
                strokeWidth={5}
            />
        </Svg>
    );
}

export default Hexagon;
