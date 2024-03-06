import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Modal, StyleSheet, Platform, TextInput } from 'react-native';
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

	const { item, index } = props;
	const [modalVisible, setModalVisible] = useState(false);
	const [comment, setComment] = useState('');
	const [showComment, setShowComment] = useState(false);

	useEffect(() => {
		if (item.comment) {
			setComment(item.comment);
			setShowComment(true);
		}
	}, [])

	const _showPopup = () => {
		setModalVisible(true);
		props.showBg(true);
	}

	const _hidePopup = () => {
		setModalVisible(false);
		props.setComment(index, comment);
		props.showBg(false);
		if (comment) {
			setShowComment(true);
		} else {
			setShowComment(false);
		}
	}

	const _renderComment = () => {
		return (
			<View style={{ marginTop: smartScreenHeight * 3, width: smartScreenWidth * 65, marginBottom: smartScreenHeight * 2 }}>
				<Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: smartFont * 40, color: '#00283a' }}>Nhận xét của giáo viên : <Text style={{ fontWeight: 'normal' }}>{comment}</Text></Text>
			</View>
		)
	}

	return (
		<View style={{
			backgroundColor: '#fff',
			borderRadius: SmartScreenBase.smPercenWidth * 3,
			paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
			borderBottomWidth: 1,
			borderBottomColor: '#c1c2c4'
		}}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<View style={{
					marginTop: smartScreenHeight,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
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
						width: smartScreenWidth * 70,
						marginTop: smartScreenHeight * 2
					}}>
						<Text style={{
							// marginTop: smartScreenHeight * 3,
							color: '#000000',
							marginLeft: - SmartScreenBase.smPercenWidth * 3,
							fontSize: smartFont * 45,
						}}>{item.user_name}</Text>
						<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<TouchableOpacity
							// onPress={() => setShowPopupTime(!showPopupTime)}
							>
								<Image style={{
									width: SmartScreenBase.smPercenWidth * 5,
									height: SmartScreenBase.smPercenWidth * 5,
									tintColor: '#489a86'
									// zIndex: 1,
								}}
									resizeMode={'contain'}
									source={{ uri: 'gv_110' }}
								/>
							</TouchableOpacity>
							<View style={{ alignItems: 'center', justifyContent: 'center', width: smartScreenWidth * 15, borderRadius: smartScreenWidth * 5, backgroundColor: '#489a86', height: SmartScreenBase.smPercenWidth * 8, marginLeft: smartScreenWidth }}>
								<TextInput
									style={{ color: '#fff', fontWeight: 'bold', width: smartScreenWidth * 12, textAlign: 'center', ...Platform.select({ android: { padding: 0 } }) }}
									onChangeText={(text) => props.setScore(index, text)}
									value={item.score}
									keyboardType = 'numeric'
								/>
							</View>
						</View>
					</View>
					{
						showComment ?
							_renderComment()
							:
							null
					}
				</View>
			</View>
			<View style={{
				alignItems: 'center',
				justifyContent: 'center'
			}}>
				<TouchableOpacity style={{
					width: smartScreenWidth * 25,
					padding: smartScreenWidth,
					backgroundColor: '#489a86',
					borderRadius: 12,
					alignItems: 'center',
					justifyContent: 'center',
					marginBottom: smartScreenHeight * 2
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
		</View>
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
		backgroundColor: "white",
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
