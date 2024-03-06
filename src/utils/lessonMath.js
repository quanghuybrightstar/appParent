import stringUtils from "./stringUtils";

// Tính toán trong các dạng bài 

// Check đúng sai - word vs word - nhiều đáp án (dạng reading 2 đã tự tính)
const CheckAnswer = (listResult, answer) => {

    var isTrue = false;
    
    for(var i=0; i<listResult.length; i++){
        // console.log("=====ss:"+ stringUtils.validWord(listResult[i]) + "==" + stringUtils.validWord(answer))
        if (stringUtils.validWord(listResult[i]) == stringUtils.validWord(answer)) {
            // console.log("=====ss_OK")
            isTrue = true
        }
    }

    return isTrue
}

const convertSkill = (skill) => {
    var nameSkill = ''
    switch (skill) {
        case 'speaking':
            nameSkill = 'Speaking'
            break;
        case 'reading':
            nameSkill = 'Reading'
            break;
        case 'vocabulary':
            nameSkill = 'Vocabulary'
            break;
        case 'grammar':
            nameSkill = 'Grammar'
            break;
        case 'mini_test':
            nameSkill = 'Mini Test'
            break;
        case 'writing':
            nameSkill = 'Writing'
            break;
        case 'pronunciation':
            nameSkill = 'Pronunciation'
            break;
         case 'project':
            nameSkill = 'Project'
            break;
        case 'listening':
            nameSkill = 'Listening'
            break;
        case 'exam':
            nameSkill = 'Exam'
            break;               
        default:

            break;
    }
    return nameSkill
  }

export default {
  CheckAnswer,
  convertSkill
};
