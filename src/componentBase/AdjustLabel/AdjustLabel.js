import { Text } from 'react-native'
import React, {useState} from 'react';

export default AdjustLabel = ({
    fontSize, text, style, numberOfLines
  }) => {
    const [currentFont, setCurrentFont] = useState(fontSize);
  
    return (
      <Text
        numberOfLines={ numberOfLines }
        adjustsFontSizeToFit
        style={ [style, { fontSize: currentFont }] }
        onTextLayout={ (e) => {
          const { lines } = e.nativeEvent;
          if (lines.length > numberOfLines) {
            setCurrentFont(currentFont - 1);
          }
        } }
      >
        { text }
      </Text>
    );
  };