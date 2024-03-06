import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Animated, TouchableOpacity, Image, FlatList, Slider, Modal } from 'react-native';
// import StyleLesson from '../StyleLesson';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../../base/SmartScreenBase';
import Header from './Header';
import API from '../../API/APIConstant';
import axios from "axios";
import LoadingScreen from '../../screens/LoadingScreen';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const ManageAttendance = ({ navigation, route }) => {

	// const { class_id, list_student, item_class } = route.params;
	const class_id = navigation.getParam('class_id');
	const list_student = navigation.getParam('list_student');
	const item_class = navigation.getParam('item_class');
	const [listClass, setListClass] = useState([]);
	// const isFocused = useIsFocused();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		navigation.addListener('didFocus', () => {
			_getListClass()
		});
	}, [])

	const _getListClass = async () => {
		const url = API.baseurl + API.listStudentByClassId + class_id;
		const header = {
			'Content-Type': 'application/json',
			'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
			'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
			'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
		};
		try {
			const res = await axios({ method: 'get', url: url, headers: header });
			let data = res.data;
			console.log("=====_getListClass",data)
			if (data.status) {
				let listDataRup = [...listClass];
				listDataRup = data.data_roll_up;
				setListClass(listDataRup);
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	const _detailAttendance = () => {
		let date = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		date = date.getTime();
		let check = false;
		let id = 0;
		listClass.forEach(element => {
			let dateE = new Date(element.date);
			dateE.setHours(0);
			dateE.setMinutes(0);
			dateE.setSeconds(0);
			dateE.setMilliseconds(0);
			dateE = dateE.getTime();
			if (dateE === date) {
				check = true;
				id = element.id;
				return false;
			}
		});
		let params = {};
		params['class_id'] = class_id;
		params['list_student'] = list_student;
		params['item_class'] = item_class;
		if (check) {
			params['attendance_id'] = id;
		}

		navigation.navigate("DetailsAttendance", params);
	}

	const _renderDateTime = (date) => {
		let data = date.split(" ")[0];
		data = data.split("/");
		data = `${data[1]}-${data[0]}-${data[2]}`;
		return data;
	}

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
					onPress={() => navigation.navigate("DetailsAttendance",
						{
							class_id: class_id,
							list_student: list_student,
							attendance_id: item.id,
							item_class: item_class
						})}
				>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ flex: 2 }}>
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
								}}>{_renderDateTime(item.date)}</Text>
							</View>
							<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
								<Image style={{
									width: SmartScreenBase.smPercenWidth * 6,
									height: SmartScreenBase.smPercenWidth * 6,
								}}
									resizeMode={'contain'}
									source={{ uri: 'gv_45' }} />
								<Text style={{
									fontWeight: '400',
									color: 'black',
									marginLeft: SmartScreenBase.smPercenWidth * 2,
									fontSize: SmartScreenBase.smPercenWidth * 4,
								}}>{item.date.split(" ")[1]}</Text>
							</View>
						</View>
						<View style={{ flex: 2 }}>
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: smartFont * 100, color: '#06539c', fontWeight: 'bold' }}>{`${item.total_student - item.number_absence}/${item.total_student}`}</Text>
							</View>
						</View>
						<View style={{ flex: 1 }}>
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Image
									style={{
										width: SmartScreenBase.smPercenWidth * 10,
										height: SmartScreenBase.smPercenWidth * 10,
									}}
									resizeMode={'contain'}
									source={{ uri: 'gv_liststudent_08' }} />
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<ImageBackground
			source={{ uri: 'imagebackground' }}
			imageStyle={stylesApp.ImageBackGround}
			style={{ flex: 1 }}>
			<View style={{ height: smartScreenHeight * 8 }}>
				<Header goBack={() => navigation.goBack()} title={'Quản lý điểm danh'} />
			</View>
			{
				isLoading
					?
					<LoadingScreen />
					:
					<View style={{ flex: 1 }}>
						<View style={{
							marginTop: smartScreenHeight * 2.5,
							paddingHorizontal: smartScreenWidth * 2.5,
							marginBottom: smartScreenHeight * 5,
							height: smartScreenHeight * 72
						}}>
							{
								listClass.length
									?
									<FlatList
										data={listClass}
										renderItem={_renderItem}
										keyExtractor={(index) => index.toString()}
										scrollEnabled={true}
									/>
									:
									<View style={{
										backgroundColor: '#fff',
										borderRadius: SmartScreenBase.smPercenWidth * 3,
										marginTop: SmartScreenBase.smPercenHeight,
									}}>
										<Text style={{padding:smartScreenHeight * 3, fontSize: smartFont * 45, fontWeight: 'bold'}}>
											Chưa có phiếu điểm danh nào
										</Text>
									</View>
							}
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
								onPress={() => _detailAttendance()}
							>
								<Text style={{
									color: '#fff',
									fontWeight: 'bold', textAlign: 'center'
								}}>
									Điểm danh
					</Text>
							</TouchableOpacity>
						</View>
					</View>
			}
		</ImageBackground>
	);
};

export default ManageAttendance;
