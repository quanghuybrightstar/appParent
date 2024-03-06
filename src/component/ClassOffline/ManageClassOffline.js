import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Animated, TouchableOpacity, Image, FlatList, Slider, Modal } from 'react-native';
// import StyleLesson from '../StyleLesson';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../../base/SmartScreenBase';
import Header from './Header';
import API from '../../API/APIConstant';
import axios from "axios";
import LoadingScreen from '../../screens/LoadingScreen';
import {useSelector} from 'react-redux'

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const ManageClassOffline = ({ navigation }) => {

	const [listClass, setListClass] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	// const isFocused = useIsFocused();

	useEffect(() => {
		// if (isFocused) {
		// 	setIsLoading(true);
		// 	_getListClass();
		// }
		navigation.addListener('didFocus', () => {
			_getListClass();
		});
	}, [])

	const _getListClass = async () => {
		const url = API.baseurl + API.listClassOffline;
		const header = {
			'Content-Type': 'application/json',
			'jwt_token': APIBase.jwt_token,
			'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
			'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
		};
		try {
			const res = await axios({ method: 'get', url: url, headers: header });
			let data = res.data;
			if (data.status) {
				let list = [...listClass];
				list = [];
				list = data.data;
				setListClass(list);
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	const _renderItem = ({ item, index }) => {
		return (
			<View style={{
				flex: 1,
				height: SmartScreenBase.smPercenWidth * 28,
				padding: SmartScreenBase.smPercenWidth * 2,
				paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
				backgroundColor: 'white',
				borderRadius: SmartScreenBase.smPercenWidth * 3,
				marginTop: SmartScreenBase.smPercenHeight,
			}}>
				<TouchableOpacity style={{
					flex: 1,
				}}
				>
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<Text style={{
							fontWeight: '600',
							color: 'black',
							fontSize: SmartScreenBase.smPercenWidth * 5,
						}}>{item.class_name}</Text>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
						<Image style={{
							width: SmartScreenBase.smPercenWidth * 6,
							height: SmartScreenBase.smPercenWidth * 6,
						}}
							resizeMode={'contain'}
							source={{ uri: 'student_managerfile_image1' }} />
						<Text style={{
							fontWeight: '400',
							color: 'black',
							marginLeft: SmartScreenBase.smPercenWidth * 2,
							fontSize: SmartScreenBase.smPercenWidth * 4,
						}}>Ngày tạo : {_renderCreatedAt(item.created_at)}</Text>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
						<Image style={{
							width: SmartScreenBase.smPercenWidth * 6,
							height: SmartScreenBase.smPercenWidth * 6,
						}}
							resizeMode={'contain'}
							source={{ uri: 'gv_46' }} />
						<Text style={{
							fontWeight: '400',
							color: 'black',
							marginLeft: SmartScreenBase.smPercenWidth * 2,
							fontSize: SmartScreenBase.smPercenWidth * 4,
						}}>Số học viên: {item.count_student ? item.count_student : 0}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	const _renderCreatedAt = (created_at) => {
		let cutCr = created_at.split(" ")[0];
		cutCr = cutCr.split("-");
		return `${cutCr[2]} / ${cutCr[1]} / ${cutCr[0]}`;
	}

	return (
		<ImageBackground
			source={{ uri: 'imagebackground' }}
			imageStyle={stylesApp.ImageBackGround}
			style={{ flex: 1}}>
			{
				isLoading
					?
					<LoadingScreen />
					:
					<View style={{ flex: 1 }}>
						<View style={{ height: smartScreenHeight * 8 }}>
							<Header goBack={() => navigation.goBack()} title={'Quản lý lớp Offline'} />
						</View>
						<View style={{
							marginTop: smartScreenHeight * 2.5,
							paddingHorizontal: smartScreenWidth * 2.5,
							marginBottom: smartScreenHeight * 5,
							height: smartScreenHeight * 72
						}}>
							<FlatList
								data={listClass}
								renderItem={_renderItem}
								keyExtractor={(index) => index.toString()}
								scrollEnabled={true}
							/>
						</View>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								width: smartScreenWidth * 100
								// marginTop: smartScreenHeight * 10
							}}>
							<TouchableOpacity
								style={{
									padding: smartScreenWidth * 2.5,
									backgroundColor: '#00283A',
									width: smartScreenWidth * 50,
									borderRadius: smartScreenWidth * 25,
								}}
								onPress={() => navigation.navigate('AddClass',
								{
									itemClass: '',
									list_student: ''
								})}
							>
								<Text style={{
									color: '#fff',
									fontWeight: 'bold', textAlign: 'center'
								}}>
									Tạo lớp
					</Text>
							</TouchableOpacity>
						</View>
					</View>
			}
		</ImageBackground>
	);
};

export default ManageClassOffline;
