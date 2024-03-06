import EventBus from "react-native-event-bus";
import LogBase from "./LogBase";

class LessonBase{

    static _moveLessonHS = (value, navigation, isTeacher, reload, goIn) => {
        let data = {};
        data['lesson_type'] = value.lesson_type;
        data['question_type'] = value.question_type ? value.question_type : null;
        data['lesson_name'] = value.lesson_name;
        data['lesson_id'] = value.lesson_id;
        data['lesson_old_id'] = value.lesson_old_id;
        data['unit_id'] = value.unit_id;
        data['class_id'] = value.class_id;
        data['curriculum_id'] = value.curriculum_id;
        data['topic'] = value.topic;
        data['resources_id'] = value.resources_id;
        data['lesson_homework'] = value.lesson_homework;
        data['user_received_id'] = value.user_received_id;

        LogBase.log("=====_moveLesson2", data)
        //console.log('data',data)
        if (value.lesson_type === 'mini_test') {
            navigation.navigate(isTeacher ? 'ExamStudyTeach' : 'ExamStudyForTest',{
                id:data.lesson_id,
                name:data.lesson_name,
                type:'mini_test',
                lessonInfo:data,
                isTeacher: isTeacher,
                cb:reload
            })
        } else if (value.lesson_type === 'exam') {
            data['lesson_id'] = value.exam_id;
            navigation.navigate(isTeacher ? 'ExamStudyTeach' : 'ExamStudyForTest',{
                id:data.lesson_id,
                name:data.lesson_name,
                type:'exam',
                lessonInfo:data,
                isTeacher: isTeacher,
                cb:reload
            })
        } else if (value.lesson_type === 'project') {
            var isCuri = goIn == "curi" ? true : false
            var screenNavi = isTeacher ? 'ProjectTeach' : 'ProjectNew'
            LogBase.log("=====screenName",screenNavi)
            navigation.navigate(screenNavi, { data: data , isTeacher: isTeacher, isCuriculumStu: isCuri, cb:reload});
        } else if (value.lesson_type === "skill_guide") {
            navigation.navigate(isTeacher ? 'TeacherGrammar' : 'StudentGrammar', { data: data });
        } else {
            // var screenNavi = 
            //  goIn == "excClass" ? 'ListExcClass' : 
            // 'ListLesson'
            // console.log("=====screenName",screenNavi, goIn)
            navigation.navigate('ListLesson', {data: data, cb:reload });
        }
    };

    static async goTranslate(value){
        LogBase.log("=====goTranslate",value)
        let title = await value.split('.').join().split('“').join().split('?').join().split('”').join().split('!').join().split('"').join().split('/').join().split(':').join().replace(/(,)/g, '');
        LogBase.log("=====title",title)
        EventBus.getInstance().fireEvent('modalTranslate', {
            modal: title.toLowerCase(),
            url: 'https://vtudien.com/anh-viet/dictionary/nghia-cua-tu-',
        });
    }
}
export default LessonBase;