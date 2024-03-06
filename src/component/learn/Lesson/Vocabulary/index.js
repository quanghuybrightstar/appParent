import React, { useState, useRef } from "react";
import { Text, View, Animated, ImageBackground, Alert, TouchableOpacity, Image } from "react-native";
import VocabB1 from "./VocabB1";
import VocabB2 from "./VocabB2New";
import VocabB3 from "./VocabB3";
import VocabB4 from "./VocabB4";
import VocabB5 from "./VocabB5";
import VocabB6 from "./vocabB6New";
import VocabB7 from "./VocabB7";
import MyData from "../../../../component/MyData";
import stylesApp from "../../../styleApp/stylesApp";
import StyleLesson from "../StyleLesson";
import SmartScreenBase from "../../../base/SmartScreenBase";
import ModalTranSlate from '../../../modalTranslate';
import { useSelector } from 'react-redux'
import API from '../../../../API/APIConstant';
import apiBase from '../../../../base/APIBase';

import axios from 'axios'
import LogBase from "../../../../base/LogBase";
const Vocabulary = (props) => {
	const { group_id, mode, dataContent, lesson_id,dataLesson } = props;
	const [question_type, setQuestion_type] = useState(props.isMasterUnit && props.masterType != 'improvement' ? '2' : '1')
	const [index, setIndex] = useState(0);
	const [dataTotal, setDataTotal] = useState([]);
	const [numberClick, setNumberClick] = useState(0);
	const dataPost = useSelector(state => state.vocabularyReducers.vocabulary);
	
	const _setType = (mIndex) => {
		if(props.isMasterUnit && props.masterType != 'improvement'){
			if(question_type == '2'){
				setQuestion_type('3')
			}else if(question_type == '3'){
				setQuestion_type('4')
			}else if(question_type == '4'){
				setQuestion_type('2')
			}
		}else{
			// setQuestion_type('5')
			setQuestion_type(mIndex)
		}
	}
	
	React.useEffect(()=>{
		props.saveLogLearning([])
	},[])

	// LogBase.log("=====dataTotal",dataTotal)

	const _postDataFirt = async () => {
		props.saveLogLearning(dataTotal)
	}
	const _posdataAnswer = async (idLog) => {
		const url = API.baseurl+'api_log_learning/check_score';
		const headers = {
			'Content-Type': 'application/json',
			jwt_token:
				'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
			'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
			Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
		};
		const data = {
			log_lesson_id: parseInt(idLog.log_lesson_id),
			class_id: 1,
			lesson_id: parseInt(dataPost.data.lesson.id),
			unit_id: 1,
			curriculum_id: 1,
			data_lesson: JSON.stringify(dataPost.data),
			log_lesson_detail_id: parseInt(idLog.log_lesson_detail_id),
			data_answer: JSON.stringify(dataTotal),
			skill: "vocabulary",
		}
		try {
			const ressponse = await axios({ method: 'post', url, headers, data });
			if (ressponse.data.status) {
				if (mode === 'lesson') {
					props.reviewResult(ressponse.data);
				}
			} else {
				Alert.alert('Thông Báo', 'luu data that bai');
			};
		} catch (error) {
			console.log('error,error', error)
		}

	}
	const _saveDataTotal = (value) => {
		var array = [...dataTotal];
		let oj = {
			question_id: value,
			exercise_type: "vocabulary",
			question_type: "",
			detail_step: []
		};
		array.push(oj)
		console.log("=====dataConvert array",array)
		setDataTotal(array)
		console.log("=====dataConvert 2",dataTotal)
	}
	const _saveData = async (value, number, score) => {

		var array = [...dataTotal];
		let arrayChill = array[index].detail_step;
		let oj = {
			step: number,
			score: score,
			user_choice: value.toLowerCase(),
			review: ""
		}
		arrayChill.push(oj);
		array[index].detail_step = arrayChill
		console.log("=====_saveData array",array)
		await setDataTotal(array)

		if(props.isMasterUnit && index == dataContent.data_question.length - 1 && question_type == '4'){
			await _postDataFirt()
		}
	};
	const _saveReview = (value, number) => {
		console.log("=====dataTotal",dataTotal)
		var array = [...dataTotal];
		if(array.length == 0 || !array[index]){
			var mono = {
				question_id: value,
				exercise_type: "vocabulary",
				question_type: "",
				detail_step: []
			};
			array[index] = mono
		}
		let arrayChill = array[index].detail_step;
		let oj = {
			step: number,
			score: 0,
			user_choice: '',
			review: value
		}
		arrayChill.push(oj);
		array[index].detail_step = arrayChill
		setDataTotal(array)
	};

	const _plusindex = () => {
		setIndex(index + 1)
	};

	const _saveDataEnd = async (value, number, score) => {
		if (numberClick === 0) {
			let array = [...dataTotal];
			let oj = {
				step: number,
				score: score,
				user_choice: value,
				review: ''
			}
			array.forEach(Element => {
				Element.detail_step.push(oj)
			})
			console.log("=====_saveDataEnd array",array)
			await setDataTotal(array);
			await setNumberClick(number++)
			await _postDataFirt()

		} else {
			await _postDataFirt()
		}
	};

	const _render = () => {
		switch (question_type) {
			case '1':
				return (
					<VocabB1
						lesson_id={lesson_id}
						modeF={mode}
						setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
						nextReviewResult={() => props.nextReviewResult()}
						prevReviewResult={() => props.prevReviewResult()}
						index={index}
						SaveDataTotal={_saveDataTotal}
						SaveData={_saveData}
						methodScreen={_setType}
						dataContent={dataContent}
						setVietNam={(vi) => props.setVietNam(vi)}
						setEnglish={(en) => props.setEnglish(en)}
						showTypeExercise={() => props.showTypeExercise()}
						hideTypeExercise={() => props.hideTypeExercise()}
						setIndexQuestion={(index) => props.setIndexQuestion(index)}
					/>
				);
			case '2':
				return (
					<VocabB2
						lesson_id={lesson_id}
						modeF={mode}
						isMasterUnit={props.isMasterUnit}
						setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
						nextReviewResult={() => props.nextReviewResult()}
						prevReviewResult={() => props.prevReviewResult()}
						methodScreen={_setType}
						SaveReview={_saveReview}
						dataContent={dataContent}
						SaveDataTotal={_saveDataTotal}
						SaveData={_saveData}
						index={index}
						setVietNam={(vi) => props.setVietNam(vi)}
						setEnglish={(en) => props.setEnglish(en)}
						showTypeExercise={() => props.showTypeExercise()}
						hideTypeExercise={() => props.hideTypeExercise()}
						setIndexQuestion={(index) => props.setIndexQuestion(index)}
					/>
				);
			case '3':
				return (
					<VocabB3
						lesson_id={lesson_id}
						modeF={mode}
						dataContent={dataContent}
						setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
						nextReviewResult={() => props.nextReviewResult()}
						prevReviewResult={() => props.prevReviewResult()}
						methodScreen={_setType}
						SaveData={_saveData}
						index={index}
						setVietNam={(vi) => props.setVietNam(vi)}
						setEnglish={(en) => props.setEnglish(en)}
						showTypeExercise={() => props.showTypeExercise()}
						hideTypeExercise={() => props.hideTypeExercise()}
						setIndexQuestion={(index) => props.setIndexQuestion(index)}
					/>
				);
			case '4':
				return (
					<VocabB4
						lesson_id={lesson_id}
						modeF={mode}
						dataContent={dataContent}
						setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
						nextReviewResult={() => props.nextReviewResult()}
						prevReviewResult={() => props.prevReviewResult()}
						methodScreen={_setType}
						SaveData={_saveData}
						SaveDataEnd={_saveDataEnd}
						index={index}
						setVietNam={(vi) => props.setVietNam(vi)}
						setEnglish={(en) => props.setEnglish(en)}
						showTypeExercise={() => props.showTypeExercise()}
						hideTypeExercise={() => props.hideTypeExercise()}
						setIndexQuestion={(index) => props.setIndexQuestion(index)}
						plusindex={_plusindex}
					/>
				);
			case '5':
				return (
					<VocabB5
						lesson_id={lesson_id}
						modeF={mode}
						setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
						nextReviewResult={() => props.nextReviewResult()}
						prevReviewResult={() => props.prevReviewResult()}
						SaveData={_saveData}
						methodScreen={_setType}
						index={index}
						setVietNam={(vi) => props.setVietNam(vi)}
						setEnglish={(en) => props.setEnglish(en)}
						showTypeExercise={() => props.showTypeExercise()}
						hideTypeExercise={() => props.hideTypeExercise()}
						setIndexQuestion={(index) => props.setIndexQuestion(index)}
						plusindex={_plusindex}
					/>
				);
			case '6':
				return (
					<VocabB6
						lesson_id={lesson_id}
						modeF={mode}
						dataContent={dataContent}
						setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
						nextReviewResult={() => props.nextReviewResult()}
						prevReviewResult={() => props.prevReviewResult()}
						methodScreen={_setType}
						index={index}
						SaveReview={_saveReview}
						plusindex={_plusindex}
						setVietNam={(vi) => props.setVietNam(vi)}
						setEnglish={(en) => props.setEnglish(en)}
						showTypeExercise={() => props.showTypeExercise()}
						hideTypeExercise={() => props.hideTypeExercise()}
						setIndexQuestion={(index) => props.setIndexQuestion(index)}
					/>
				);
			case '7':
				return (
					<VocabB7
						lesson_id={lesson_id}
						modeF={mode}
						setDataAnswer={(dataAnswer) => props.setDataAnswer(dataAnswer)}
						nextReviewResult={() => props.nextReviewResult()}
						prevReviewResult={() => props.prevReviewResult()}
						methodScreen={_setType}
						SaveDataEnd={_saveDataEnd}
						index={index}
						setVietNam={(vi) => props.setVietNam(vi)}
						setEnglish={(en) => props.setEnglish(en)}
						showTypeExercise={() => props.showTypeExercise()}
						hideTypeExercise={() => props.hideTypeExercise()}
						setIndexQuestion={(index) => props.setIndexQuestion(index)}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<View style={{ flex: 1 }}>
			{_render()}
			<ModalTranSlate />
		</View>
	);
};

export default Vocabulary;
