import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import Header from './Header';
import API from '../../API/APIConstant';
import axios from "axios";
import LoadingScreen from '../../screens/LoadingScreen';
import {useSelector} from "react-redux";
import LoginFirstComponentTeacher from '../LoginFirstComponent/Teacher';
import APIBase from '../../base/APIBase';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const MarkExam = ({ navigation, route }) => {

	const dataClass = useSelector(state => state.AuthStackReducer.dataClass);
	const itemClass = useSelector(state => state.AuthStackReducer.itemClass);
	const [isLoading, setIsLoading] = useState(true);
	const [dataNotMark, setDataNotMark] = useState([]);
	const [dataMarked, setDataMarked] = useState([]);
	const [dataWaiting, setDataWaiting] = useState([]);
	const [listData, setListData] = useState([]);
	const [index, setIndex] = useState(0);
	const [routes, setRoutes] = useState([
		{ key: 0, title: 'ĐÃ CHẤM', count: 0 },
		{ key: 1, title: 'CHƯA CHẤM', count: 0 },
		{ key: 2, title: 'CHỜ DUYỆT', count: 0 },
	]);

	useEffect(() => {
		_getExam();
	}, []);

	useEffect(() => {
		if (index === 0) {
			setListData(dataMarked)
		} else if (index === 1) {
			setListData(dataNotMark)
		} else {
			setListData(dataWaiting)
		}
	}, [index]);

	const _getExam = async () => {
		setIsLoading(true);
		const url = API.baseurl + API.getExamClass(dataClass.id_Class);
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
				let dataNM = [...dataNotMark];
				let dataM = [...dataMarked];
				let dataW = [...dataWaiting];
				let route = [...routes];
				dataNM = data.data.not_mark;
				dataM = data.data.marked;
				dataW = data.data.waiting;
				route[0].count = dataM.length;
				route[1].count = dataNM.length;
				route[2].count = dataW.length;
				setRoutes(route);
				setDataNotMark(dataNM);
				setDataMarked(dataM);
				setDataWaiting(dataW);
				setListData(dataM);
			}
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	const _renderExam = ({ item, i }) => {
		return (
			<View style={{
				padding: SmartScreenBase.smPercenWidth * 2,
				paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
				backgroundColor: 'white',
				borderRadius: SmartScreenBase.smPercenWidth * 3,
				marginTop: SmartScreenBase.smPercenHeight,
			}}>
				<View style={{
					width: smartScreenWidth * 20,
					position: 'absolute',
					top: - smartScreenWidth,
					right: SmartScreenBase.smPercenWidth * 4,
					backgroundColor: index === 0 ? '#36ae4a' : index === 1 ? '#dc4630' : '#00283a',
					borderRadius: smartScreenWidth,
					zIndex: 100
				}}>
					<Text style={{ textAlign: 'center', padding: smartScreenWidth, fontWeight: 'bold', fontSize: smartFont * 50, color: '#fff' }}>{`${item.count_done}/${item.count_user}`}</Text>
				</View>
				<View style={{
					width: smartScreenWidth * 21,
					position: 'absolute',
					top: smartScreenWidth / 30,
					right: smartScreenWidth * 3.5,
					backgroundColor: '#00000060',
					borderRadius: smartScreenWidth,
					zIndex: 9
				}}>
					<Text style={{ textAlign: 'center', padding: smartScreenWidth, fontWeight: 'bold', fontSize: smartFont * 50, color: '#fff' }}>{`${item.count_done}/${item.count_user}`}</Text>
				</View>
				<TouchableOpacity style={{
					flex: 1,
				}}
					onPress={() => navigation.navigate("DetailsMark",
						{
							exercise_id: item.exercise_id,
							exercise_name: item.exercise_name,
							type: index + 1,
							count_done: item.count_done,
							count_user: item.count_user
						}
					)}
				>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ flex: 1 }}>
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Image
									style={{
										width: SmartScreenBase.smPercenWidth * 20,
										height: SmartScreenBase.smPercenWidth * 20,
									}}
									resizeMode={'contain'}
									source={{ uri: 'gv_36' }} />
							</View>
						</View>
						<View style={{ flex: 2 }}>
							<Text style={{ fontWeight: 'bold', fontSize: smartFont * 50 }}>{item.exercise_name}</Text>
							<Text>{item.unit_name}</Text>
							<Text style={{ paddingTop: smartScreenHeight * 3, fontWeight: 'bold', color: '#113254' }}>{`Ngày nộp ${item.deadline}`}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	const _renderScene = () => {
		return (
			<View style={styles.scene}>
				<FlatList
					data={listData}
					renderItem={_renderExam}
					keyExtractor={(index) => index.toString()}
				/>
			</View>
		);
	};

	const _renderItem = ({ item, i }) => {
		return (
			<View style={{ flex: 1, height: smartScreenHeight * 5, borderBottomWidth: index === item.key ? 3 : 0, borderBottomColor: '#f5bb43' }}>
				<TouchableOpacity
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
					onPress={() => setIndex(item.key)}
				>
					<Text style={{ color: '#fff', fontWeight: index === item.key ? 'bold' : 'normal' }}>{`${item.title} (${item.count})`}</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const _renderTabBar = () => {
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#fff', marginTop: smartScreenHeight }} >
				<FlatList
					data={routes}
					renderItem={_renderItem}
					keyExtractor={(index) => index.toString()}
					scrollEnabled={false}
					numColumns={3}
				/>
			</View>
		);
	}


	return (
		!itemClass.length
			?
			<LoginFirstComponentTeacher/>
			:
		<View style={{ flex: 1, backgroundColor: '#3279b9' }}>
			{
				isLoading
					?
					<LoadingScreen />
					:
					<View style={{ flex: 1 }}>
						<View style={{
							justifyContent: "space-between",
							alignItems: "center",
							backgroundColor: "rgba(0,0,0,0.3)",
							flexDirection: "row",
						}}>
							<View style={{
								marginLeft: SmartScreenBase.smPercenWidth * 2,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: SmartScreenBase.smPercenHeight * 3
							}}>
								<Text style={{
									color: 'white',
									// marginLeft: SmartScreenBase.smPercenWidth * 5,
									fontSize: SmartScreenBase.smPercenWidth * 5,
									padding: smartScreenHeight,
								}}>Chấm bài</Text>
							</View>
						</View>
						<View style={{flex: 1 }}>
							<TabView
								navigationState={{ index, routes }}
								renderScene={_renderScene}
								onIndexChange={setIndex}
								initialLayout={{ width: smartScreenWidth * 100 }}
								renderTabBar={_renderTabBar}
							/>
						</View>
					</View>
			}
		</View>
	);
};

const styles = StyleSheet.create({
	scene: {
		flex: 1,
		marginTop: smartScreenHeight * 2,
		paddingHorizontal: smartScreenWidth * 2.5
	},
	tabStyle: {
		fontSize: smartFont * 10,
		backgroundColor: 'red'
	}
});


export default MarkExam;
