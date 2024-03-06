import React from 'react';
import {View} from 'react-native';
import styles from "./styles";
import Pdf from "react-native-pdf";

const PDFDocument = (props) => {
    const {path} = props;
    return (
        <View style={styles.container}>
            <Pdf 
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                onPressLink={(uri)=>{
                    console.log(`Link presse: ${uri}`)
                }}
                source={{uri: path}} 
                style={styles.pdf}/>
        </View>
    )
};

export default PDFDocument;
