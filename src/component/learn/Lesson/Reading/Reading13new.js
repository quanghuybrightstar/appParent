import React, { useEffect, useState, useRef } from 'react';
import {
	Text,
	View,
	Dimensions,
	FlatList,
	TouchableOpacity,
	Image,
	Alert,
	Platform,
	ImageBackground,
	Keyboard
} from 'react-native';
import axios from 'axios';
import styles from './reading13Styles';
import FileSound from '../FileSound';
// import Question from './Question';
const { width, height } = Dimensions.get('window');
import { useSelector, useDispatch } from 'react-redux';
let Sound = require('react-native-sound');
Sound.setCategory('Playback');
let Audio;
let interval;
import FlatListQuestion from './FlatListQuestion/FlatListQuestion';
import { ScrollView, DrawerLayoutAndroid } from 'react-native-gesture-handler';
import { readingD13NewAciton } from '../../../../redux/actions/ReadingD13NewAction';
import EventBus from 'react-native-event-bus';
import TypeExercise from "../Component/TypeExercise";
import LoaddingScreen from '../../../../screens/LoadingScreen';
import API from '../../../../API/APIConstant';
import SmartScreenBase from "../../../base/SmartScreenBase";
import FileSound4 from "../FileSound4";
import stylesButton from '../../../../styleApp/stylesApp';
import stringUtils from '../../../../utils/stringUtils';
import Font from '../../../../base/FontBase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextDownLine from '../../../../componentBase/TextDownLine/TextDownLine';
import Carousel from 'react-native-snap-carousel';

