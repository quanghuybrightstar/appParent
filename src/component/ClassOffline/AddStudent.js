import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
// import StyleLesson from '../StyleLesson';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../../base/SmartScreenBase';
import Header from './Header';
import API from '../../API/APIConstant';
import axios from "axios";
import LoadingScreen from '../../screens/LoadingScreen';
import { TextInput } from 'react-native';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const AddStudent = (props) => {

	const inputEl = useRef(0);
	const [fullname, setFullname] = useState('');
	const [parentEmail, setParentEmail] = useState('');

	return (
		<View style={{
			flex: 1,
			backgroundColor: '#ffffff',
		}}>
			{/* <ImageBackground source={{ uri: 'asset1' }} style={{ flex: 1 }} /> */}
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "padding"}
				style={{ flex: 1 }}
			>
				<View style={{ flex: 4 }}>
					<View style={{
						top: - smartScreenHeight * 17,
						position: 'absolute'
					}}>
						<Image
							resizeMode={'contain'}
							source={{ uri: 'asset1' }}
							style={{
								width: smartScreenWidth * 100,
								height: smartScreenHeight * 65
							}}
						/>
					</View>
				</View>
				<View style={{ flex: 6, alignItems: 'center', backgroundColor: '#fff' }}>
					<View style={{
						marginTop: smartScreenHeight * 10,
						width: SmartScreenBase.smPercenWidth * 90,
						height: SmartScreenBase.smPercenWidth * 12,
						borderRadius: SmartScreenBase.smPercenWidth * 6,
						borderWidth: 1,
						flexDirection: 'row',
						borderColor: '#4bf7ff',
					}}>
						<View style={{
							width: smartScreenWidth * 20,
							height: '100%',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
							<Image style={{
								width: smartScreenWidth * 8,
								height: smartScreenWidth * 8,
							}}
								resizeMode={'contain'}
								source={{ uri: 'gv_93' }} />
						</View>

						<TextInput style={{
							flex: 1,
							fontWeight: '400',
							// fontSize: SmartScreenBase.smPercenWidth * 5,
							color: '#000',
							padding: 0,
						}}
							placeholder="Nhập tên học viên ..."
							underlineColorAndroid='transparent'
							placeholderTextColor="#c1c3c4"
							onChangeText={(text) => setFullname(text)}
							returnKeyType="next"
							onSubmitEditing={() => { inputEl.current.focus() }}
							blurOnSubmit={false}
						/>
					</View>
					<View style={{
						width: SmartScreenBase.smPercenWidth * 90,
						height: SmartScreenBase.smPercenWidth * 12,
						borderRadius: SmartScreenBase.smPercenWidth * 6,
						borderWidth: 1,
						flexDirection: 'row',
						borderColor: '#4bf7ff',
						marginTop: smartScreenHeight * 3,
					}}>
						<View style={{
							width: smartScreenWidth * 20,
							height: '100%',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
							<Image style={{
								width: smartScreenWidth * 8,
								height: smartScreenWidth * 8,
							}}
								resizeMode={'contain'}
								source={{ uri: 'gv_114' }} />
						</View>

						<TextInput style={{
							flex: 1,
							fontWeight: '400',
							// fontSize: SmartScreenBase.smPercenWidth * 5,
							color: '#000',
							padding: 0,
						}}
							ref={inputEl}
							placeholder="Nhập email phụ huynh..."
							underlineColorAndroid='transparent'
							placeholderTextColor="#c1c3c4"
							onChangeText={(text) => setParentEmail(text)}
						/>
					</View>
					<TouchableOpacity style={{
						height: smartScreenHeight * 5,
						width: smartScreenWidth * 50,
						backgroundColor: '#00283A',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: smartScreenWidth * 5,
						marginTop: smartScreenHeight * 10
					}}
						onPress={() => props.addStudent(fullname, parentEmail)}
					>
						<Text style={{
							color: '#fff',
							fontWeight: 'bold',
							// fontSize: SmartScreenBase.smPercenWidth * 5,
						}}>Thêm học viên</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default AddStudent;
