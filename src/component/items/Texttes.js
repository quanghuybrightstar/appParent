
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';


class Texttest extends Component {
    constructor(props) {
        super(props);
        console.log("Constructor");
    }

    render() {
        console.log("child", this.props.counter);
        return (
            <View>
                <Text style = {styles.text} >{this.props.counter}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    counter: state.counter
});

export default connect(mapStateToProps, null)(Texttest);

const styles =StyleSheet.create({
    text: {
        fontSize: 100,
        color:'#000',
    }
});