const Reading13New = (props) => {
	const { modeF, lesson_id, group_id } = props;
	const [dataFlasList, setDataFlastList] = useState([])
	const [valueY, setValueY] = useState(0);
	const [result, setResult] = useState(''); // đáp án
	const [textButton, setTextButton] = useState('kiểm tra')
	const [numberSuccess, setNumberSuccess] = useState(0)
	const [buttonShow, setButtonShow] = useState(false);
	const [again, setAgain] = useState(0);
	const [optionExplain, setOptionExplain] = useState('');
	const testing = useSelector(state => state.TesttingReducer.testing);
	const [title, setTitle] = useState('');
	const [data, setData] = useState('');
	const [vi, setVi] = useState(false);
	const [dataPost, setDataPost] = useState({});
	const [bodyPost, setBodyPost] = useState([]);
	const [idLog, setIdLog] = useState({});
	const dataRedux = useSelector(state => state.reading13NewReducer.reading);
	const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
	const [titleQuestion, setTitleQuestion] = useState([]);
	const [loadding, setLoadding] = useState(true);
	const [number, setNumber] = useState(0);
	const [disabled, setDisable] = useState(true);
	const [causeIndex, setcauseIndex] = useState(0);
	const dispatch = useDispatch();
	const _carousel = useRef()


	useEffect(() => {
		Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
		Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
		if (testing == 'aftertest') {
			console.log('dataRedux', dataRedux)
			props.hideTypeExercise();
			setDataFlastList(dataRedux.dataFlasList);
			setResult(dataRedux.result);
			setNumberSuccess(dataRedux.numberSuccess);
			setOptionExplain(dataRedux.optionExplain);
			setTextButton('làm lại');
			setLoadding(false)
		} else {
			_getData();
		}
	}, [])
	const _keyboardDidShow = () => {
		setValueY('40%')
	};

	const _keyboardDidHide = () => {
		setValueY(0)
	};
	const _getData = async () => {
		let response = {};
		response['data'] = props.dataContent;
		
		let dataList = response.data.data_question[0].list_option[0].json_data_parse;
		let data = await response.data.data_question;
		let array = [];
		let Explain = [];
		await data.map((item, index) => {
			// array[index] = item.list_option[0].question_content.split("{").join('').split("}").join('');
			// Hỗ trợ nhiều đáp án
			array[index] = item.list_option[0].match_option_text
		});
		await data.map((item, index) => {
			Explain[index] = item.list_option[0].option_explain;
		})
		let trimQ = await dataList.map((item, index) => {
			return trimQuestion(item)
		});
		await setData(response.data.data_question[0].list_option[0])
		await setTitle(response.data.data_question[0].list_option[0].group_content)
		//let convertQuestion = await _convertQuestion(response.data.lesson.lesson_paragraph)
		await setTitleQuestion(response.data.lesson.lesson_paragraph)
		setOptionExplain(Explain)
		setResult(array);
		setDataFlastList(trimQ);
		_convertDataPost(response.data)
		await setDataPost(response.data)
		if (testing == 'homeword') {
			//_postDataFirt(response.data);
		}
		await setLoadding(false)
	};

	const _postDataAnswer = async () => {
		props.hideFeedback();
		props.saveLogLearning(bodyPost);
	}
	const _convertDataPost = (data) => {
		let body = [...bodyPost];
		let dataP = { ...data };
		dataP.data_question.map((item, index) => {
			let oj = {}
			oj.question_id = item.question_id;
			oj.question_type = item.list_option[0].question_type;
			oj.question_score = 0;
			oj.final_user_choice = [];
			oj.exercise_type = 'reading';
			oj.detail_user_turn = []
			body.push(oj);
		});
		setBodyPost(body);
	}
	const _convertQuestion = (value) => {
		let searchStr = '\n';
		let startIndex = 0, index;
		let array = []
		let endData = []
		endData.push(value.split(' '))
		// while ((index = value.indexOf(searchStr, startIndex)) > -1) {
		// 	let str = value.slice(startIndex, index);
		// 	array.push(str);
		// 	startIndex = index + 1;
		// }
		// array.forEach((element, index) => {
		// 	endData.push(element.split(' '))
		// })

		return endData;
	};

	const trimQuestion = (str) => {
		let searchStr = '}';
		let searchStrLen = '}'.length;
		let startIndex = 0, index;
		let indices = {};
		indices['data'] = [];
		indices['text3'] = '';
		while ((index = str.row_2.indexOf(searchStr, startIndex)) > -1) {
			let str1 = str.row_2.slice(startIndex, index + 1).match(/\{([^}]+)\}/)[1];
			let data = {};
			data['text2'] = str.row_2.slice(startIndex, index - str1.length - 1).split(' ')
			data['text'] = str1;
			data.value = "";
			indices['data'].push(data);
			startIndex = index + searchStrLen;
		}
		indices['text3'] = str.row_2.slice(startIndex, str.length).split(' ');
		indices.textQ = str.row_1.split(' ');
		indices.color = 'yellow';
		return indices;
	};

	const _checkValue = (index, value, id) => {
		setDisable(false)
		let array = [...dataFlasList];
		array[index].data[id].value = value
		setDataFlastList(array)
	};

	const _checkResult = () => {
		if (textButton == 'kiểm tra') {
			props.hideTypeExercise()
			_compare()
		} else if (textButton == 'làm lại') {
			props.showTypeExercise()
			_again()
		} else {
			props.hideTypeExercise()
			_postDataAnswer()
		}
	};

	const _again = () => {
		setDisable(true)
		if (again < 2) {
			let array = [...dataFlasList];
			let number = array.length;
			array.forEach((element, index) => {

				element.data.map((item, int) => {
					if (element.color != '#B9D546') {
						item.value = '';
						array[index].value = "";
						number--
					}
				})
				array[index].color = 'yellow';
			})
			if (number > 0) {
				setDisable(false)
			}
			setNumberSuccess(0)
			setDataFlastList(array)
			setTextButton('kiểm tra')
			setcauseIndex(0)
		}
		else {
			_postDataAnswer()
		}
	}
	const _trimChar = (string) => {
		if (string) {
			string = string.replace('‘', '\'').replace(/[\u2018\u2019]/g, '\'');
			while (string.charAt(string.length - 1) === '.' || string.charAt(string.length - 1) === ',') {
				string = string.substring(0, string.length - 1).trim();
			}
			return string;
		}
		return '';
	};
	
	const _compare = async () => {
		if (testing == 'homeword') {
			let array = [...dataFlasList];
			let number = 0;
			array.forEach((item, index) => {
				var k=0
				result[index].forEach((monoitem) => {
					if(item.data.length>0&& stringUtils.validWord(monoitem) === stringUtils.validWord(item.data[0].value)){
						item.status = true;
						item.color = "#B9D546";
						number++
						k=1
					}
				});
				if(k==0){
					item.color = "#EE5555";
				}
			});

			setNumberSuccess(number)
			await _pushDataPost(array)
			if (modeF === 'exam' || modeF === 'mini_test') {
				await _saveData(array, number)
				props.setDataAnswer(bodyPost)
			}
			else {
				// console.log('nS',numberSuccess);
				// console.log('rsL',result.length);
				if (number < result.length) {
					if (again < 1) {
						setDataFlastList(array)
						setTextButton('làm lại')
						setAgain(again + 1);
					} else {
						props.showFeedback();
						setDataFlastList(array)
						setTextButton('tiếp tục')
					}
				} else {
					props.showFeedback();
					setDataFlastList(array)
					setTextButton('tiếp tục')
				}
			}
		} else {
			await _saveData(array, number)
		}
	};
	const _pushDataPost = async (data) => {
		let convertBody = [...bodyPost];
		let arrayData = [];
		data.forEach((item, index) => {
			if (item.data.length) {
				let oj = {}
				oj.data = item.data[0].value;
				oj.color = item?.color;
				arrayData.push(oj)
			}
		})
		convertBody.forEach((item, index) => {
			let score = 0
			let oj = {}
			item.final_user_choice = arrayData[index]?.data
			if (arrayData[index]?.color == "#B9D546") {
				score = score + parseFloat(dataPost.data_question[index].list_option[0].score)
			}
			oj.num_turn = again + 1;
			oj.score = score;
			oj.user_choice = arrayData[index]?.data
			item.detail_user_turn.push(oj)
			item.question_score = score;
		})
		setBodyPost(convertBody)
	};

	const _saveData = async (array, number) => {
		let arraySave = {}
		arraySave.dataFlasList = array
		arraySave.result = result
		arraySave.optionExplain = optionExplain
		arraySave.numberSuccess = number;
		await dispatch(readingD13NewAciton(arraySave))
	}
	const renderItem = ({ item, index }) => {
		return (
			<FlatListQuestion
				item={item}
				index={index}
				checkValue={_checkValue}
				checkTest={textButton}
			/>
		)
	};

	const _afterTest = () => {
		if (modeF === 'review_result') {

			props.nextReviewResult();
		}
	}
	const _goback = () => {
		if (modeF === 'review_result') {
			props.prevReviewResult();
		}
	}
	const _aftertest = () => {
		return (
			<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
				<TouchableOpacity style={styles.buttonBottom} onPress={() => { _goback() }}>
					<Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>QUAY LẠI</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonBottom} onPress={() => { textButton != 'tiếp tục' ? setTextButton('tiếp tục') : setTextButton('làm lại') }}>
					<Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>XEM GIẢI THÍCH</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonBottom} onPress={() => { _afterTest() }}>
					<Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>TIẾP TỤC</Text>
				</TouchableOpacity>
			</View>
		)
	}
	const _renderItemAgain = ({ item, index }) => {
		return (
			item.data.length > 0 ?
				<View style={[styles.boderViewEnd, { borderColor: item.color, }]}>
					<Image source={{ uri: item.color == '#EE5555' ? 'lesson_grammar_image6' : 'grammar1_4' }} style={styles.imageTrueFalse} />
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ ...styles.titleAnswer }}>{(index+1)+". "}</Text>
						<Text style={{ 
							width: SmartScreenBase.smPercenWidth*75,
							fontSize: SmartScreenBase.smFontSize*50,
							color: item.color, 
							marginLeft: SmartScreenBase.smPercenWidth *2, 
							fontFamily: Font.MyriadPro_Bold
						 }}>{item.data[0].value}</Text>
					</View>
					{
						item.color == '#EE5555' &&
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Image source={{ uri: 'lesson_grammar_image3' }}
							 style={{ 
								height: SmartScreenBase.smBaseWidth*60,
							  	width: SmartScreenBase.smBaseWidth*60, 
							  	resizeMode: 'contain', marginRight: 10 }} />
							<Text style={{
								fontFamily: Font.MyriadPro_Bold,
								fontSize: SmartScreenBase.smFontSize*50,
								color: "#B9D546",
								marginTop:SmartScreenBase.smPercenWidth *2
							}}>{result[index][0]}</Text>
						</View>
					}
					<View>
						<Text style={{ fontSize: 18, fontWeight: 'bold' }}>GIẢI THÍCH: </Text>
						<Text style={styles.titleExplain}>{optionExplain[index]}</Text>
					</View>
				</View>
				:
				<View></View>
		)
	};
	const _testing = () => {
		return (
			<View style={{ width: '100%', paddingHorizontal: 20, alignItems: 'center' }}>
				<TouchableOpacity style={disabled ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} disabled={disabled} onPress={_compare}>
					<Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
				</TouchableOpacity>
			</View>
		)
	}

    const _prevCarousel = () => {
        _carousel?.current && _carousel.current.snapToPrev()
    }

    const _nextCarousel = () => {
        _carousel?.current && _carousel.current.snapToNext()
    }

    const onChangeIndex = (curIndex) => {
        setcauseIndex(curIndex)
    }

	// Chứa cụm text cột trái và chỗ điền cột phải
	const rowText = () => {
		return (
			<View
			style={{
				marginTop: SmartScreenBase.smPercenHeight * 0,
				height: SmartScreenBase.smPercenHeight * 30,
				paddingTop: SmartScreenBase.smPercenWidth*10
			}}>
			<TouchableOpacity
				onPress={() => _prevCarousel()}
				style={{
					position: 'absolute',
					top: -SmartScreenBase.smPercenWidth*1.5,
					left: SmartScreenBase.smBaseWidth * 50,
					zIndex: 100,
				}}>
				{causeIndex > 0 && <Image
					source={{ uri: 'previous' }}
					style={{
						width: SmartScreenBase.smBaseWidth * 100,
						height: SmartScreenBase.smBaseWidth * 100,
						resizeMode: 'contain',
					}}/>}
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => _nextCarousel()}
				style={{
					position: 'absolute',
					top: -SmartScreenBase.smPercenWidth*1.5,
					right: SmartScreenBase.smBaseWidth * 50,
					zIndex: 100,
				}}>
				{causeIndex < dataFlasList.length-1 && <Image
					source={{ uri: 'next' }}
					style={{
						width: SmartScreenBase.smBaseWidth * 100,
						height: SmartScreenBase.smBaseWidth * 100,
						resizeMode: 'contain',
					}}/>}
			</TouchableOpacity>
			<Carousel
				ref={_carousel}
				data={dataFlasList}
				renderItem={renderItem}
				sliderWidth={SmartScreenBase.smPercenWidth * 100}
				itemWidth={SmartScreenBase.smPercenWidth * 98}
				keyExtractor={(item, index) => index.toString()}
				layout={'default'}
				onBeforeSnapToItem={(slideIndex) => onChangeIndex(slideIndex)}
			/>
		</View>
		)
	}

	return (
		!loadding ?
			<View style={styles.container}>
				{/* <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={Platform.OS === 'ios' ? 120 : 70}> */}
				{
					textButton == 'kiểm tra' ?
						null
						:
						<View style={{ width: width, alignItems: 'center', marginTop: 15 }}>
							{
								textButton == 'tiếp tục'?
								<View style={{
									height: SmartScreenBase.smPercenHeight * 10,
									width: "100%",
									justifyContent: 'center',
									alignItems: 'center',
								}}>
									<FileSound showImage={numberSuccess == result.length ? 'true' : 'false'} />
								</View>:
								<View style={{
									height: SmartScreenBase.smPercenHeight,
									width: "100%",
									justifyContent: 'center',
									alignItems: 'center',
								}}>
									<FileSound
									showIcon={'none'}
									 showImage={numberSuccess == result.length ? 'true' : 'false'} />
								</View>
							}
							<Text style={[styles.titleResult, {fontWeight: 'normal'}]}>Bạn đã trả lời đúng {numberSuccess}/ {result.length}</Text>
						</View>
				}
				<View style={[styles.bodyContainer, {
					...Platform.select({
						android: {
							height: textButton == "làm lại" ? height / 1.75 : textButton == 'kiểm tra' ? (SmartScreenBase.smPercenHeight*50 + SmartScreenBase.smPercenWidth *19) : height / 1.99
						},
						ios: {
							height: textButton == "làm lại" ? height / 1.4 : textButton == 'kiểm tra' ? height / 1.6 : height / 1.79
						},
						default: {
							// other platforms, web for example

						}
					})
				}]}>
					{
						textButton != 'tiếp tục' ?
							<View style={{ flex: 1, width}} >
								{
									textButton == 'kiểm tra' ?
									<KeyboardAwareScrollView extraScrollHeight={Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight*18 : SmartScreenBase.smPercenHeight*5} enableOnAndroid={true}>
										<View style={{ width: '100%', height: SmartScreenBase.smPercenHeight*33, paddingHorizontal: 10, marginBottom: 20 }}>
											<View style={{ width: '100%', height: SmartScreenBase.smPercenHeight*33, backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, padding: 15 }}>
												<ScrollView nestedScrollEnabled>
													<View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
														{
															<TextDownLine textBody={titleQuestion}/>    											
														}
													</View>
												</ScrollView>
											</View>
										</View>
										{rowText()}
									</KeyboardAwareScrollView>
									: <FlatList
									data={dataFlasList}
									renderItem={renderItem}
									style={{ flex: 1, marginBottom: valueY }}
									showsVerticalScrollIndicator={false}
									keyExtractor={(item, index) => index.toString()}/>
								}
							</View>
							:
							<FlatList
								data={dataFlasList}
								renderItem={_renderItemAgain}
								style={{ flex: 1, marginBottom: valueY }}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item, index) => index.toString()}
							/>
					}
				</View>
				{/* </KeyboardAwareScrollView> */}
				{
					testing == 'homeword' &&
					<View style={{ width: '100%', justifyContent: textButton != 'tiếp tục' ? 'center' : 'space-between', alignItems: 'center', paddingHorizontal: 20, position: 'absolute', bottom: height / 100 * 3 }}>
						<TouchableOpacity style={disabled ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} onPress={_checkResult} disabled={disabled}>
							<Text style={stylesButton.Sty_Text_Button}>{textButton.toLocaleUpperCase()}</Text>
						</TouchableOpacity>
					</View>
				}
				{
					testing == 'testing' &&
					<View>
						{_testing()}
					</View>
				}
				{
					testing == 'aftertest' &&
					<View style={{ width: '100%' }}>
						{_aftertest()}
					</View>
				}
				{/* {
					textButton == "làm lại" ?
						<FileSound4 showImage={"false"} />
						:
						null
				} */}
			</View>
			:
			null
	)
};

export default Reading13New;
