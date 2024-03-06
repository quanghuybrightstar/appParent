import {
	View,
	StyleSheet,
	Dimensions,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	ImageBackground,
	Alert,
	Platform,
} from 'react-native';
import React, { Component } from 'react';
var ScrollableTabView = require('react-native-scrollable-tab-view');
//const { width, height } = Dimensions.get('screen');
import Grammar from './Lesson/Grammar';
import Listening from './Lesson/Listening';

import Speaking from './Lesson/Speaking';

import Writting from './Lesson/Writting';
import Vocab from './Lesson/Vocabulary';
import ModalTranSlate from '../modalTranslate'
import SmartScreenBase from '../base/SmartScreenBase';

const smartScreen = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
export default class FileListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teacher_homework: [],
			parent_homework: [],
			class_homework: [],
			time_learning_report: [],
			hide: true,
			format: ''
		};
	}
	_moveWebview = async (value) => {
		await this.setState({ hide: false })
		await this.props.navigation.navigate('WebView', {
			string: value
		})

	}
	_Vocab = async () => {
		await this.setState({ hide: false })
		await this.props.navigation.navigate("Vocabulary",)
	}

	_onPress = (format) => {
		this.props.navigation.navigate(format)
	}
	render() {
		return (
			<ImageBackground
				source={{ uri: 'imagebackground' }}
				style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 35 : 0, justifyContent: 'center' }}>
				<View style={{ paddingHorizontal: 10, alignItems: 'center',  }}>
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'blue',
							marginBottom: smartScreen * 1.5,
							borderRadius: smartScreen * 1.5 / 2,
							width: smartScreenWidth * 80
						}}
						onPress={() => this._onPress('Grammar')}
					>
						<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', padding: smartScreen * 2 }}>Grammar</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'blue',
							marginBottom: smartScreen * 1.5,
							borderRadius: smartScreen * 1.5 / 2,
							width: smartScreenWidth * 80
						}}
						onPress={() => this._onPress('Listening')}
					>
						<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', padding: smartScreen * 2 }}>Listening</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'blue',
							marginBottom: smartScreen * 1.5,
							borderRadius: smartScreen * 1.5 / 2,
							width: smartScreenWidth * 80
						}}
						onPress={() => this._onPress('Speaking')}>
						<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', padding: smartScreen * 2 }}>Speaking</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'blue',
							marginBottom: smartScreen * 1.5,
							borderRadius: smartScreen * 1.5 / 2,
							width: smartScreenWidth * 80
						}}
						onPress={() => this._onPress('Writting')}>
						<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', padding: smartScreen * 2 }}>Writting</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'blue',
							marginBottom: smartScreen * 1.5,
							borderRadius: smartScreen * 1.5 / 2,
							width: smartScreenWidth * 80
						}}
						onPress={() => this._onPress('Vocabulary')}>
						<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', padding: smartScreen * 2 }}>Vocabulary</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'blue',
							marginBottom: smartScreen * 1.5,
							borderRadius: smartScreen * 1.5 / 2,
							width: smartScreenWidth * 80
						}}
						onPress={() => this._onPress('Reading')}>
						<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', padding: smartScreen * 2 }}>Reading</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'blue',
							marginBottom: smartScreen * 1.5,
							borderRadius: smartScreen * 1.5 / 2,
							width: smartScreenWidth * 80
						}}
						onPress={() => this._onPress('Pronunciation')}>
						<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', padding: smartScreen * 2 }}>Pronunciation</Text>
					</TouchableOpacity>
				</View>
				{/* <View
					style={{ justifyContent: 'center' }}
					tabBarActiveTextColor={'#fff'}
					tabBarInactiveTextColor={'gray'}
					tabBarUnderlineStyle={{ backgroundColor: '#F08B01' }}>
					{
						this.state.format === 'Vocab'
							?
							<Vocab
								tabLabel='Vocab'
								moveWebView={this._Vocab}
							/>
							:
							this.state.format === 'Listening'
								?
								<Listening
									tabLabel="Listening"
									moveWebView={this._moveWebview}
								/>
								:
								this.state.format === 'Speaking'
									?
									<Speaking
										tabLabel="Speaking"
									/>
									:
									this.state.format === 'Writting'
										?
										<Writting
											tabLabel="Writting"
										/>
										:
										<Grammar
											tabLabel="Grammar"
										/>
					}
					{/* <Grammar
						tabLabel="Grammar"
					/>
					<Listening
						tabLabel="Listening"
						moveWebView={this._moveWebview}
					/>
					<Speaking
						tabLabel="Speaking"
					/>
					<Writting
						tabLabel="Writting"
					/>
					<Vocab
						tabLabel='Vocab'
						moveWebView={this._Vocab}
					/> */}
			</ImageBackground >
		);
	}
}
