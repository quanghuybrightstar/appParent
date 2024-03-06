import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Modal, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
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
//const { width, height } = Dimensions.get('window');

const ItemAttendance = (props) => {

	const { item, index, selected, dataHeight } = props;

	const [viewTop, setViewTop] = useState(0);

	useEffect(() => {
		setChoose(false)
	}, [selected])

	useEffect(() => {
		if (dataHeight.length) {
			let top = smartScreenHeight * 35;
			if (index > 0) {
				let h = dataHeight[index - 1];
				top = smartScreenHeight * 35 + (index * h + smartScreenHeight * 2);
			}
			setViewTop(top);
		}
	}, [dataHeight])

	useEffect(() => {
		if (item.comment) {
			setShowComment(true);
			setComment(item.comment)
		}
		if (item.status) {
			setStatus(item.status)
		} else {
			setStatus('intime');
		}
	}, []);

	const [showPopupTime, setShowPopupTime] = useState(false);
	const [status, setStatus] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [comment, setComment] = useState('');
	const [choose, setChoose] = useState(false);
	const [showComment, setShowComment] = useState(false);

	const _setStatus = (stt) => {
		setStatus(stt);
		item['status'] = stt;
		props.changeStatus(index, item);
		setShowPopupTime(false);
	};

	const _renderPopupTime = () => {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={showPopupTime}
			>
				<View
					style={{
						position: 'absolute',
						width: smartScreenWidth * 40,
						borderRadius: smartScreenWidth * 5,
						borderWidth: 1,
						right: smartScreenWidth * 12,
						backgroundColor: '#fff',
						zIndex: 11,
						top: viewTop
					}}
				>
					<TouchableOpacity
						onPress={() => _setStatus('intime')}
						style={{
							borderBottomWidth: 1,
							alignItems: 'center'
						}}
					>
						<Text style={{ textAlign: 'center', padding: smartScreenHeight }}>Đúng giờ</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => _setStatus('late')}
						style={{
							borderBottomWidth: 1,
							alignItems: 'center'
						}}
					>
						<Text style={{ textAlign: 'center', padding: smartScreenHeight }}>Đến muộn</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => _setStatus('absence_not_allowed')}
						style={{
							borderBottomWidth: 1,
							alignItems: 'center'
						}}
					>
						<Text style={{ textAlign: 'center', padding: smartScreenHeight }}>Nghỉ không phép</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							alignItems: 'center'
						}}
						onPress={() => _setStatus('absence_allowed')}
					>
						<Text style={{ textAlign: 'center', padding: smartScreenHeight }}>Nghỉ có phép</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		)
	}

	const _color = (select) => {
		switch (select) {
			case 'intime':
				return '#84c241';
			case 'late':
				return '#fbb040';
			case 'absence_not_allowed':
				return '#be1e2d';
			default:
				return '#fbb040';
		}
	}

	const _renderStatus = () => {
		let stt = '';
		switch (status) {
			case 'intime':
				stt = 'Đúng giờ';
				break;
			case 'late':
				stt = 'Đến muộn';
				break;
			case 'absence_not_allowed':
				stt = 'Nghỉ không phép';
				break;
			case 'absence_allowed':
				stt = 'Nghỉ có phép';
				break;
			default:
				stt = 'Đúng giờ';
				break;
		}
		return (
			<Text style={{ textAlign: 'center', color: _color(status) }}>
				{stt}
			</Text>
		)
	}

	const _showPopup = () => {
		setModalVisible(true);
		props.showBg(true);
	}

	const _hidePopup = () => {
		setModalVisible(false);
		item['comment'] = comment;
		props.changeInfo(index, item);
		props.showBg(false);
		if (comment) {
			setShowComment(true);
		} else {
			setShowComment(false);
		}
	}

	const _renderComment = () => {
		return (
			<View style={{ marginTop: smartScreenHeight * 3, width: smartScreenWidth * 65, marginBottom: - smartScreenHeight * 2 }}>
				<Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: smartFont * 40, color: '#00283a' }}>Nhận xét của giáo viên : <Text style={{ fontWeight: 'normal' }}>{comment}</Text></Text>
			</View>
		)
	}

	const _pushEmail = () => {
		if (choose) {
			props.pushEmail(index, 0);
		} else {
			props.pushEmail(index, 1);
		}
		setChoose(!choose);
	}

	const _onLayout = event => {
		let { height } = event.nativeEvent.layout;
		props.changeHeight(index, height);
	}

	return (
		<TouchableOpacity style={{
			flexDirection: 'row',
			backgroundColor: comment || choose || selected ? '#daecf2' : '#fff',
			borderRadius: SmartScreenBase.smPercenWidth * 3,
			paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
			marginBottom: smartScreenHeight * 2
		}}
			onPress={() => _pushEmail()}
			onLayout={_onLayout}
		>
			<View style={{ marginTop: smartScreenHeight * 3, marginBottom: smartScreenHeight * 3 }}>
				<Image style={{
					width: SmartScreenBase.smPercenWidth*100 / 6,
					height: SmartScreenBase.smPercenWidth*100 / 6,
				}}
					resizeMode={'contain'}
					source={{ uri: 'gv_liststudent_07' }} />

			</View>
			<View style={{
				marginLeft: smartScreenWidth * 3,
				marginBottom: smartScreenHeight * 2
			}}>
				<View style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
					alignItems: 'center',
					zIndex: 10,
					width: smartScreenWidth * 70
				}}>
					<View style={{ flex: 1 }}>
						<Text style={{
							marginTop: smartScreenHeight * 3,
							color: '#000000',
							marginLeft: - SmartScreenBase.smPercenWidth * 3,
							fontSize: smartFont * 45,
						}}>{item.fullname}</Text>
					</View>
					<View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end' }}>
						{
							showPopupTime
								?
								_renderPopupTime()
								:
								null
						}
						<TouchableOpacity
							style={{
								flexDirection: 'row'
							}}
							onPress={() => setShowPopupTime(!showPopupTime)}
						>
							{
								status
									?
									<View style={{
										justifyContent: 'center',
										alignItems: 'center',
										borderWidth: 1,
										marginRight: smartScreenWidth,
										padding: smartScreenWidth / 2,
										paddingLeft: smartScreenWidth * 3,
										paddingRight: smartScreenWidth * 3,
										borderRadius: 10,
										borderColor: _color(status)
									}}>
										{_renderStatus()}
									</View>
									:
									null
							}
							<View style={{
								width: SmartScreenBase.smPercenWidth * 4,
								height: SmartScreenBase.smPercenWidth * 4,
								borderWidth: 1,
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: smartScreenHeight / 2,
								borderRadius: SmartScreenBase.smPercenWidth * 3,
							}}
							>
								<Image style={{
									width: SmartScreenBase.smPercenWidth * 2,
									height: SmartScreenBase.smPercenWidth * 2,
									// zIndex: 1,
								}}
									resizeMode={'contain'}
									source={{ uri: 'lesson_speaking_image2' }}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				{
					showComment ?
						_renderComment()
						:
						null
				}
				<View style={{
					alignItems: 'center',
					marginTop: smartScreenHeight * 3,
					marginBottom: smartScreenHeight
				}}>
					<TouchableOpacity style={{
						width: smartScreenWidth * 25,
						padding: smartScreenWidth,
						backgroundColor: '#32b69e',
						borderRadius: 12,
						alignItems: 'center',
						justifyContent: 'center',
						marginLeft: - smartScreenWidth * 15,
					}}
						onPress={() => {
							_showPopup()
						}}
					>
						<Text style={{
							color: '#fff',
							fontSize: SmartScreenBase.smPercenWidth * 3,
						}}>{comment ? 'Sửa nhận xét' : 'Nhận xét'}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>{item.user_name}</Text>
						<View style={{
							borderWidth: 1,
							width: smartScreenWidth * 60,
							height: smartScreenHeight * 20,
							borderColor: '#9e9b9c',
							padding: smartScreenWidth,
							borderRadius: smartScreenWidth
						}}>
							<TextInput
								style={{
									color: '#9e9b9c',
									fontStyle: 'italic'
								}}
								placeholderTextColor={'#9e9b9c'}
								placeholder='Viết nhận xét...'
								multiline
								numberOfLines={4}
								onChangeText={(text) => setComment(text)}
								value={comment}
							/>
						</View>
						<TouchableOpacity
							style={{ ...styles.openButton, backgroundColor: "#ed8a22" }}
							onPress={() => {
								_hidePopup()
							}}
						>
							<Text style={styles.textStyle}>Xong</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: smartScreenHeight,
		borderRadius: smartScreenHeight * 2,
		padding: smartScreenHeight * 2,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: '#fdf1f6'
	},
	openButton: {
		borderRadius: 20,
		padding: 10,
		marginTop: smartScreenHeight * 3,
		paddingLeft: smartScreenWidth * 10,
		paddingRight: smartScreenWidth * 10
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: smartScreenHeight * 2,
		textAlign: "center",
		fontWeight: 'bold',
		fontSize: smartFont * 50
	}
});

export default ItemAttendance;
